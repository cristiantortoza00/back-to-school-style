import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } =
    useCart();

  const shipping = totalPrice > 20000 ? 0 : 3500;
  const finalTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Navbar />
        <div className="flex flex-1 items-center justify-center py-20">
          <div className="text-center">
            <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-muted-foreground/40" />
            <h1 className="font-800 mb-2 font-heading text-2xl text-foreground">
              Tu carrito está vacío
            </h1>
            <p className="mb-6 text-muted-foreground">
              ¡Explorá nuestros productos y empezá a agregar!
            </p>
            <Link
              to="/productos"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground transition-opacity hover:opacity-90"
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
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <div className="container flex-1 py-8">
        <Link
          to="/productos"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Seguir comprando
        </Link>

        <h1 className="font-800 mb-8 font-heading text-3xl text-foreground md:text-4xl">
          Tu carrito
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-4 lg:col-span-2">
            {items.map(({ product, quantity }) => (
              <div
                key={product._id}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
              >
                <Link
                  to={`/productos/${product._id}`}
                  className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-muted/40 transition-transform hover:scale-105"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <Link to={`/productos/${product._id}`}>
                    <h3 className="font-700 truncate font-heading text-sm text-foreground transition-colors hover:text-primary">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-800 mt-1 font-heading text-primary">
                    {formatPrice(product.price)}
                  </p>
                </div>

                <div className="flex shrink-0 items-center overflow-hidden rounded-lg border border-border">
                  <button
                    onClick={() => updateQuantity(product._id, quantity - 1)}
                    className="p-2 transition-colors hover:bg-muted"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="font-700 px-3 font-heading text-sm text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product._id, quantity + 1)}
                    className="p-2 transition-colors hover:bg-muted"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>

                <span className="font-800 hidden min-w-[5rem] text-right font-heading text-foreground sm:block">
                  {formatPrice(product.price * quantity)}
                </span>

                <button
                  onClick={() => removeFromCart(product._id)}
                  className="shrink-0 p-2 text-muted-foreground transition-colors hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="self-end text-sm font-medium text-muted-foreground transition-colors hover:text-destructive"
            >
              Vaciar carrito
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
              <h2 className="font-800 mb-6 font-heading text-xl text-foreground">
                Resumen
              </h2>

              <div className="mb-6 flex flex-col gap-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-700 font-heading text-foreground">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío</span>
                  <span className="font-700 font-heading text-foreground">
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
                <div className="flex justify-between border-t border-border pt-3">
                  <span className="font-700 font-heading text-foreground">
                    Total
                  </span>
                  <span className="font-800 font-heading text-xl text-primary">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              <button className="w-full rounded-xl bg-primary py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-opacity hover:opacity-90">
                Finalizar compra
              </button>

              <p className="mt-4 text-center text-xs text-muted-foreground">
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
