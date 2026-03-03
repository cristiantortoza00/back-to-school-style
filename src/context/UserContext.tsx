import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { api } from "@/api/api";

interface UserContextType {
  token: string | null;
  login: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string) => Promise<any>;
  logout: () => void;
  setToken: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        await api.get("/user/validate"); // 👈 tu endpoint
        // si no tira error → token válido
      } catch (error) {
        setToken(null); // token inválido → logout automático
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/user/login", { email, password });
      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      const res = await api.post("/user/signup/YnspIjdl123tgf", {
        email,
        password,
      });
      return res;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ token, login, logout, signUp, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
