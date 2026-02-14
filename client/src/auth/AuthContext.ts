import { createContext, useContext } from "react";

export interface AuthContextType {
  loggedIn: boolean;
  token: string | null;
  loggingIn: boolean;
  loginError: string | null;
  login: (user: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
