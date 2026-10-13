'use client';

import { WHATSAPP_BUTTON_SRC, WHATSAPP_CONFIRM_PHONE } from '@/src/lib/perfumes-previo-pago-data';
import { PAYMENT_METHOD_LABEL, buildWhatsappMessage, useLastOrder } from '@/src/lib/use-last-order';

/**
 * Confirmación del pedido para quien pagó con tarjeta o saldo MercadoPago:
 * el link de pago ya lo llevó MercadoPago, así que acá solo se pide el
 * comprobante por WhatsApp.
 */
export default function PerfumesPrevioPagoThankYouClient() {
  const order = useLastOrder();
  const message = buildWhatsappMessage(order, 'Adjunto el comprobante de pago.');

  return (
    <>
      {order?.customerName ? (
        <p className="thankyou-greeting">
          Gracias por tu compra, <strong>{order.customerName}</strong>.
        </p>
      ) : null}

      <a
        className="whatsapp-confirm"
        href={`https://api.whatsapp.com/send?phone=${WHATSAPP_CONFIRM_PHONE}&text=${encodeURIComponent(message)}`}
      >
        <img src={WHATSAPP_BUTTON_SRC} alt="Confirmar por WhatsApp" width="240" height="72" loading="eager" decoding="async" />
      </a>

      {order ? (
        <div className="thankyou-order-box">
          <h2>Tu pedido</h2>
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

          <p className="thankyou-order-total">
            Total {formatMoney(order.total)}
            {order.discount ? (
              <small className="thankyou-order-savings">
                {formatMoney(order.discount)} de descuento aplicado
              </small>
            ) : null}
          </p>

          {order.paymentMethod ? (
            <p className="thankyou-order-method">
              Pagaste con {PAYMENT_METHOD_LABEL[order.paymentMethod] || order.paymentMethod}
            </p>
          ) : null}
        </div>
      ) : (
        <div className="thankyou-order-box">
          <h2>Tu pedido</h2>
          <p>No pudimos recuperar el detalle del pedido. Mandanos un mensaje y lo verificamos.</p>
        </div>
      )}
    </>
  );
}

function formatMoney(value) {
  return `$${(value || 0).toLocaleString('es-AR')}`;
}