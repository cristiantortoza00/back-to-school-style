import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Mail, Lock, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useUserContext } from "@/hooks/useContext";
import { useNavigate } from "react-router-dom";

const PASSWORD_VERIFY_CODE_SIGNUP = import.meta.env
  .VITE_PASSWORD_VERIFY_CODE_SIGNUP;

const signupSchema = z.object({
  email: z
    .string()
    .nonempty("Campo obligatorio")
    .trim()
    .email({ message: "Email inválido" }),
  password: z
    .string()
    .nonempty("Campo obligatorio")
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  validationPassword: z
    .string()
    .nonempty("Campo obligatorio")
    .refine((val) => val === PASSWORD_VERIFY_CODE_SIGNUP, {
      message: "La contraseña no coincide con la requerida",
    }),
});

type SignupForm = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const { toast } = useToast();
  const { signUp, setToken } = useUserContext();
  const navigate = useNavigate();
  const [form, setForm] = useState<SignupForm>({
    email: "",
    password: "",
    validationPassword: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupForm, string>>
  >({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof SignupForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const result = signupSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignupForm, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0];
        if (typeof field === "string") {
          fieldErrors[field as keyof SignupForm] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    try {
      const res = await signUp(form.email, form.password);
      console.log(res);
      if (res.status === 201) {
        setToken(res.data);
        localStorage.setItem("token", res.data);
        toast({
          title: "Cuenta creada",
          description: "Tu cuenta ha sido creada exitosamente",
        });
        navigate("/admin");
      }
    } catch (error) {
      toast({
        title: "Error al crear cuenta",
        description:
          "Hubo un error al crear tu cuenta. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-7 h-7 text-primary" />
              </div>
              <h1 className="font-heading text-2xl font-800 text-foreground">
                Crear cuenta
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                Registrate para empezar a comprar
              </p>
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
                {errors.email && (
                  <p className="text-destructive text-xs font-medium">
                    {errors.email}
                  </p>
                )}
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
                {errors.password && (
                  <p className="text-destructive text-xs font-medium">
                    {errors.password}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="validationPassword">
                  Ingrese la contraseña de validación
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="validationPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={form.validationPassword}
                    onChange={(e) =>
                      handleChange("validationPassword", e.target.value)
                    }
                  />
                </div>
                {errors.validationPassword && (
                  <p className="text-destructive text-xs font-medium">
                    {errors.validationPassword}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-3 font-bold text-base rounded-xl"
                disabled={loading}
              >
                {loading ? "Creando cuenta..." : "Crear cuenta"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              ¿Ya tenés cuenta?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                Iniciá sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignupPage;
