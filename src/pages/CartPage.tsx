import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();

  const shipping = totalPrice > 20000 ? 0 : 3500;
  const finalTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/40 mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-800 text-foreground mb-2">Tu carrito está vacío</h1>
            <p className="text-muted-foreground mb-6">¡Explorá nuestros productos y empezá a agregar!</p>
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Ver productos
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="container flex-1 py-8">
        <Link
          to="/productos"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Seguir comprando
        </Link>

        <h1 className="font-heading text-3xl md:text-4xl font-800 text-foreground mb-8">
          Tu carrito
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-4 bg-card border border-border rounded-2xl p-4 items-center"
              >
                <Link
                  to={`/productos/${product.id}`}
                  className="w-20 h-20 bg-muted/40 rounded-xl overflow-hidden shrink-0 hover:scale-105 transition-transform"
                >
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/productos/${product.id}`}>
                    <h3 className="font-heading font-700 text-sm text-foreground truncate hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-heading font-800 text-primary mt-1">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <div className="flex items-center border border-border rounded-lg overflow-hidden shrink-0">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 font-heading font-700 text-sm text-foreground">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="p-2 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className="font-heading font-800 text-foreground min-w-[5rem] text-right hidden sm:block">
                  {formatPrice(product.price * quantity)}
                </span>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="self-end text-sm text-muted-foreground hover:text-destructive transition-colors font-medium"
            >
              Vaciar carrito
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-6">
              <h2 className="font-heading text-xl font-800 text-foreground mb-6">Resumen</h2>

              <div className="flex flex-col gap-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-heading font-700 text-foreground">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="font-heading font-700 text-foreground">
                    {shipping === 0 ? (
                      <span className="text-primary">Gratis</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Envío gratis en compras mayores a {formatPrice(20000)}
                  </p>
                )}
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-heading font-700 text-foreground">Total</span>
                  <span className="font-heading font-800 text-xl text-primary">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <button className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
                Finalizar compra
              </button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Aceptamos todos los medios de pago
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
