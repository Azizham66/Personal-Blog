import { useState } from 'react';


export default function useDeletePost(apiUrl: string, postId: number, refetch: () => Promise<void>) {
    const [deleting, setDeleting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const deletePost = async () => {
        setDeleting(true);
        setError(null);
        try {
            const res = await fetch(`${apiUrl}/${postId}`, {method: 'DELETE'});
            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }
            refetch();
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            }
            else {
                console.error("An unknown error occurred while deleting post");
            }
        } finally {
            setDeleting(false);
        }
    }

    return {deleting, error, deletePost};
}