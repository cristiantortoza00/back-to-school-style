import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-school.png";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-beige">
      <div className="container py-16 md:py-24 flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left animate-fade-in-up">
          <span className="inline-block bg-primary/15 text-primary font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            🎒 Vuelta a Clases 2026
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-800 leading-tight text-foreground mb-4">
            Todo listo para la{" "}
            <span className="text-primary">vuelta a clases</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-lg mb-8">
            Preparate para el nuevo año escolar con los mejores útiles, mochilas
            y más. ¡Calidad y estilo al mejor precio!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Link
              to="/productos"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground font-bold px-8 py-3.5 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              Ver productos
            </Link>
            <Link
              to="/productos"
              className="inline-flex items-center justify-center bg-card text-foreground font-bold px-8 py-3.5 rounded-full text-base border border-border hover:bg-muted transition-colors"
            >
              Explorar categorías
            </Link>
          </div>
        </div>

        <div className="flex-1 animate-fade-in-up-delay-1">
          <img
            src={heroImage}
            alt="Útiles escolares coloridos - mochilas, cuadernos, lápices y más"
            className="w-full max-w-lg mx-auto drop-shadow-2xl"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
