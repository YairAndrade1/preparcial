'use client'
import { useState } from "react";
import { useAuthorsContext } from "@/lib/context/AuthorsContext";
import type { Author } from "@/lib/types/author";

const PLACEHOLDER_IMG = "https://placehold.co/240x240?text=No+Image";

export default function AuthorCard({ author }: { author: Author }) {
    const { deleteAuthor } = useAuthorsContext();
    const [imgSrc, setImgSrc] = useState(author.image || PLACEHOLDER_IMG);

    return (
        <div className="mx-auto w-full max-w-md rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md">
            <div className="mx-auto size-28 overflow-hidden rounded-full ring-2 ring-gray-200">
                <img
                    className="size-full object-cover"
                    src={imgSrc}
                    alt={author.name}
                    onError={() => setImgSrc(PLACEHOLDER_IMG)} />
            </div>
            <h2 className="mt-4 text-center text-xl font-semibold tracking-tight text-gray-900">
                {author.name}
            </h2>
            <div className="mt-2 flex justify-center">
                <span
                    className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600"
                    title="Birth Date">
                    {author.birthDate || "—"}
                </span>
            </div>
            <p className="mt-3 text-center text-sm leading-relaxed text-gray-700">
                {author.description || "No description"}
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
                <button
                    className=" inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 transition-colors hover:bg-gray-50 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
                    aria-label={`Edit ${author.name}`}
                    title="Edit"
                    onClick={() => (window.location.href = `/edit/${author.id}`)}>
                    <img src="/edit.svg" alt="Edit" className="size-5" />
                </button>
                <button
                    className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 p-2.5 text-red-600 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                    aria-label={`Delete ${author.name}`}
                    title="Delete"
                    onClick={async () => {
                        if (!confirm(`¿Are you sure you want to delete "${author.name}"?`)) return;
                        await deleteAuthor(author.id);
                    }}>
                    <img src="/delete.svg" alt="Delete" className="size-5" />
                </button>
            </div>
        </div>
    );
}