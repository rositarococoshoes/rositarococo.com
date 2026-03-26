'use client';

import { useEffect, useState } from 'react';
import { WHATSAPP_BUTTON_SRC, WHATSAPP_CONFIRM_PHONE } from '@/src/lib/funnel-data';

const MODEL_NAMES = {
  'roma-negras': 'Botineta Roma negras',
  'roma-suela': 'Botineta Roma suela',
  'venecia-negras': 'Venecia negras',
};

function parseProducts(raw) {
  if (!raw) return [];
  return raw
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [size, ...rest] = entry.split('-');
      return { size, model: rest.join('-') };
    });
}

function buildDetailList(rawProducts, orderDetails) {
  const parsedProducts = parseProducts(rawProducts);
  const fallbackList = parsedProducts.map((item) => ({
    key: `${item.size}-${item.model}`,
    text: `Talle ${item.size} - ${MODEL_NAMES[item.model] || item.model}`,
  }));

  const storedList = orderDetails
    ? orderDetails.split('|').map((entry) => entry.trim()).filter(Boolean).map((entry, index) => ({
      key: `${index}-${entry}`,
      text: entry,
    }))
    : [];

  return storedList.length ? storedList : fallbackList;
}

export default function ThankYouClient({ pairCount, total }) {
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

    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Purchase', {
        currency: 'ARS',
        value: total,
        num_items: pairCount,
      });
    }
  }, [pairCount, total]);

  const finalList = buildDetailList(rawProducts, orderDetails);
  const finalDetails = finalList.length
    ? finalList.map((item) => item.text).join(' | ')
    : 'Detalles del pedido no disponibles';

  const message = customerName
    ? `Hola, soy ${customerName} y quiero confirmar mi pedido contrarreembolso que recién hice.`
    : 'Hola, quiero confirmar mi pedido contrarreembolso que recién hice.';

  const whatsappMessage = `${message}\n\nDetalles del pedido: ${finalDetails}\nTotal a pagar: $${total.toLocaleString('es-AR')}`;

  return (
    <>
      {customerName ? <p className="thankyou-greeting">Gracias por tu compra, <strong>{customerName}</strong>.</p> : null}
      <a className="whatsapp-confirm" href={`https://api.whatsapp.com/send?phone=${WHATSAPP_CONFIRM_PHONE}&text=${encodeURIComponent(whatsappMessage)}`}>
        <img src={WHATSAPP_BUTTON_SRC} alt="Confirmar por WhatsApp" width="240" height="72" loading="eager" decoding="async" />
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
    </>
  );
}
