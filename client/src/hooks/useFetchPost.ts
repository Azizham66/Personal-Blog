import {useState, useEffect, useCallback} from 'react';
import type { Post } from '../types/Post';

type FetchPostResult = {
    post: Post | null;
    loading: boolean;
    error: string | null;
    fetchPost: () => Promise<void>;
}

export function useFetchPost(apiUrl: string, postId: number | string): FetchPostResult {
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPost = useCallback(async (): Promise<void> => {
        setLoading(true);
    setError(null);
    try {
        const res = await fetch(`${apiUrl}/${postId}`);

        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        setPost(data);    
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occured');
        }
    } finally {
        setLoading(false);
    }
    }, [apiUrl, postId]);

    useEffect(() => {
        void fetchPost();
    }, [fetchPost]);

    return { post, loading, error, fetchPost };
    
}