'use client';

import { useEffect, useState } from 'react';
import { PRODUCTS, WHATSAPP_BUTTON_SRC, WHATSAPP_CONFIRM_PHONE, formatPerfumeLine } from '@/src/lib/perfumes-previo-pago-data';

const PRODUCT_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));

function buildDetailList(rawProducts, orderDetails) {
  const stored = (orderDetails || '')
    .split('|')
    .map((e) => e.trim())
    .filter(Boolean);
  if (stored.length) return stored.map((text, i) => ({ key: `${i}-${text}`, text }));

  return (rawProducts || '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean)
    .map((id, i) => ({ key: `${i}-${id}`, text: PRODUCT_BY_ID.has(id) ? formatPerfumeLine(PRODUCT_BY_ID.get(id)) : id }));
}

const METHOD_LABEL = {
  tarjeta: 'Tarjeta de crédito o débito',
  mercadopago: 'Saldo MercadoPago',
  cbu: 'Transferencia bancaria',
};

export default function PerfumesPrevioPagoThankYouClient({ count, total }) {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [method, setMethod] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = window.localStorage.getItem('rawProducts') || params.get('286442883') || '';
    const details = window.localStorage.getItem('orderDetails') || '';
    setList(buildDetailList(raw, details));
    setName(window.localStorage.getItem('customerName') || '');
    setMethod(window.localStorage.getItem('paymentMethod') || '');
  }, []);

  const detailsText = list.length ? list.map((i) => i.text).join(' | ') : 'Detalles del pedido no disponibles';

  const greeting = name
    ? `Hola, soy ${name} y quiero confirmar mi pedido de perfumes que recién hice.`
    : 'Hola, quiero confirmar mi pedido de perfumes que recién hice.';

  const methodText = method ? `\nMedio de pago: ${METHOD_LABEL[method] || method}` : '';
  const message = `${greeting}\n\nDetalles del pedido: ${detailsText}\nTotal a pagar: $${total.toLocaleString(
    'es-AR',
  )}${methodText}`;

  return (
    <>
      {name ? (
        <p className="thankyou-greeting">
          Gracias por tu compra, <strong>{name}</strong>.
        </p>
      ) : null}

      <a
        className="whatsapp-confirm"
        href={`https://api.whatsapp.com/send?phone=${WHATSAPP_CONFIRM_PHONE}&text=${encodeURIComponent(message)}`}
      >
        <img src={WHATSAPP_BUTTON_SRC} alt="Confirmar por WhatsApp" width="240" height="72" loading="eager" decoding="async" />
      </a>

      <div className="thankyou-order-box">
        <h2>Tu pedido</h2>
        {list.length ? (
          <ul className="thankyou-order-list">
            {list.map((item) => (
              <li key={item.key}>{item.text}</li>
            ))}
          </ul>
        ) : (
          <p>Detalles del pedido no disponibles</p>
        )}
        <p className="thankyou-order-total">
          {count} {count === 1 ? 'perfume' : 'perfumes'} · ${total.toLocaleString('es-AR')}
        </p>
        {method ? (
          <p className="thankyou-order-method">Pagaste con {METHOD_LABEL[method] || method}</p>
        ) : null}
      </div>
    </>
  );
}