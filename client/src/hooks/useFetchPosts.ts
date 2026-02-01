import { useState, useEffect, useCallback } from 'react';
import type { Post } from '../types/Post';

type FetchPostsResult = {
    posts: Post[] | null;
    loading: boolean;
    error: string | null;
    fetchPosts: () => Promise<void>;
}

export function useFetchPosts(apiUrl: string): FetchPostsResult {
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPosts = useCallback(async (): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data: Post[] = await response.json();
            setPosts(data);
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
        finally {
            setLoading(false);
        }
    }, [apiUrl]);

    useEffect(() => {
        void fetchPosts();
    }, [fetchPosts]);

    return { posts, loading, error, fetchPosts };
}