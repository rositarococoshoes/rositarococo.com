import PrevioPagoOrderSummaryClient from '@/src/components/PrevioPagoOrderSummaryClient';
import {
  BANK_DETAILS,
  BASE_PATH,
  BRAND_LOGO_SRC,
  PREVIO_PAGO_PRICING,
} from '@/src/lib/previo-pago-data';

export function PrevioPagoTransferPage({ pairCount, total }) {
  const totalLabel = total.toLocaleString('es-AR');

  return (
    <main className="thankyou-shell">
      <div className="benefits-strip compact">
        <span>Transferencia con descuento</span>
        <span>Envío gratis</span>
        <span>Comprobante por WhatsApp</span>
      </div>
      <section className="thankyou-card payment-card-shell">
        <img src={BRAND_LOGO_SRC} alt="Rosita Rococo" width="280" height="92" className="brand-logo-image thankyou-logo" decoding="async" />
        <span className="eyebrow">Transferencia</span>
        <h1>Transferí y envianos el comprobante para despachar tu pedido.</h1>
        <p className="thankyou-copy">Tu pedido ya quedó registrado. Pagá el monto informado y luego envianos el comprobante por WhatsApp para seguir con el despacho.</p>

        <PrevioPagoOrderSummaryClient
          pairCount={pairCount}
          total={total}
          title="Resumen de tu pedido"
          showWhatsapp
          whatsappMode="transfer"
        />

        <div className="payment-option-grid single-column">
          <article className="payment-option-card bank-highlight-card">
            <span className="payment-option-label">Datos bancarios</span>
            <strong>{BANK_DETAILS.bank}</strong>
            <p><strong>CBU:</strong> {BANK_DETAILS.cbu}</p>
            <p><strong>Alias:</strong> {BANK_DETAILS.alias}</p>
            <p><strong>Titular:</strong> {BANK_DETAILS.holder}</p>
          </article>
          <article className="payment-option-card info-option-card">
            <span className="payment-option-label">Importe a transferir</span>
            <strong>{`$${totalLabel}`}</strong>
            <p>{pairCount === 2 ? `Precio final por 2 pares con descuento adicional.` : 'Precio final por 1 par con descuento adicional.'}</p>
            <small>Sin el comprobante de transferencia no podremos procesar el despacho.</small>
          </article>
        </div>
      </section>
    </main>
  );
}

export function PrevioPagoPaymentSuccessPage({ pairCount, total, pending = false }) {
  return (
    <main className="thankyou-shell">
      <div className="benefits-strip compact">
        <span>Pago registrado</span>
        <span>Envío gratis</span>
        <span>Seguimiento por email</span>
      </div>
      <section className="thankyou-card payment-card-shell">
        <img src={BRAND_LOGO_SRC} alt="Rosita Rococo" width="280" height="92" className="brand-logo-image thankyou-logo" decoding="async" />
        <span className="eyebrow">{pending ? 'Pago pendiente' : 'Pago exitoso'}</span>
        <h1>{pending ? 'Tu pago quedó pendiente.' : 'Pago recibido exitosamente.'}</h1>
        <p className="thankyou-copy">
          {pending
            ? 'MercadoPago todavía no nos confirmó el pago. Si ya abonaste, esperá unos minutos y revisá tu email.'
            : 'Recibimos tu pago correctamente. Te enviaremos el seguimiento al despachar la encomienda.'}
        </p>

        <PrevioPagoOrderSummaryClient
          pairCount={pairCount}
          total={total}
          title="Detalle del pedido"
          showWhatsapp={pending}
          whatsappMode="support"
          trackPurchase={!pending}
        />

        <div className="thankyou-payment-box">
          {pending
            ? 'Si el estado no se actualiza o necesitás ayuda, escribinos por WhatsApp y revisamos tu caso.'
            : 'No hace falta que nos pidas el seguimiento antes del despacho. Lo vas a recibir automáticamente por email cuando la encomienda esté en poder del correo.'}
        </div>
      </section>
    </main>
  );
}

export function PrevioPagoLegacyOptionsPage({ pairCount, total }) {
  const transferHref = `${BASE_PATH}/${pairCount === 2 ? 'transferenciacbu-2pares.html' : 'transferenciacbu-1par.html'}`;

  return (
    <main className="thankyou-shell">
      <div className="benefits-strip compact">
        <span>Pago previo</span>
        <span>Envío gratis</span>
        <span>Funnel 2026</span>
      </div>
      <section className="thankyou-card payment-card-shell">
        <img src={BRAND_LOGO_SRC} alt="Rosita Rococo" width="280" height="92" className="brand-logo-image thankyou-logo" decoding="async" />
        <span className="eyebrow">Paso de pago</span>
        <h1>Tu pedido está listo para cerrar el pago.</h1>
        <p className="thankyou-copy">Esta página quedó como compatibilidad del flujo histórico. Para generar un link de pago actualizado volvé al checkout 2026, o seguí por transferencia con descuento adicional.</p>

        <PrevioPagoOrderSummaryClient pairCount={pairCount} total={total} title="Tu pedido" />

        <div className="payment-option-grid">
          <article className="payment-option-card">
            <span className="payment-option-label">Pago online</span>
            <strong>{pairCount === 2 ? PREVIO_PAGO_PRICING.bundleLabel : PREVIO_PAGO_PRICING.singleLabel}</strong>
            <p>Volvé al funnel para generar el link de pago actualizado con tarjeta o saldo MercadoPago.</p>
            <a className="submit-button option-button" href={`${BASE_PATH}/index.html#checkout-form`}>Volver al checkout</a>
          </article>
          <article className="payment-option-card bank-highlight-card">
            <span className="payment-option-label">Transferencia</span>
            <strong>{pairCount === 2 ? PREVIO_PAGO_PRICING.cbuBundleLabel : PREVIO_PAGO_PRICING.cbuSingleLabel}</strong>
            <p>Seguí por transferencia bancaria con el descuento adicional ya aplicado.</p>
            <a className="ghost-button option-button" href={transferHref}>Ver datos bancarios</a>
          </article>
        </div>
      </section>
    </main>
  );
}
