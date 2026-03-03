import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Mail, Lock, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

type LoginForm = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { toast } = useToast();
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginForm, string>>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof LoginForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof LoginForm;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    // TODO: Conectar con backend de autenticación
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Inicio de sesión exitoso", description: "Bienvenido/a de vuelta." });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-7 h-7 text-primary" />
              </div>
              <h1 className="font-heading text-2xl font-800 text-foreground">Iniciar sesión</h1>
              <p className="text-muted-foreground text-sm mt-1">Ingresá tus datos para acceder a tu cuenta</p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    className="pl-10"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                </div>
                {errors.email && <p className="text-destructive text-xs font-medium">{errors.email}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                </div>
                {errors.password && <p className="text-destructive text-xs font-medium">{errors.password}</p>}
              </div>

              <Button type="submit" className="w-full py-3 font-bold text-base rounded-xl" disabled={loading}>
                {loading ? "Ingresando..." : "Iniciar sesión"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              ¿No tenés cuenta?{" "}
              <Link to="/registro" className="text-primary font-semibold hover:underline">
                Registrate
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
