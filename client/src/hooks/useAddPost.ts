import type { Post } from "../types/Post";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export function useAddPost(apiUrl: string, refetch: () => Promise<void>) {
  const [adding, setAdding] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const addPost = async (
    newPost: Omit<Post, "_id" | "createdAt" | "updatedAt">
  ) => {
    setAdding(true);
    setError(null);
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      
      const res = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(newPost),
      });

      if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
      await res.json(); // Consume response to avoid memory leak
      // Post successfully added
      await refetch();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else console.error("An unknown error occurred while adding post");
    } finally {
      setAdding(false);
    }
  };

  return { adding, error, addPost };
}
