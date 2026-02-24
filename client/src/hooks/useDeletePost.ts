import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';

export default function useDeletePost(apiUrl: string, postId: number | string, refetch: () => Promise<void>) {
    const [deleting, setDeleting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { token } = useAuth();

    const deletePost = async () => {
        setDeleting(true);
        setError(null);
        try {
            const headers: Record<string, string> = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
            
            const res = await fetch(`${apiUrl}/${postId}`, {
                method: 'DELETE',
                headers
            });
            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }
            refetch();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                setError("An unknown error occurred while deleting post");
            }
        } finally {
            setDeleting(false);
        }
    }

    return {deleting, error, deletePost};
}