import { useAuth } from "../auth/AuthContext";
import type { Post } from "../types/Post";
import { useState } from "react";

type UpdatePostResult = {
  updatedPost: Post | null;
  loading: boolean;
  error: string | null;
  updatePost: (updatedData: Partial<Post>) => Promise<void>;
};

export function useUpdatePost(
  apiUrl: string,
  postId: string | number
): UpdatePostResult {
  const [updatedPost, setUpdatedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const updatePost = async (updatedData: Partial<Post>) => {
    setLoading(true);
    setError(null);
    try {
      const headers : Record<string, string> = { "Content-Type": "application/json" }; 
      if (token) {
        headers["Authorization"] = `Bearer ${token}`
      }
      const res = await fetch(`${apiUrl}/${postId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) {
        throw new Error("Error: " + res.status + " " + res.statusText);
      }
      const data = await res.json();
      setUpdatedPost(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while updating post");
      }
    }
  };
  return { updatedPost, loading, error, updatePost };
}
