import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ShoppingCart, Filter, X } from "lucide-react";
import { formatPrice } from "@/data/products";
import { useProducts } from "@/context/ProductsContext";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategoryId = searchParams.get("categoria");
  const { addToCart } = useCart();
  const { products, categories } = useProducts();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = activeCategoryId
    ? products.filter((p) => p.category._id === activeCategoryId)
    : products;

  const setCategory = (catId: string | null) => {
    if (catId) {
      setSearchParams({ categoria: catId });
    } else {
      setSearchParams({});
    }
    setSidebarOpen(false);
  };

  const SidebarContent = () => (
    <div className="flex flex-col gap-1">
      <h3 className="font-heading font-700 text-sm text-muted-foreground uppercase tracking-wider mb-2 px-3">
        Categorías
      </h3>
      <button
        onClick={() => setCategory(null)}
        className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
          !activeCategoryId ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
        }`}
      >
        Todos los productos
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => setCategory(cat._id)}
          className={`text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            activeCategoryId === cat._id ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="container flex-1 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading text-3xl md:text-4xl font-800 text-foreground">
              {activeCategoryId
                ? (categories.find((c) => c._id === activeCategoryId)?.name ?? activeCategoryId)
                : "Todos los productos"}
            </h1>
            <p className="text-muted-foreground mt-1">{filtered.length} productos</p>
          </div>
          <button className="lg:hidden flex items-center gap-2 bg-muted px-4 py-2 rounded-xl text-sm font-medium" onClick={() => setSidebarOpen(true)}>
            <Filter className="w-4 h-4" /> Filtrar
          </button>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-4">
              <SidebarContent />
            </div>
          </aside>

          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-foreground/30" onClick={() => setSidebarOpen(false)} />
              <div className="absolute left-0 top-0 bottom-0 w-72 bg-card p-6 shadow-xl animate-slide-in-right">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading font-700 text-lg">Filtrar</h2>
                  <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
                </div>
                <SidebarContent />
              </div>
            </div>
          )}

          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-max">
            {filtered.map((product) => (
              <div key={product._id} className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                {product.badge && (
                  <span className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">{product.badge}</span>
                )}
                <Link to={`/productos/${product._id}`}>
                  <div className="aspect-square bg-muted/40 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/productos/${product._id}`}>
                    <h3 className="font-heading font-700 text-sm text-foreground mb-2 line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-heading font-800 text-lg text-primary">{formatPrice(product.price)}</span>
                    {product.oldPrice && <span className="text-muted-foreground text-xs line-through">{formatPrice(product.oldPrice)}</span>}
                  </div>
                  <button onClick={() => addToCart(product)} className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold text-sm py-2.5 rounded-xl hover:opacity-90 transition-opacity">
                    <ShoppingCart className="w-4 h-4" /> Agregar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
