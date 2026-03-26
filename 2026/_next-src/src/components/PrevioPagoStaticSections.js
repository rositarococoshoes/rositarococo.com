import {
  BRAND_LOGO_SRC,
  HIGHLIGHTS,
  PAGE_COPY,
  PROGRESS_STEPS,
  TESTIMONIAL_IMAGES,
  TRUST_POINTS,
} from '@/src/lib/previo-pago-data';

export function PrevioPagoIntro() {
  return (
    <>
      <div className="benefits-strip">{HIGHLIGHTS.map((item) => <span key={item}>{item}</span>)}</div>

      <div className="progress-rail">
        {PROGRESS_STEPS.map((step, index) => (
          <div key={step} className={`progress-node ${index === 0 ? 'active' : ''}`}>
            <span>{index + 1}</span>
            <strong>{step}</strong>
          </div>
        ))}
      </div>

      <section className="hero-header-card">
        <div className="brand-lockup large">
          <img
            src={BRAND_LOGO_SRC}
            alt="Rosita Rococo"
            width="320"
            height="108"
            className="brand-logo-image"
            decoding="async"
          />
        </div>
        <div className="hero-heading-copy">
          <h1>{PAGE_COPY.season} <span>{PAGE_COPY.paymentRibbon}</span></h1>
          <p className="hero-promo-copy">{PAGE_COPY.promoLine}</p>
        </div>
      </section>

      <section className="trust-grid refined">
        {TRUST_POINTS.map((point) => (
          <article key={point.title} className="trust-card soft">
            <h2>{point.title}</h2>
            <p>{point.body}</p>
          </article>
        ))}
      </section>
    </>
  );
}

export function PrevioPagoTestimonials() {
  return (
    <section className="testimonials-section-next">
      <div className="section-heading left compact-heading">
        <h2>{PAGE_COPY.testimonialsTitle}</h2>
      </div>
      <div className="testimonial-grid-images">
        {TESTIMONIAL_IMAGES.map((item) => (
          <figure key={item.src} className="testimonial-shot">
            <img
              src={item.src}
              alt={item.alt}
              width="420"
              height="720"
              loading="lazy"
              decoding="async"
              className="testimonial-image"
            />
          </figure>
        ))}
      </div>
    </section>
  );
}
