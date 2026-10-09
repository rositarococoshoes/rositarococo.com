import { BRAND_LOGO_SRC, PRICING } from '@/src/lib/perfumes-previo-pago-data';
import PerfumesPrevioPagoThankYouClient from '@/src/components/PerfumesPrevioPagoThankYouClient';

export default function PerfumesPrevioPagoThankYouPage({ count, total, method }) {
  const totalLabel = total.toLocaleString('es-AR');
  const units = count === 1 ? 'perfume' : 'perfumes';

  const METHOD_LABEL = {
    tarjeta: 'tarjeta',
    mercadopago: 'saldo MercadoPago',
    cbu: 'transferencia bancaria',
  };

  const savings = PRICING.unitPrice * count - total;

  return (
    <main className="thankyou-shell">
      <div className="benefits-strip compact">
        <span>Pago online seguro</span>
        <span>Envío gratis a todo el país</span>
        <span>Confirmación por WhatsApp</span>
      </div>

      <section className="thankyou-card">
        <img
          src={BRAND_LOGO_SRC}
          alt="Rosita Rococo"
          width="280"
          height="92"
          className="brand-logo-image thankyou-logo"
          decoding="async"
        />
        <span className="eyebrow">Último paso</span>
        <h1>Confirmá tu pedido por WhatsApp para que podamos despacharlo.</h1>
        <p className="thankyou-copy">
          Tu pedido quedó registrado. Mandanos el comprobante por WhatsApp y te enviamos el número de
          seguimiento apenas salga.
        </p>

        <PerfumesPrevioPagoThankYouClient count={count} total={total} />

        <div className="thankyou-payment-box">
          {method ? <>Abonaste con {METHOD_LABEL[method] || method}. </> : null}
          Ten listo ${totalLabel} en total. El envío es gratis a todo el país.
          {savings > 0 ? ` Hiciste un ahorro de $${savings.toLocaleString('es-AR')} con la promo.` : ''}
        </div>
      </section>
    </main>
  );
}