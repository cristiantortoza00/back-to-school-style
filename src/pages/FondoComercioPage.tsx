import { Link } from "react-router-dom";
import { Download, TrendingUp, Users, MapPin, Package, Store, CheckCircle, ArrowRight } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { useProducts } from "@/context/ProductsContext";
import { formatPrice } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FondoComercioPage = () => {
  const { products, categories } = useProducts();

  const totalInventoryValue = products.reduce((sum, p) => sum + p.price, 0);

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("EscolarShop — Inventario Completo", 14, 22);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generado el ${new Date().toLocaleDateString("es-AR")}`, 14, 30);
    doc.text(`Total de productos: ${products.length}`, 14, 36);
    doc.text(`Valor total del inventario: ${formatPrice(totalInventoryValue)}`, 14, 42);

    // Table
    autoTable(doc, {
      startY: 50,
      head: [["#", "Producto", "Categoría", "Precio", "Precio anterior", "Badge"]],
      body: products.map((p, i) => [
        i + 1,
        p.name,
        p.category.name,
        formatPrice(p.price),
        p.oldPrice ? formatPrice(p.oldPrice) : "—",
        p.badge ?? "—",
      ]),
      styles: { fontSize: 9 },
      headStyles: { fillColor: [130, 100, 200] },
    });

    // Categories summary
    const finalY = (doc as any).lastAutoTable?.finalY ?? 200;
    if (finalY + 30 < 280) {
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Categorías", 14, finalY + 15);
      autoTable(doc, {
        startY: finalY + 20,
        head: [["Categoría", "Cantidad de productos"]],
        body: categories.map((c) => [
          c.name,
          products.filter((p) => p.category._id === c._id).length,
        ]),
        styles: { fontSize: 9 },
        headStyles: { fillColor: [130, 100, 200] },
      });
    }

    doc.save("EscolarShop-Inventario-Completo.pdf");
  };

  const highlights = [
    { icon: TrendingUp, label: "Facturación mensual", value: "$2.500.000" },
    { icon: Users, label: "Clientes recurrentes", value: "+800" },
    { icon: Package, label: "Productos en stock", value: `${products.length}` },
    { icon: MapPin, label: "Ubicación", value: "Zona comercial premium" },
  ];

  const includes = [
    "Stock completo de productos valorizado",
    "Base de datos de clientes activa",
    "Marca registrada y dominio web",
    "Mobiliario y equipamiento del local",
    "Proveedores establecidos con condiciones preferenciales",
    "Sistema de gestión y punto de venta",
    "Redes sociales con comunidad activa",
    "Manual de operaciones completo",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15 py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.1),transparent_60%)]" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <span className="inline-block bg-primary/15 text-primary font-bold text-sm px-5 py-2 rounded-full mb-6">
              🏪 Oportunidad única de inversión
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-800 text-foreground mb-6 leading-tight">
              Fondo de Comercio <span className="text-primary">en venta</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Librería y papelería con más de 3 años de trayectoria, cartera de clientes consolidada
              y ubicación estratégica. Un negocio llave en mano listo para seguir creciendo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={downloadPDF}
                className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
              >
                <Download className="w-5 h-5" />
                Descargar inventario (PDF)
              </button>
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center gap-2 bg-card text-foreground font-bold px-8 py-4 rounded-full text-base border border-border hover:bg-muted transition-colors"
              >
                Consultar ahora <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((h, i) => (
              <div key={i} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
                  <h.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-heading text-2xl md:text-3xl font-800 text-foreground">{h.value}</p>
                <p className="text-muted-foreground text-sm mt-1">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <span className="text-primary font-bold text-sm uppercase tracking-wider">¿Qué incluye?</span>
              <h2 className="font-heading text-3xl md:text-4xl font-800 text-foreground mt-2 mb-6">
                Todo lo que necesitás para operar desde el día uno
              </h2>
              <div className="grid gap-3">
                {includes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="animate-fade-in-up-delay-1 bg-gradient-to-br from-primary/5 to-accent/5 border border-border rounded-3xl p-8">
              <Store className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-heading text-xl font-800 text-foreground mb-2">Negocio llave en mano</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                No necesitás experiencia previa. Incluimos capacitación completa, acompañamiento durante
                la transición y toda la documentación del negocio.
              </p>
              <div className="bg-card rounded-2xl p-5 border border-border">
                <p className="text-sm text-muted-foreground mb-1">Valor del inventario actual</p>
                <p className="font-heading text-3xl font-800 text-primary">{formatPrice(totalInventoryValue)}</p>
                <p className="text-xs text-muted-foreground mt-1">{products.length} productos en stock</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products preview */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in-up">
            <span className="text-primary font-bold text-sm uppercase tracking-wider">Inventario</span>
            <h2 className="font-heading text-3xl md:text-4xl font-800 text-foreground mt-2 mb-3">
              Productos incluidos en la venta
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Todos estos productos forman parte del stock actual de la librería
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product, i) => (
              <div
                key={product._id}
                className="animate-fade-in-up bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="aspect-square bg-muted/40 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-700 text-sm text-foreground mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{product.category.name}</p>
                  <span className="font-heading font-800 text-primary">{formatPrice(product.price)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={downloadPDF}
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-3.5 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              <Download className="w-5 h-5" />
              Descargar inventario completo (PDF)
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-3xl p-10 md:p-16 text-center border border-border">
            <h2 className="font-heading text-3xl md:text-4xl font-800 text-foreground mb-4">
              ¿Te interesa esta oportunidad?
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Contactanos para coordinar una visita al local, conocer los números en detalle y resolver todas tus dudas.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold px-10 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              Quiero más información <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FondoComercioPage;
