'use client'

import { useEffect, useState } from "react";
import { Author } from "../types/author";
import { apiGetAuthors } from "../api/authors";

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
                const authorsWithFavorites = data.map((author: Author) => ({
                    ...author,
                    isFavorite: author.isFavorite || false
                }));
                if (mounted) setAuthors(authorsWithFavorites);
            } catch (e: any) {
                if(mounted) setError(e.message);
            } finally {
                if(mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []); 

    // CRUD 
    const createAuthor = async (authorData: Omit<Author, "id">): Promise<Author> => {
        const newId = Date.now();
        const newAuthor: Author = {
            ...authorData,
            id: newId,
            isFavorite: false
        };
        setAuthors((prev) => [newAuthor, ...prev]);
        return newAuthor;
    };

    const updateAuthor = async (id: number, authorData: Omit<Author, "id">): Promise<Author> => {
        const updatedAuthor: Author = {
            ...authorData,
            id,
            isFavorite: authors.find(a => a.id === id)?.isFavorite || false
        };
        setAuthors((prev) => prev.map(a => a.id === id ? updatedAuthor : a));
        return updatedAuthor;
    }

    const deleteAuthor = (id: number): boolean => {
        setAuthors((prev) => prev.filter(a => a.id !== id));
        return true;
    }

    const toggleFavorite = (id: number) => {
        setAuthors((prev) => prev.map(a => a.id === id ? { ...a, isFavorite: !a.isFavorite } : a));
    }

    const getFavoriteAuthors = () => {
        return authors.filter(a => a.isFavorite);
    }

    return { authors, loading, error, createAuthor, updateAuthor, deleteAuthor, toggleFavorite, getFavoriteAuthors };

}