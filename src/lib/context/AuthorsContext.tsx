'use client'
import { createContext, useContext } from "react";
import { Author } from "../types/author";
import useAuthors from "../hooks/useAuthors";

type AuthorContextType = {
    authors: Author[];
    loading: boolean;
    error: string | null;
    createAuthor: (a: Omit<Author, "id">) => Promise<Author>;
    updateAuthor: (id: number, a: Omit<Author, "id">) => Promise<Author>;
    deleteAuthor: (id: number) => Promise<void>
}

const AuthorsContext = createContext<AuthorContextType | null>(null);

export function AuthorsProvider({ children }: { children: React.ReactNode }) {
    const value = useAuthors();
    return (
        <AuthorsContext.Provider value={value}>
            {children}
        </AuthorsContext.Provider>
    );
}

export function useAuthorsContext() {
    const ctx = useContext(AuthorsContext);
    if (!ctx) throw new Error("useAuthorsContext must be used within AuthorsProvider");
    return ctx;
}
