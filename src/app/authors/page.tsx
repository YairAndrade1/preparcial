'use client'
import Link from "next/link";
import AuthorCard from "@/components/authors/authorCard";
import { useAuthorsContext } from "@/lib/context/AuthorsContext";

export default function AuthorsPage() {
    const { authors, loading, error } = useAuthorsContext();

    if (loading)
        return (
            <div className="mx-auto max-w-6xl px-4 py-16">
                <p className="text-center text-sm text-gray-600 animate-pulse">
                    Loading Authors…
                </p>
            </div>
        );

    if (error)
        return (
            <div className="mx-auto max-w-6xl px-4 py-16">
                <p className="text-center font-medium text-red-600">
                    Error: {error}
                </p>
            </div>
        );

    if (authors.length === 0)
        return (
            <div className="mx-auto max-w-3xl px-4 py-16">
                <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900">
                        There's no authors yet
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Create the first one
                    </p>
                    <Link
                        href="/crear"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40">
                        <img
                            src="/add.svg"
                            alt="Create"
                            className="size-5" />
                        Create Author
                    </Link>
                </div>
            </div>
        );

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                    Authors
                </h1>
                <Link
                    href="/create"
                    className="inline-flex gap-2 rounded-xl bg-black px-4 py-2 text-md font-medium text-white hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40">
                    <img src="/add.svg" alt="Create" className="size-6" />
                    New
                </Link>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-6 ">
                {authors.map((a) => (
                    <AuthorCard key={a.id} author={a} />
                ))}
            </div>
        </div >
    );
}
