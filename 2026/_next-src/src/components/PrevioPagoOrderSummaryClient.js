'use client';

import { useEffect, useState } from 'react';
import { PRODUCTS, WHATSAPP_BUTTON_SRC, WHATSAPP_CONFIRM_PHONE } from '@/src/lib/previo-pago-data';

const MODEL_NAMES = Object.fromEntries(
  PRODUCTS.flatMap((product) => {
    const aliases = [[product.id, product.displayName]];

    if (product.shortModel) {
      aliases.push([product.shortModel, product.displayName]);
    }

    return aliases;
  }),
);

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
    ? orderDetails.split('|').map((entry, index) => ({
      key: `${index}-${entry.trim()}`,
      text: entry.trim(),
    })).filter((entry) => entry.text)
    : [];

  return storedList.length ? storedList : fallbackList;
}

function buildWhatsappMessage(mode, customerName, details, total) {
  if (mode === 'transfer') {
    const intro = customerName
      ? `Hola, soy ${customerName} y quiero avisar que voy a enviar el comprobante de transferencia de mi pedido.`
      : 'Hola, quiero avisar que voy a enviar el comprobante de transferencia de mi pedido.';
    return `${intro}\n\nPedido: ${details}\nTotal informado: $${total.toLocaleString('es-AR')}`;
  }

  const intro = customerName
    ? `Hola, soy ${customerName} y necesito ayuda con mi pedido de previo pago.`
    : 'Hola, necesito ayuda con mi pedido de previo pago.';
  return `${intro}\n\nPedido: ${details}\nTotal informado: $${total.toLocaleString('es-AR')}`;
}

export default function PrevioPagoOrderSummaryClient({
  pairCount,
  total,
  title = 'Tu pedido',
  whatsappMode = null,
  showWhatsapp = false,
  trackPurchase = false,
}) {
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

    if (trackPurchase && typeof window.fbq === 'function') {
      window.fbq('track', 'Purchase', {
        currency: 'ARS',
        value: total,
        num_items: pairCount,
      });
    }
  }, [pairCount, total, trackPurchase]);

  const finalList = buildDetailList(rawProducts, orderDetails);
  const emptySummaryCopy = 'Tu resumen aparecerá aquí después de completar la compra.';
  const finalDetails = finalList.length
    ? finalList.map((item) => item.text).join(' | ')
    : 'Pedido sin detalle disponible en este enlace';

  const whatsappMessage = showWhatsapp
    ? buildWhatsappMessage(whatsappMode, customerName, finalDetails, total)
    : '';

  return (
    <>
      {customerName ? <p className="thankyou-greeting">Gracias por tu compra, <strong>{customerName}</strong>.</p> : null}
      {showWhatsapp ? (
        <a className="whatsapp-confirm" href={`https://api.whatsapp.com/send?phone=${WHATSAPP_CONFIRM_PHONE}&text=${encodeURIComponent(whatsappMessage)}`}>
          <img src={WHATSAPP_BUTTON_SRC} alt="Abrir WhatsApp" width="240" height="72" loading="eager" decoding="async" />
        </a>
      ) : null}
      <div className="thankyou-order-box">
        <h2>{title}</h2>
        {finalList.length ? (
          <ul className="thankyou-order-list">
            {finalList.map((item) => <li key={item.key}>{item.text}</li>)}
          </ul>
        ) : (
          <p>{emptySummaryCopy}</p>
        )}
      </div>
    </>
  );
}
