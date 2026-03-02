import { Link } from "react-router-dom";
import { Backpack, BookOpen, Pencil, Palette, Package } from "lucide-react";

const categories = [
  { name: "Mochilas", icon: Backpack, color: "bg-lavender/20 text-primary", slug: "mochilas" },
  { name: "Cuadernos", icon: BookOpen, color: "bg-celeste/20 text-secondary-foreground", slug: "cuadernos" },
  { name: "Cartucheras", icon: Pencil, color: "bg-rosa/20 text-accent-foreground", slug: "cartucheras" },
  { name: "Sets Escolares", icon: Package, color: "bg-mint/20 text-foreground", slug: "sets-escolares" },
  { name: "Arte y Dibujo", icon: Palette, color: "bg-beige text-foreground", slug: "arte-y-dibujo" },
];

const CategoriesSection = () => {
  return (
    <section id="categorias" className="py-16 md:py-20">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-heading text-3xl md:text-4xl font-800 text-foreground mb-3">
            Categorías destacadas
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Encontrá todo lo que necesitás para empezar el año con todo
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              to={`/productos?categoria=${cat.slug}`}
              className="group flex flex-col items-center gap-3 p-6 md:p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${cat.color} transition-transform group-hover:scale-110`}>
                <cat.icon className="w-7 h-7" />
              </div>
              <span className="font-heading font-700 text-sm text-foreground">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
