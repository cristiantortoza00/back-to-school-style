import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <div className="container flex-1 py-12">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="font-heading text-3xl md:text-4xl font-800 text-foreground mb-3">
            Contactanos
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            ¿Tenés alguna consulta? Estamos para ayudarte
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Info */}
          <div className="flex flex-col gap-6 animate-fade-in-up">
            <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
              <h2 className="font-heading text-xl font-700 text-foreground">
                Información
              </h2>

              <div className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-heading font-700 text-foreground">
                    Dirección
                  </p>
                  <p className="text-muted-foreground">
                    Av. Corrientes 1234, Piso 2<br />
                    CABA, Buenos Aires, Argentina
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-heading font-700 text-foreground">
                    Teléfono
                  </p>
                  <p className="text-muted-foreground">+54 11 1234-5678</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-heading font-700 text-foreground">Email</p>
                  <p className="text-muted-foreground">hola@escolarshop.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Clock className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="font-heading font-700 text-foreground">
                    Horarios
                  </p>
                  <p className="text-muted-foreground">
                    Lunes a Viernes: 9:00 - 19:00
                    <br />
                    Sábados: 10:00 - 14:00
                    <br />
                    Domingos: Cerrado
                  </p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-muted rounded-2xl h-48 flex items-center justify-center text-muted-foreground text-sm">
              <MapPin className="w-5 h-5 mr-2" /> Mapa (próximamente)
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 animate-fade-in-up-delay-1"
          >
            <div>
              <label className="font-heading font-700 text-sm text-foreground block mb-1.5">
                Nombre
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Tu nombre completo"
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="font-heading font-700 text-sm text-foreground block mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="tu@email.com"
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="font-heading font-700 text-sm text-foreground block mb-1.5">
                Asunto
              </label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="¿En qué podemos ayudarte?"
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="font-heading font-700 text-sm text-foreground block mb-1.5">
                Mensaje
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Escribí tu mensaje..."
                rows={5}
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              <Send className="w-4 h-4" /> Enviar mensaje
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
