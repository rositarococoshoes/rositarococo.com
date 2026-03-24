'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { BRAND_LOGO_SRC, WHATSAPP_BUTTON_SRC, WHATSAPP_CONFIRM_PHONE } from '@/src/lib/funnel-data';

function parseProducts(raw) {
  if (!raw) return [];
  return raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [size, ...rest] = entry.split('-');
      return {
        size,
        model: rest.join('-'),
      };
    });
}

const MODEL_NAMES = {
  'roma-negras': 'Botineta Roma negras',
  'roma-suela': 'Botineta Roma suela',
  'venecia-negras': 'Venecia negras',
};

export default function ThankYouPage({ pairCount, total }) {
  const [customerName, setCustomerName] = useState('');
  const [rawProducts, setRawProducts] = useState('');
  const [orderDetails, setOrderDetails] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = window.localStorage.getItem('rawProducts') || params.get('286442883') || params.get('entry.1471599855') || '';
    const details = window.localStorage.getItem('orderDetails') || '';
    const name = window.localStorage.getItem('customerName') || '';

    setRawProducts(raw);
    setOrderDetails(details);
    setCustomerName(name);

    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'Purchase', {
        currency: 'ARS',
        value: total,
        num_items: pairCount,
      });
    }
  }, [pairCount, total]);

  const parsedProducts = useMemo(() => parseProducts(rawProducts), [rawProducts]);
  const fallbackList = useMemo(() => parsedProducts.map((item) => ({
    key: `${item.size}-${item.model}`,
    text: `Talle ${item.size} - ${MODEL_NAMES[item.model] || item.model}`,
  })), [parsedProducts]);

  const storedList = useMemo(() => {
    if (!orderDetails) return [];
    return orderDetails.split('|').map((entry) => entry.trim()).filter(Boolean).map((entry, index) => ({
      key: `${index}-${entry}`,
      text: entry,
    }));
  }, [orderDetails]);

  const finalList = storedList.length ? storedList : fallbackList;
  const finalDetails = finalList.length ? finalList.map((item) => item.text).join(' | ') : 'Detalles del pedido no disponibles';
  const message = useMemo(() => {
    const base = customerName
      ? `Hola, soy ${customerName} y quiero confirmar mi pedido contrareembolso que recien hice.`
      : 'Hola, quiero confirmar mi pedido contrareembolso que recien hice.';
    return `${base}\n\nDetalles del pedido: ${finalDetails}`;
  }, [customerName, finalDetails]);

  return (
    <main className="thankyou-shell">
      <div className="benefits-strip compact">
        <span>Pagas al recibir en efectivo</span>
        <span>Envio gratis</span>
        <span>Confirmacion por WhatsApp</span>
      </div>
      <section className="thankyou-card">
        <Image src={BRAND_LOGO_SRC} alt="Rosita Rococo" width={280} height={92} priority />
        <span className="eyebrow">Ultimo paso</span>
        <h1>Confirma tu pedido por WhatsApp para que podamos despacharlo.</h1>
        {customerName ? <p className="thankyou-greeting">Gracias por tu compra, <strong>{customerName}</strong>.</p> : null}
        <p className="thankyou-copy">Sin esta confirmacion final no podremos enviar tu pedido. Cuando abras WhatsApp ya ira cargado el detalle del pedido.</p>
        <a className="whatsapp-confirm" href={`https://api.whatsapp.com/send?phone=${WHATSAPP_CONFIRM_PHONE}&text=${encodeURIComponent(message)}`}>
          <Image src={WHATSAPP_BUTTON_SRC} alt="Confirmar por WhatsApp" width={240} height={72} />
        </a>
        <div className="thankyou-order-box">
          <h2>Tu pedido</h2>
          {finalList.length ? (
            <ul className="thankyou-order-list">
              {finalList.map((item) => <li key={item.key}>{item.text}</li>)}
            </ul>
          ) : (
            <p>Detalles del pedido no disponibles</p>
          )}
        </div>
        <div className="thankyou-payment-box">
          Ten listo <strong>${total.toLocaleString('es-AR')}</strong> en efectivo para la entrega. El horario sigue siendo entre 15hs y 22hs.
        </div>
      </section>
    </main>
  );
}
