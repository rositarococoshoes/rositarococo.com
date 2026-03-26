'use client';

import { useEffect, useMemo, useState } from 'react';

import { formatWhatsappNumber, isValidWhatsappInput } from '@/src/lib/funnel-utils';
import {
  buildWhatsappSavePayload,
  buildWhatsappValidationPayload,
  persistWhatsappCapture,
} from '@/src/lib/whatsapp-modal-utils';

export default function LegacyWhatsappModal({
  closeDelayMs = 0,
  initialWhatsapp = '',
  isOpen,
  message,
  note,
  onSaved,
  saveEndpoint,
  saveSource,
  title,
  validateBeforeSave = false,
  validateEndpoint = '',
}) {
  const [value, setValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackTone, setFeedbackTone] = useState('idle');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    const savedWhatsapp = window.localStorage.getItem('savedWhatsapp')
      || window.localStorage.getItem('rosita.whatsapp.prefill')
      || initialWhatsapp
      || '';

    setValue(savedWhatsapp);
    setSubmitting(false);

    if (savedWhatsapp && isValidWhatsappInput(savedWhatsapp) && !validateBeforeSave) {
      setFeedback('Formato válido');
      setFeedbackTone('valid');
      return;
    }

    setFeedback('');
    setFeedbackTone('idle');
  }, [initialWhatsapp, isOpen, validateBeforeSave]);

  const isFormatValid = useMemo(() => isValidWhatsappInput(value), [value]);

  function updateInput(nextValue) {
    setValue(nextValue);

    if (!nextValue.trim()) {
      setFeedback('');
      setFeedbackTone('idle');
      return;
    }

    if (!isValidWhatsappInput(nextValue)) {
      setFeedback('Formato de WhatsApp inválido. Ej: 1156457057');
      setFeedbackTone('error');
      return;
    }

    if (!validateBeforeSave) {
      setFeedback('Formato válido');
      setFeedbackTone('valid');
      return;
    }

    if (feedbackTone === 'error') {
      setFeedback('');
      setFeedbackTone('idle');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    const normalizedWhatsapp = formatWhatsappNumber(value);
    if (!normalizedWhatsapp) {
      setFeedback('Formato de WhatsApp inválido. Ej: 1156457057');
      setFeedbackTone('error');
      return;
    }

    setSubmitting(true);

    try {
      if (validateBeforeSave) {
        setFeedback('Verificando WhatsApp...');
        setFeedbackTone('verifying');

        const validationResponse = await fetch(validateEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(buildWhatsappValidationPayload(normalizedWhatsapp)),
        });

        if (!validationResponse.ok) {
          throw new Error(`WhatsApp validation failed: ${validationResponse.status}`);
        }

        const validationPayload = await validationResponse.json();
        if (validationPayload?.exists !== true) {
          setFeedback('WhatsApp inválido, por favor corrígelo.');
          setFeedbackTone('error');
          setSubmitting(false);
          return;
        }

        setFeedback('WhatsApp válido. ¡Gracias!');
        setFeedbackTone('valid');
      } else {
        setFeedback('Formato válido');
        setFeedbackTone('valid');
      }

      if (typeof window !== 'undefined') {
        persistWhatsappCapture(window.localStorage, normalizedWhatsapp);
      }

      try {
        await fetch(saveEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(buildWhatsappSavePayload({
            whatsappNumber: normalizedWhatsapp,
            source: saveSource,
            url: typeof window !== 'undefined' ? window.location.href : '',
          })),
        });
      } catch (saveError) {
        console.error('Legacy WhatsApp save failed:', saveError);
      }

      window.setTimeout(() => onSaved(normalizedWhatsapp), closeDelayMs);
    } catch (error) {
      console.error('Legacy WhatsApp validation failed:', error);
      setFeedback('Error de red. Intenta de nuevo.');
      setFeedbackTone('error');
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay whatsapp-capture-overlay" role="dialog" aria-modal="true" aria-labelledby="legacy-whatsapp-title">
      <div className="modal-card whatsapp-capture-card">
        <span className="modal-eyebrow">Seguimiento del pedido</span>
        <h2 id="legacy-whatsapp-title">{title}</h2>
        <p className="whatsapp-capture-message">{message}</p>
        <form className="whatsapp-capture-form" onSubmit={handleSubmit}>
          <label className="whatsapp-capture-label" htmlFor="legacy-whatsapp-input">
            WhatsApp
          </label>
          <input
            id="legacy-whatsapp-input"
            className="whatsapp-capture-input"
            type="tel"
            value={value}
            onChange={(event) => updateInput(event.target.value)}
            placeholder="Ej: 1156457057 (sin 0 ni 15)"
            autoComplete="tel"
            inputMode="numeric"
          />
          <span className="modal-help">El formato de WhatsApp debe ser sin 0 ni 15.</span>
          {feedback ? <p className={`whatsapp-capture-feedback is-${feedbackTone}`}>{feedback}</p> : null}
          <button type="submit" className="submit-button whatsapp-capture-submit" disabled={!isFormatValid || submitting}>
            {submitting ? 'Guardando...' : 'Guardar y continuar'}
          </button>
        </form>
        <p className="whatsapp-capture-note">{note}</p>
      </div>
    </div>
  );
}
