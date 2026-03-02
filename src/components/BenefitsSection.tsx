import { Truck, CreditCard, Percent, ShieldCheck } from "lucide-react";

const benefits = [
  { icon: Truck, title: "Envíos rápidos", desc: "Recibí tu pedido en 24-48hs" },
  { icon: CreditCard, title: "Todos los medios", desc: "Tarjeta, transferencia y efectivo" },
  { icon: Percent, title: "Descuentos por cantidad", desc: "Más comprás, más ahorrás" },
  { icon: ShieldCheck, title: "Compra segura", desc: "Datos protegidos y garantía" },
];

const BenefitsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-3 p-6 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <b.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-700 text-foreground">{b.title}</h3>
              <p className="text-muted-foreground text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
