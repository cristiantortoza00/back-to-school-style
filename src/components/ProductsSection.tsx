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
    <section id="productos" className="bg-muted/50 py-16 md:py-20">
      <div className="container">
        <div className="animate-fade-in-up mb-12 text-center">
          <h2 className="font-800 mb-3 font-heading text-3xl text-foreground md:text-4xl">
            Productos destacados
          </h2>
          <p className="mx-auto max-w-md text-lg text-muted-foreground">
            Los más elegidos para esta vuelta a clases
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {featured.map((product, i) => (
            <div
              key={product._id}
              className="animate-fade-in-up group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {product.badge && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
                  {product.badge}
                </span>
              )}

              <Link to={`/productos/${product._id}`}>
                <div className="aspect-square overflow-hidden bg-muted/40">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </Link>

              <div className="p-4">
                <Link to={`/productos/${product._id}`}>
                  <h3 className="font-700 mb-2 line-clamp-2 font-heading text-sm text-foreground transition-colors hover:text-primary">
                    {product.name}
                  </h3>
                </Link>
                <div className="mb-3 flex items-center gap-2">
                  <span className="font-800 font-heading text-lg text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/productos"
            className="inline-flex items-center justify-center rounded-full border border-border bg-card px-8 py-3.5 text-base font-bold text-foreground transition-colors hover:bg-muted"
          >
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
