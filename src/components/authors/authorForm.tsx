'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthorsContext } from "@/lib/context/AuthorsContext";
import type { Author } from "@/lib/types/author";

export default function AuthorForm({ author }: { author?: Author }) {
    const router = useRouter();
    const { createAuthor, updateAuthor } = useAuthorsContext();

    const [name, setName] = useState(author?.name ?? "");
    const [image, setImage] = useState(author?.image ?? "");
    const [birthDate, setBirthDate] = useState(author?.birthDate ?? "");
    const [description, setDescription] = useState(author?.description ?? "");
    const [submitting, setSubmitting] = useState(false);
    const [err, setErr] = useState<string | null>(null);

    const isEdit = !!author?.id;

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErr(null);
        if (!name.trim()) {
            setErr("Please enter the author's name.");
            return;
        }
        setSubmitting(true);
        try {
            const payload = {
                name: name.trim(),
                image: image.trim(),
                birthDate,
                description: description.trim(),
            };
            if (isEdit) {
                await updateAuthor(author!.id, payload);
            } else {
                await createAuthor(payload);
            }
            router.push("/authors");
        } catch (error: any) {
            setErr(error?.message || "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form
            role="form"
            onSubmit={onSubmit}
            className="mx-auto w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold tracking-tight text-gray-900">
                {isEdit ? "Edit author" : "Create author"}
            </h2>
            <div className="mb-4">
                <label htmlFor="author-name" className="mb-1 block text-sm font-medium text-gray-700">
                    Author's name
                </label>
                <input
                    id="author-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Gabriel Garcia Marquez"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300" />
            </div>
            <div className="mb-4">
                <label htmlFor="author-image" className="mb-1 block text-sm font-medium text-gray-700">
                    Photo URL
                </label>
                <input
                    id="author-image"
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://…"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300" />
            </div>
            <div className="mb-4">
                <label htmlFor="author-birthdate" className="mb-1 block text-sm font-medium text-gray-700">
                    Birth date
                </label>
                <input
                    id="author-birthdate"
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300" />
            </div>
            <div className="mb-4">
                <label htmlFor="author-description" className="mb-1 block text-sm font-medium text-gray-700">
                    Short bio
                </label>
                <textarea
                    id="author-description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Write a short description…"
                    className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300" />
            </div>
            {err && <p className="mb-3 text-sm font-medium text-red-600">
                {err}
            </p>}
            <div className="mt-2 flex items-center justify-end gap-2">
                <button
                    type="button"
                    onClick={() => router.push("/authors")}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300">
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={submitting || !name.trim()}
                    className={`rounded-xl px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-black/40 ${submitting || !name.trim() ? "cursor-not-allowed bg-gray-300" : "bg-black hover:bg-gray-900"}`}>
                    {isEdit ? (submitting ? "Saving…" : "Save changes") : (submitting ? "Creating…" : "Create author")}
                </button>
            </div>
        </form>
    );
}
