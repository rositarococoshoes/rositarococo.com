import { BRAND_LOGO_SRC } from '@/src/lib/perfumes-previo-pago-data';
import PerfumesPrevioPagoThankYouClient from '@/src/components/PerfumesPrevioPagoThankYouClient';

// La metadata vive en app/gracias-perfumes-pp/page.js, que la genera
// scripts/gen-pp-pages.mjs.
export default function PerfumesPrevioPagoThankYouPage() {
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
          Tu pedido quedó registrado y el pago ya fue aprobado. Mandanos el comprobante por WhatsApp y
          te enviamos el número de seguimiento apenas salga.
        </p>

        <PerfumesPrevioPagoThankYouClient />

        <div className="thankyou-payment-box">
          Te enviamos el seguimiento por WhatsApp. El envío es gratis a todo el país.
        </div>
      </section>
    </main>
  );
}