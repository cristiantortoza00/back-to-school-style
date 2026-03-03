import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingCart, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-2xl font-800 text-foreground mb-2">Producto no encontrado</h1>
            <Link to="/productos" className="text-primary hover:underline">Volver a productos</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="container flex-1 py-8">
        <Link
          to="/productos"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Volver a productos
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="bg-card border border-border rounded-3xl aspect-square overflow-hidden relative">
            {product.badge && (
              <span className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground text-sm font-bold px-3 py-1.5 rounded-full">
                {product.badge}
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-2">
              {product.category.replace("-", " ")}
            </span>

            <h1 className="font-heading text-3xl md:text-4xl font-800 text-foreground mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-heading text-3xl font-800 text-primary">
                {formatPrice(product.price)}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-muted-foreground text-lg line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                  <span className="bg-accent text-accent-foreground text-sm font-bold px-2 py-0.5 rounded-full">
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-heading font-700 text-sm text-foreground">Cantidad:</span>
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 font-heading font-700 text-foreground min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-3 bg-primary text-primary-foreground font-bold text-base py-4 rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 mb-8"
            >
              <ShoppingCart className="w-5 h-5" />
              Agregar al carrito — {formatPrice(product.price * quantity)}
            </button>

            {/* Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border pt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="w-4 h-4 text-primary" /> Envío en 24-48hs
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="w-4 h-4 text-primary" /> Compra segura
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <RotateCcw className="w-4 h-4 text-primary" /> Devolución gratis
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;
