'use client'
import { useState } from "react";
import { useAuthorsContext } from "@/lib/context/AuthorsContext";
import type { Author } from "@/lib/types/author";

const PLACEHOLDER_IMG = "https://placehold.co/240x240?text=No+Image";

export default function AuthorCard({ author }: { author: Author }) {
    const { deleteAuthor, toggleFavorite } = useAuthorsContext();
    const [imgSrc, setImgSrc] = useState(author.image || PLACEHOLDER_IMG);

    return (
        <div className={`mx-auto w-full max-w-md rounded-3xl border p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md flex flex-col h-full relative ${author.isFavorite
            ? 'border-red-200 bg-red-50/50'
            : 'border-gray-200 bg-white/80'
            }`}>
            {author.isFavorite && (
                <div className="absolute top-3 right-3">
                    <svg className="size-6 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
            )}
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
            <p className="mt-3 flex-1 text-center text-sm leading-relaxed text-gray-700">
                {author.description || "No description"}
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
                <button
                    className={`inline-flex items-center justify-center rounded-xl border p-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 ${author.isFavorite
                        ? 'border-red-200 bg-red-50 text-red-600 hover:bg-red-100 focus-visible:ring-red-300'
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 hover:text-black focus-visible:ring-gray-300'
                        }`}
                    aria-label={`${author.isFavorite ? 'Remove from' : 'Add to'} favorites`}
                    title={author.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    onClick={() => toggleFavorite(author.id)}>
                    <svg
                        className="size-5"
                        fill={author.isFavorite ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>
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