import { ShoppingCart } from "lucide-react";

const products = [
  { name: "Mochila Urbana Pastel", price: 24990, oldPrice: 32990, image: "🎒", badge: "20% OFF" },
  { name: "Set de Cuadernos A4 x5", price: 8990, oldPrice: null, image: "📓", badge: null },
  { name: "Cartuchera Doble Cierre", price: 6490, oldPrice: 8990, image: "✏️", badge: "Oferta" },
  { name: "Kit Arte Profesional", price: 15990, oldPrice: null, image: "🎨", badge: "Nuevo" },
  { name: "Pack Resaltadores x6", price: 4990, oldPrice: 6990, image: "🖍️", badge: "30% OFF" },
  { name: "Cuaderno Espiral A5", price: 2990, oldPrice: null, image: "📒", badge: null },
  { name: "Mochila Escolar Premium", price: 34990, oldPrice: 42990, image: "🎒", badge: "Promo" },
  { name: "Set Lápices de Colores", price: 7490, oldPrice: null, image: "🖌️", badge: "Popular" },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0 }).format(price);

const ProductsSection = () => {
  return (
    <section id="productos" className="py-16 md:py-20 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-heading text-3xl md:text-4xl font-800 text-foreground mb-3">
            Productos destacados
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Los más elegidos para esta vuelta a clases
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, i) => (
            <div
              key={i}
              className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {product.badge && (
                <span className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                  {product.badge}
                </span>
              )}

              <div className="aspect-square flex items-center justify-center bg-muted/40 text-6xl group-hover:scale-105 transition-transform duration-300">
                {product.image}
              </div>

              <div className="p-4">
                <h3 className="font-heading font-700 text-sm text-foreground mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-heading font-800 text-lg text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-muted-foreground text-xs line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                  <ShoppingCart className="w-4 h-4" />
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
