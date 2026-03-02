import promoBanner from "@/assets/promo-banner.png";

const PromoSection = () => {
  return (
    <section id="promo" className="py-16 md:py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={promoBanner}
            alt="Promoción vuelta a clases - descuentos especiales"
            className="w-full h-64 md:h-80 object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-primary/60 flex flex-col items-center justify-center text-center px-6">
            <span className="text-primary-foreground/80 font-semibold text-sm uppercase tracking-widest mb-2">
              Oferta especial
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-800 text-primary-foreground mb-3">
              Hasta 40% OFF
            </h2>
            <p className="text-primary-foreground/90 text-lg max-w-md mb-6">
              Descuentos exclusivos por tiempo limitado en toda la línea escolar
            </p>
            <a
              href="#productos"
              className="inline-flex items-center justify-center bg-card text-foreground font-bold px-8 py-3.5 rounded-full hover:bg-muted transition-colors"
            >
              Aprovechar ahora
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
