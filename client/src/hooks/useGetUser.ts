import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

interface User {
  name: string;
  username: string;
  email: string;
  bio: string;
}

export const useGetUser = (apiUrl: string) => {
  const { token } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return; // wait until token exists

    const fetchUser = async () => {
      setLoading(true);
      setError(null);


      try {
        const res = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.status === 401) {
          setError("Unauthorized");
          console.log('eeeee')
          setUser(null);
          return;
        }

        if (!res.ok) throw new Error("Failed to fetch user");

        const data: User = await res.json();
        console.log(data)
        setUser(data);
      } catch {
        setError("Network error");
        console.log('eeeeee')
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    console.log('eeee')
  }, [apiUrl, token]);

  return {
    user,
    userLoading: loading,
    userError: error
  };
};
