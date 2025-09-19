'use client'

import { useCallback, useEffect, useState } from "react";
import { Author } from "../types/author";
import { apiGetAuthors, apiCreateAuthor, apiUpdateAuthor, apiDeleteAuthor } from "../api/authors";

export default function useAuthors() {
    const[authors, setAuthors] = useState<Author[]>([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState<string|null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                const data = await apiGetAuthors();
                if (mounted) setAuthors(data);
            } catch (e: any) {
                if(mounted) setError(e.message);
            } finally {
                if(mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []); 

    // CRUD 
    const createAuthor = useCallback(async (payload: Omit<Author,"id">) => {
        const created = await apiCreateAuthor(payload);
        setAuthors((prev) => [created, ...prev]);
        return created;
    },[])

    const createAuthorLocal = (author: Author): Author => {
        setAuthors((prev) => [author, ...prev]);
        return author;
    };

    const updateAuthor = useCallback(async (id: number, payload: Omit<Author,"id">) => {
        const updated = await apiUpdateAuthor(id, payload);
        setAuthors((prev) => prev.map(a => (a.id === id? updated : a)));
        return updated;
    },[])

    const updateAuthorLocal = (id: number, author: Author): Author => {
        setAuthors((prev) => prev.map(a => a.id === id? author: a))
        return author
    }
    const deleteAuthorAPI = useCallback(async (id:number) => {
        await apiDeleteAuthor(id);
        setAuthors((prev) => prev.filter(a => (a.id !== id)))
    },[])

    const deleteAuthor = (id: number): boolean => {
        setAuthors((prev) => prev.filter(a => a.id !== id))
        return true;
    }

    return { authors, loading, error, createAuthor, updateAuthor, deleteAuthor};

}