'use client'
import Link from "next/link";
import AuthorForm from "@/components/authors/authorForm";
import { useAuthorsContext } from "@/lib/context/AuthorsContext";
import { useMemo, use } from "react";
import { PacmanLoader } from "react-spinners";

export default function EditAuthorPage({ params }: { params: Promise<{ id: string }> }) {
    const { id: paramId } = use(params);
    const { authors, loading, error } = useAuthorsContext();
    const id = Number(paramId);

    const author = useMemo(
        () => (Number.isFinite(id) ? authors.find((a) => a.id === id) : undefined),
        [authors, id]
    );

    if (!Number.isFinite(id)) {
        return (
            <div className="mx-auto max-w-lg px-4 py-16">
                <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900">Invalid author id</h2>
                    <p className="mt-2 text-sm text-gray-600">Please check the URL.</p>
                    <Link
                        href="/authors"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40">
                        Back to authors
                    </Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center ">
                <PacmanLoader size={50} color={"#000000"} loading={true} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-auto max-w-lg px-4 py-16">
                <p className="text-center font-medium text-red-600">
                    Error: {error}
                </p>
            </div>
        );
    }

    if (!author) {
        return (
            <div className="mx-auto max-w-lg px-4 py-16">
                <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900">Author not found</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        We couldn’t find an author with id <span className="font-mono">{id}</span>.
                    </p>
                    <div className="mt-5 flex items-center justify-center gap-2">
                        <Link
                            href="/authors"
                            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300">
                            Back to authors
                        </Link>
                        <Link
                            href="/crear"
                            className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40">
                            Create new author
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-lg px-4 py-10">
            <AuthorForm author={author} />
        </div>
    );
}