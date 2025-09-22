'use client'
import Link from "next/link";
import AuthorCard from "@/components/authors/authorCard";
import { useAuthorsContext } from "@/lib/context/AuthorsContext";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthorsPage() {
    const router = useRouter();
    const { authors, loading, error } = useAuthorsContext();

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
                <div className="flex items-center gap-3">
                    <Link
                        href="/favoritos"
                        className="inline-flex gap-2 rounded-xl bg-red-500 px-4 py-2 text-md font-medium text-white hover:bg-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Favorites
                    </Link>
                    <Link
                        href="/create"
                        className="inline-flex gap-2 rounded-xl bg-black px-4 py-2 text-md font-medium text-white hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40">
                        <img src="/add.svg" alt="Create" className="size-6" />
                        New
                    </Link>
                </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-6 ">
                {authors.map((a) => (
                    <AuthorCard key={a.id} author={a} />
                ))}
            </div>
        </div >
    );
}
