'use client';

import { useEffect, useState } from 'react';
import {
  PRODUCTS,
  WHATSAPP_BUTTON_SRC,
  WHATSAPP_CONFIRM_PHONE,
  formatPerfumeLine,
} from '@/src/lib/perfumes-previo-pago-data';

const PRODUCT_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));

function buildDetailList(rawProducts, orderDetails) {
  const stored = (orderDetails || '').split('|').map((e) => e.trim()).filter(Boolean);
  if (stored.length) return stored.map((text, i) => ({ key: `${i}-${text}`, text }));
  return (rawProducts || '').split(',').map((e) => e.trim()).filter(Boolean)
    .map((id, i) => ({ key: `${i}-${id}`, text: PRODUCT_BY_ID.has(id) ? formatPerfumeLine(PRODUCT_BY_ID.get(id)) : id }));
}

/**
 * Resumen del pedido en la página de transferencia. Se lee del localStorage que
 * dejó el submit, no de la URL, porque el id del pedido viaja en la sesión.
 */
export default function PerfumesPrevioPagoOrderSummaryClient({ count, total }) {
  const [list, setList] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = window.localStorage.getItem('rawProducts') || params.get('286442883') || '';
    const details = window.localStorage.getItem('orderDetails') || '';
    setList(buildDetailList(raw, details));
    setName(window.localStorage.getItem('customerName') || '');
  }, []);

  const message = [
    name ? `Hola, soy ${name}.` : 'Hola.',
    `Transferí $${total.toLocaleString('es-AR')} por mi pedido de ${count} ${count === 1 ? 'perfume' : 'perfumes'}.`,
    `Detalle: ${list.length ? list.map((i) => i.text).join(' | ') : 'ver pedido en la web'}.`,
    'Adjunto el comprobante.',
  ].join('\n');

  return (
    <div className="thankyou-order-box">
      <h2>Resumen de tu pedido</h2>
      {list.length ? (
        <ul className="thankyou-order-list">
          {list.map((item) => (
            <li key={item.key}>{item.text}</li>
          ))}
        </ul>
      ) : (
        <p>Tu pedido quedó registrado. Mandanos el comprobante por WhatsApp.</p>
      )}
      <p className="thankyou-order-total">
        {count} {count === 1 ? 'perfume' : 'perfumes'} · ${total.toLocaleString('es-AR')}
      </p>
      <a
        className="whatsapp-confirm"
        href={`https://api.whatsapp.com/send?phone=${WHATSAPP_CONFIRM_PHONE}&text=${encodeURIComponent(message)}`}
      >
        <img src={WHATSAPP_BUTTON_SRC} alt="Enviar comprobante por WhatsApp" width="240" height="72" loading="eager" decoding="async" />
      </a>
    </div>
  );
}