import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="font-heading text-2xl font-800 text-primary">
          📚 EscolarShop
        </a>

        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <a href="#categorias" className="text-foreground hover:text-primary transition-colors">Categorías</a>
          <a href="#productos" className="text-foreground hover:text-primary transition-colors">Productos</a>
          <a href="#promo" className="text-foreground hover:text-primary transition-colors">Ofertas</a>
          <a href="#contacto" className="text-foreground hover:text-primary transition-colors">Contacto</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-muted transition-colors">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">3</span>
          </button>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-card px-6 py-4 flex flex-col gap-3 font-medium text-sm">
          <a href="#categorias" onClick={() => setOpen(false)} className="text-foreground hover:text-primary transition-colors py-1">Categorías</a>
          <a href="#productos" onClick={() => setOpen(false)} className="text-foreground hover:text-primary transition-colors py-1">Productos</a>
          <a href="#promo" onClick={() => setOpen(false)} className="text-foreground hover:text-primary transition-colors py-1">Ofertas</a>
          <a href="#contacto" onClick={() => setOpen(false)} className="text-foreground hover:text-primary transition-colors py-1">Contacto</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
