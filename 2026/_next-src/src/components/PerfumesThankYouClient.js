'use client';

import { useEffect, useMemo, useState } from 'react';

import { PRODUCTS, WHATSAPP_BUTTON_SRC, WHATSAPP_CONFIRM_PHONE, formatPerfumeLine } from '@/src/lib/perfumes-data';

const PRODUCT_BY_ID = new Map(PRODUCTS.map((product) => [product.id, product]));

/**
 * El funnel de calzados arma el resumen como "35-roma-negras", así que su
 * parser no sirve acá. Los perfumes guardan el id suelto ("arabians-tonka"),
 * y el texto legible viene ya armado en `orderDetails`.
 */
function buildDetailList(rawProducts, orderDetails) {
  const stored = (orderDetails || '')
    .split('|')
    .map((entry) => entry.trim())
    .filter(Boolean);

  if (stored.length) {
    return stored.map((text, index) => ({ key: `${index}-${text}`, text }));
  }

  return (rawProducts || '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((id, index) => {
      const product = PRODUCT_BY_ID.get(id);
      return {
        key: `${index}-${id}`,
        text: product ? formatPerfumeLine(product) : id,
      };
    });
}

export default function PerfumesThankYouClient({ count, total }) {
  const [name, setName] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw =
      window.localStorage.getItem('rawProducts') ||
      params.get('286442883') ||
      params.get('entry.1471599855') ||
      '';
    const details = window.localStorage.getItem('orderDetails') || '';
    setList(buildDetailList(raw, details));
    setName(window.localStorage.getItem('customerName') || '');
  }, []);

  const detailsText = useMemo(
    () => (list.length ? list.map((item) => item.text).join(' | ') : 'Detalles del pedido no disponibles'),
    [list],
  );

  const greeting = name
    ? `Hola, soy ${name} y quiero confirmar mi pedido de perfumes que recién hice.`
    : 'Hola, quiero confirmar mi pedido de perfumes que recién hice.';

  const message = `${greeting}\n\nDetalles del pedido: ${detailsText}\nTotal a pagar: $${total.toLocaleString(
    'es-AR',
  )}`;

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
        <img
          src={WHATSAPP_BUTTON_SRC}
          alt="Confirmar por WhatsApp"
          width="240"
          height="72"
          loading="eager"
          decoding="async"
        />
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
      </div>
    </>
  );
}
