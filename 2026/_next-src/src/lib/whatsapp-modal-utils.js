import { formatWhatsappNumber } from './funnel-utils.js';

export function buildWhatsappValidationPayload(whatsappNumber) {
  return { whatsapp_check: formatWhatsappNumber(whatsappNumber) };
}

export function buildWhatsappSavePayload({ whatsappNumber, source, url, timestamp = new Date().toISOString() }) {
  return {
    whatsapp: formatWhatsappNumber(whatsappNumber),
    timestamp,
    source,
    url,
  };
}

export function persistWhatsappCapture(storage, whatsappNumber) {
  storage.setItem('savedWhatsapp', whatsappNumber);
  storage.setItem('whatsappModalShown', 'true');
  storage.setItem('rosita.whatsapp.prefill', whatsappNumber);
}

export function shouldOpenWhatsappModal({ cartCount, modalAlreadyShown }) {
  return cartCount > 0 && !modalAlreadyShown;
}
