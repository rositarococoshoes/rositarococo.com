import { BRAND_LOGO_SRC, PRICING } from '@/src/lib/perfumes-data';
import PerfumesThankYouClient from '@/src/components/PerfumesThankYouClient';

export default function PerfumesThankYouPage({ count, total }) {
  const totalLabel = total.toLocaleString('es-AR');
  const units = count === 1 ? 'perfume' : 'perfumes';

  const promoCopy =
    count === 1
      ? `Si querías el precio de $${PRICING.pair.toLocaleString('es-AR')} por 2, avisanos por WhatsApp y lo ajustamos.`
      : `Tu promo de ${count} perfumes ya quedó aplicada y es el mejor precio por unidad.`;

  return (
    <main className="thankyou-shell">
      <div className="benefits-strip compact">
        <span>Pagás al recibir en efectivo</span>
        <span>Envío gratis</span>
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
          Sin esta confirmación final no podremos enviar tu pedido. Cuando abras WhatsApp ya irá
          cargado el detalle.
        </p>

        <PerfumesThankYouClient count={count} total={total} />

        <div className="thankyou-payment-box">
          Ten listo ${totalLabel} en efectivo para la entrega. El horario de recepción es entre 15hs
          y 22hs. {promoCopy}
        </div>
      </section>
    </main>
  );
}
