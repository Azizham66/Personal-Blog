import { useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { AuthContextType } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Hydrate token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    }
  }, []);

  const login = useCallback(async (user: string, password: string) => {
    setLoggingIn(true);
    setLoginError(null);

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });

      if (res.status === 401) {
        const data = await res.json();
        setLoginError(data.message);
        setLoggedIn(false);
        setToken(null);
        localStorage.removeItem("token");
        return;
      }

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      setToken(data.token);
      setLoggedIn(true);
      localStorage.setItem("token", data.token);
    } catch (err: unknown) {
      if (err instanceof Error) setLoginError(err.message);
      else console.error("Unknown login error");
    } finally {
      setLoggingIn(false);
    }
  }, []);

  const logout = useCallback(() => {
    setLoggedIn(false);
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  const value: AuthContextType = {
    loggedIn,
    token,
    loggingIn,
    loginError,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
