import { Link } from "react-router-dom";
import { Store, ArrowRight } from "lucide-react";

const FondoComercioTeaser = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border border-border p-10 md:p-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center">
                <Store className="w-10 h-10 text-primary" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-heading text-2xl md:text-3xl font-800 text-foreground mb-2">
                🏪 ¡Se vende el fondo de comercio!
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-xl">
                Oportunidad única de adquirir una librería establecida con clientes, stock completo e inventario valorizado.
                Negocio llave en mano.
              </p>
            </div>
            <Link
              to="/fondo-de-comercio"
              className="shrink-0 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              Ver más <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FondoComercioTeaser;
