'use client';

import { BANK_DETAILS, BRAND_LOGO_SRC } from '@/src/lib/perfumes-previo-pago-data';
import PerfumesPrevioPagoOrderSummaryClient from '@/src/components/PerfumesPrevioPagoOrderSummaryClient';
import { useLastOrder } from '@/src/lib/use-last-order';

function TransferAmount() {
  const order = useLastOrder();
  if (!order) return <strong>Consultá el importe con tu pedido</strong>;
  return (
    <>
      <strong>{`$${order.total.toLocaleString('es-AR')}`}</strong>
      <p>
        {order.count} {order.count === 1 ? 'perfume' : 'perfumes'}, con el 10% de descuento por
        transferencia
        {order.discount
          ? ` y ${`$${order.discount.toLocaleString('es-AR')}`} de descuento por cantidad`
          : ''}
        .
      </p>
      <small>Sin el comprobante de transferencia no podremos procesar el despacho.</small>
    </>
  );
}

/**
 * Página a la que cae quien eligió transferencia: no hay redirección a una
 * pasarela, así que muestra el CBU y el importe exacto a pagar, y pide el
 * comprobante por WhatsApp.
 *
 * Es un componente cliente porque el importe sale del localStorage del pedido:
 * con precio por perfume el total depende de cuáles perfumes eligió el
 * cliente, así que no puede ser una constante de la página.
 */
export default function PerfumesPrevioPagoTransferPage() {
  return (
    <main className="thankyou-shell">
      <div className="benefits-strip compact">
        <span>Transferencia con 10% OFF</span>
        <span>Envío gratis a todo el país</span>
        <span>Comprobante por WhatsApp</span>
      </div>

      <section className="thankyou-card payment-card-shell">
        <img
          src={BRAND_LOGO_SRC}
          alt="Rosita Rococo"
          width="280"
          height="92"
          className="brand-logo-image thankyou-logo"
          decoding="async"
        />
        <span className="eyebrow">Transferencia</span>
        <h1>Transferí y mandanos el comprobante para despachar tu pedido.</h1>
        <p className="thankyou-copy">
          Tu pedido ya quedó registrado con el 10% de descuento por transferencia aplicado. Transferí
          el monto informado y después envianos el comprobante por WhatsApp.
        </p>

        <PerfumesPrevioPagoOrderSummaryClient />

        <div className="payment-option-grid single-column">
          <article className="payment-option-card bank-highlight-card">
            <span className="payment-option-label">Datos bancarios</span>
            <strong>{BANK_DETAILS.bank}</strong>
            <p>
              <strong>CBU:</strong> {BANK_DETAILS.cbu}
            </p>
            <p>
              <strong>Alias:</strong> {BANK_DETAILS.alias}
            </p>
            <p>
              <strong>Titular:</strong> {BANK_DETAILS.holder}
            </p>
          </article>

          <article className="payment-option-card info-option-card">
            <span className="payment-option-label">Importe a transferir</span>
            <TransferAmount />
          </article>
        </div>
      </section>
    </main>
  );
}