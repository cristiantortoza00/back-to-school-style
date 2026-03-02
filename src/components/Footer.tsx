import { Instagram, Facebook, Twitter, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  return (
    <footer id="contacto" className="bg-foreground text-primary-foreground pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-xl font-800 mb-4">📚 EscolarShop</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Tu librería de confianza para la vuelta a clases. Calidad, precio y estilo en un solo lugar.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-700 mb-4">Contacto</h4>
            <div className="flex flex-col gap-3 text-sm text-primary-foreground/70">
              <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> hola@escolarshop.com</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Av. Corrientes 1234, CABA</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Lun a Sáb 9:00 - 19:00</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-700 mb-4">Información</h4>
            <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
              <a href="#" className="hover:text-primary-foreground transition-colors">Preguntas frecuentes</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Envíos y devoluciones</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Términos y condiciones</a>
              <a href="#" className="hover:text-primary-foreground transition-colors">Política de privacidad</a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-700 mb-4">Newsletter</h4>
            <p className="text-sm text-primary-foreground/70 mb-3">Recibí ofertas exclusivas</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 rounded-xl px-4 py-2.5 text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground font-bold text-sm px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Enviar
              </button>
            </form>

            <div className="flex gap-3 mt-5">
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center text-sm text-primary-foreground/50">
          © 2026 EscolarShop. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
