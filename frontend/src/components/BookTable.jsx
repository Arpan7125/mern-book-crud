import { useState } from "react";

import { genreColor } from "../lib/genres";
import { formatPrice } from "../lib/format";


const actionButton =
    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-60";


const BookTable = ({ books, loading, editingId, onEdit, onDelete }) => {

    const [pendingId, setPendingId] = useState(null);

    const [deletingId, setDeletingId] = useState(null);


    const confirmDelete = async (id) => {

        setDeletingId(id);

        await onDelete(id);

        setDeletingId(null);

        setPendingId(null);
    };


    if (loading) {

        return (
            <div className="rounded-lg border border-rule bg-white px-6 py-12 text-muted">
                Loading your books…
            </div>
        );
    }


    if (books.length === 0) {

        return (
            <div className="rounded-lg border border-dashed border-rule px-6 py-14">
                <p className="font-serif text-xl font-semibold">
                    Nothing on the shelf yet
                </p>
                <p className="mt-2 text-muted">
                    Fill in the form to add your first book.
                </p>
            </div>
        );
    }


    return (

        <ul className="divide-y divide-rule overflow-hidden rounded-lg border border-rule bg-white">

            {books.map((book) => {

                const isEditing = editingId === book._id;

                const isPending = pendingId === book._id;

                return (

                    <li
                        key={book._id}
                        className={`relative py-4 pr-4 pl-6 transition-colors sm:pr-5 ${
                            isEditing ? "bg-green-soft" : ""
                        }`}
                    >

                        {/* Spine strip coloured by genre */}
                        <span
                            aria-hidden="true"
                            className="absolute inset-y-0 left-0 w-1.5"
                            style={{ backgroundColor: genreColor(book.genre) }}
                        />


                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">

                            <h3 className="font-serif text-lg leading-snug font-semibold">
                                {book.title}
                            </h3>

                            <p className="font-medium tabular-nums">
                                {formatPrice(book.price)}
                            </p>

                        </div>

                        <p className="text-muted">
                            {book.author}
                        </p>


                        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">

                            <dl className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted">

                                <div>
                                    <dt className="sr-only">Genre</dt>
                                    <dd className="flex items-center gap-1.5">
                                        <span
                                            aria-hidden="true"
                                            className="inline-block size-2 rounded-full"
                                            style={{ backgroundColor: genreColor(book.genre) }}
                                        />
                                        {book.genre}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="sr-only">Published</dt>
                                    <dd className="tabular-nums">{book.publishedYear}</dd>
                                </div>

                                <div className="flex gap-1">
                                    <dt>ISBN</dt>
                                    <dd className="tabular-nums">{book.isbn}</dd>
                                </div>

                            </dl>


                            {isPending ? (

                                <div className="flex items-center gap-2">

                                    <span className="text-sm text-ink">
                                        Delete this book?
                                    </span>

                                    <button
                                        type="button"
                                        disabled={deletingId === book._id}
                                        onClick={() => confirmDelete(book._id)}
                                        className={`${actionButton} bg-danger text-white hover:bg-danger/90`}
                                    >
                                        {deletingId === book._id ? "Deleting…" : "Delete"}
                                    </button>

                                    <button
                                        type="button"
                                        disabled={deletingId === book._id}
                                        onClick={() => setPendingId(null)}
                                        className={`${actionButton} text-ink hover:bg-green-soft`}
                                    >
                                        Keep
                                    </button>

                                </div>

                            ) : (

                                <div className="flex items-center gap-1">

                                    <button
                                        type="button"
                                        onClick={() => onEdit(book)}
                                        aria-label={`Edit ${book.title}`}
                                        className={`${actionButton} text-green hover:bg-green-soft`}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPendingId(book._id)}
                                        aria-label={`Delete ${book.title}`}
                                        className={`${actionButton} text-danger hover:bg-danger/10`}
                                    >
                                        Delete
                                    </button>

                                </div>

                            )}

                        </div>

                    </li>
                );
            })}

        </ul>
    );
};

export default BookTable;
