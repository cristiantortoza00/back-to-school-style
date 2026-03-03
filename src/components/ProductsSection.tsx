import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/CartContext";

const ProductsSection = () => {
  const { addToCart } = useCart();
  const { products } = useProducts();
  const featured = products.slice(0, 8);

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
          {featured.map((product, i) => (
            <div
              key={product.id}
              className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {product.badge && (
                <span className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                  {product.badge}
                </span>
              )}

              <Link to={`/productos/${product.id}`}>
                <div className="aspect-square flex items-center justify-center bg-muted/40 text-6xl group-hover:scale-105 transition-transform duration-300">
                  {product.emoji}
                </div>
              </Link>

              <div className="p-4">
                <Link to={`/productos/${product.id}`}>
                  <h3 className="font-heading font-700 text-sm text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
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
                <button
                  onClick={() => addToCart(product)}
                  className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm py-2.5 rounded-xl hover:opacity-90 transition-opacity"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/productos"
            className="inline-flex items-center justify-center bg-card text-foreground font-bold px-8 py-3.5 rounded-full text-base border border-border hover:bg-muted transition-colors"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
