'use client'
import Link from "next/link";
import AuthorCard from "@/components/authors/authorCard";
import { useAuthorsContext } from "@/lib/context/AuthorsContext";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FavoritesPage() {
    const router = useRouter();
    const { authors, loading, error, getFavoriteAuthors } = useAuthorsContext();

    useEffect(() => {
        if (error) {
            router.push("/error");
        }
    }, [error, router]);

    if (loading)
        return (
            <div className="fixed inset-0 flex items-center justify-center ">
                <PacmanLoader size={50} color={"#000000"} loading={true} />
            </div>
        );

    if (error) return null;

    const favoriteAuthors = getFavoriteAuthors();

    if (favoriteAuthors.length === 0)
        return (
            <div className="mx-auto max-w-3xl px-4 py-16">
                <div className="rounded-2xl border bg-white p-10 text-center shadow-sm">
                    <div className="mx-auto w-16 h-16 flex items-center justify-center bg-red-50 rounded-full mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        No favorite authors yet
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Go to the authors page and mark some authors as your favorites
                    </p>
                    <Link
                        href="/authors"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40">
                        View the authors
                    </Link>
                </div>
            </div>
        );

    return (
        <div className="mx-auto max-w-6xl px-4 py-10">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                        Favorite Authors ({favoriteAuthors.length})
                    </h1>
                </div>
                <Link
                    href="/authors"
                    className="inline-flex gap-2 rounded-xl bg-gray-100 px-4 py-2 text-md font-medium text-gray-700 hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300">
                    View All Authors
                </Link>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-6 ">
                {favoriteAuthors.map((a) => (
                    <AuthorCard key={a.id} author={a} />
                ))}
            </div>
        </div >
    );
}
