import { BRAND_LOGO_SRC } from '@/src/lib/funnel-data';
import ThankYouClient from '@/src/components/ThankYouClient';

export default function ThankYouPage({ pairCount, total }) {
  const totalLabel = total.toLocaleString('es-AR');
  const paymentCopy = pairCount === 2
    ? `Tu promo de 2 pares ya quedo aplicada. Ten listo $${totalLabel} en efectivo para la entrega. El horario sigue siendo entre 15hs y 22hs.`
    : `Ten listo $${totalLabel} en efectivo para la entrega. El horario sigue siendo entre 15hs y 22hs.`;

  return (
    <main className="thankyou-shell">
      <div className="benefits-strip compact">
        <span>Pagas al recibir en efectivo</span>
        <span>Envio gratis</span>
        <span>Confirmacion por WhatsApp</span>
      </div>
      <section className="thankyou-card">
        <img src={BRAND_LOGO_SRC} alt="Rosita Rococo" width="280" height="92" className="brand-logo-image thankyou-logo" decoding="async" />
        <span className="eyebrow">Ultimo paso</span>
        <h1>Confirma tu pedido por WhatsApp para que podamos despacharlo.</h1>
        <p className="thankyou-copy">Sin esta confirmacion final no podremos enviar tu pedido. Cuando abras WhatsApp ya ira cargado el detalle del pedido.</p>
        <ThankYouClient pairCount={pairCount} total={total} />
        <div className="thankyou-payment-box">{paymentCopy}</div>
      </section>
    </main>
  );
}
