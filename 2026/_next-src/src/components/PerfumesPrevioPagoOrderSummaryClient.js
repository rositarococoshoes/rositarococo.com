'use client';

import { WHATSAPP_BUTTON_SRC, WHATSAPP_CONFIRM_PHONE } from '@/src/lib/perfumes-previo-pago-data';
import { buildWhatsappMessage, useLastOrder } from '@/src/lib/use-last-order';

/**
 * Resumen del pedido en la página de transferencia: muestra el importe
 * exacto a transferir y pide el comprobante por WhatsApp.
 */
export default function PerfumesPrevioPagoOrderSummaryClient() {
  const order = useLastOrder();
  const message = buildWhatsappMessage(order, 'Ya transferí. Adjunto el comprobante.');

  return (
    <div className="thankyou-order-box">
      <h2>Resumen de tu pedido</h2>

      {order ? (
        <>
          <ul className="thankyou-order-list">
            {order.lines.map((line) => (
              <li key={line.id}>
                <span className="thankyou-order-line">
                  {line.name}
                  <small>
                    {line.brand} · {formatMoney(line.price)}
                  </small>
                </span>
              </li>
            ))}
          </ul>

          {order.subtotal !== order.total ? (
            <div className="thankyou-order-lines">
              <p>
                <span>Subtotal</span>
                <strong>{formatMoney(order.subtotal)}</strong>
              </p>
              {order.discount ? (
                <p className="is-discount">
                  <span>Descuento por {order.count} perfumes</span>
                  <strong>−{formatMoney(order.discount)}</strong>
                </p>
              ) : null}
            </div>
          ) : null}

          <p className="thankyou-order-total">Total a transferir {formatMoney(order.total)}</p>
        </>
      ) : (
        <p>Tu pedido quedó registrado. Mandanos el comprobante por WhatsApp.</p>
      )}

      <a
        className="whatsapp-confirm"
        href={`https://api.whatsapp.com/send?phone=${WHATSAPP_CONFIRM_PHONE}&text=${encodeURIComponent(message)}`}
      >
        <img src={WHATSAPP_BUTTON_SRC} alt="Enviar comprobante por WhatsApp" width="240" height="72" loading="eager" decoding="async" />
      </a>
    </div>
  );
}

function formatMoney(value) {
  return `$${(value || 0).toLocaleString('es-AR')}`;
}