import type { Post } from "../types/Post";
import { useState } from "react";

export function useAddPost(apiUrl: string, refetch: () => Promise<void>) {
  const [adding, setAdding] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addPost = async (
    newPost: Omit<Post, "_id" | "createdAt" | "updatedAt">
  ) => {
    setAdding(true);
    setError(null);
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);
      const data = await res.json();
      console.log("Post added:", data);

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
