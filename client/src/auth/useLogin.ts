import { useState, useCallback } from "react";

export const useLogin = (apiUrl: string) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    return !!localStorage.getItem("token"); // true if token exists
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token"); // initial token from storage
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // login function
  const login = useCallback(async (user: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });

      if (response.status === 401) {
        const data = await response.json();
        setError(data.message);
        setLoggedIn(false);
        setToken(null);
        localStorage.removeItem("token");
        return;
      }

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setToken(data.token);
      setLoggedIn(true);
      localStorage.setItem("token", data.token); // persist token
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else console.error("Unknown login error");
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  // optional: logout helper
  const logout = useCallback(() => {
    setLoggedIn(false);
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  return { loggedIn, token, loggingIn: loading, loginError: error, login, logout };
};
