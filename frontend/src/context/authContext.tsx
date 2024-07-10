import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface RootObject {
  token: string;
  user: User;
}

export interface User {
  id: number;
  nombre: string;
  email: string;
  rol_id: number;
}

interface AuthContextProps {
  login: (user: RootObject) => void;
  logout: () => void;
  isAuthenticated: boolean;
  user: RootObject;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const InitialUser: User = {
    id: 0,
    nombre: "",
    email: "",
    rol_id: 0,
  };

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return (storedAuth as string | null) === "true";
  });

  const [user, setUser] = useState<RootObject>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { user: InitialUser, token: "" };
  });

  const login = useCallback((user: RootObject) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("user", JSON.stringify(user));
    setIsAuthenticated(true);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser({ user: InitialUser, token: "" });
  }, []);

  const value = useMemo<AuthContextProps>(
    () => ({
      login,
      logout,
      user,
      isAuthenticated,
    }),
    [user, login, logout, isAuthenticated]
  );

  useEffect(() => {
    // Guardar datos en localStorage al cambiar el estado
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext debe ser utilizado dentro de AuthContextProvider"
    );
  }
  return context;
}
