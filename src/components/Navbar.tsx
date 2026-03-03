import { ShoppingCart, Menu, X, Settings, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="font-heading text-2xl font-800 text-primary">
          📚 EscolarShop
        </Link>

        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <Link
            to="/"
            className="text-foreground hover:text-primary transition-colors"
          >
            Inicio
          </Link>
          <Link
            to="/productos"
            className="text-foreground hover:text-primary transition-colors"
          >
            Productos
          </Link>
          <Link
            to="/contacto"
            className="text-foreground hover:text-primary transition-colors"
          >
            Contacto
          </Link>
          <Link
            to="/admin"
            className="text-foreground hover:text-primary transition-colors flex items-center gap-1"
          >
            <Settings className="w-3.5 h-3.5" />
            Admin
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            <User className="w-4 h-4" /> Ingresar
          </Link>
          <Link
            to="/carrito"
            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-card px-6 py-4 flex flex-col gap-3 font-medium text-sm">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="text-foreground hover:text-primary transition-colors py-1"
          >
            Inicio
          </Link>
          <Link
            to="/productos"
            onClick={() => setOpen(false)}
            className="text-foreground hover:text-primary transition-colors py-1"
          >
            Productos
          </Link>
          <Link
            to="/contacto"
            onClick={() => setOpen(false)}
            className="text-foreground hover:text-primary transition-colors py-1"
          >
            Contacto
          </Link>
          <Link
            to="/carrito"
            onClick={() => setOpen(false)}
            className="text-foreground hover:text-primary transition-colors py-1"
          >
            Carrito
          </Link>
          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="text-foreground hover:text-primary transition-colors py-1 flex items-center gap-1"
          >
            <User className="w-3.5 h-3.5" />
            Ingresar
          </Link>
          <Link
            to="/admin"
            onClick={() => setOpen(false)}
            className="text-foreground hover:text-primary transition-colors py-1 flex items-center gap-1"
          >
            <Settings className="w-3.5 h-3.5" />
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
