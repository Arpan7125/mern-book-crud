import { useEffect, useState } from "react";

import BookForm from "../components/BookForm";
import BookTable from "../components/BookTable";
import Alert from "../components/Alert";
import { formatPrice } from "../lib/format";

import {
    getBooks,
    createBook,
    updateBook,
    deleteBook
} from "../services/api";


const Books = () => {

    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedBook, setSelectedBook] = useState(null);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");


    // GET BOOKS (used after adding or editing)
    const loadBooks = async () => {

        const data = await getBooks();

        setBooks(data);
    };


    // First load
    useEffect(() => {

        let active = true;

        getBooks()
            .then((data) => {
                if (active) setBooks(data);
            })
            .catch((error) => {
                if (active) setError(error.message);
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };

    }, []);


    // CREATE / UPDATE
    const handleSave = async (bookData) => {

        try {

            setError("");

            setMessage("");

            if (selectedBook) {

                await updateBook(
                    selectedBook._id,
                    bookData
                );

                setMessage("Changes saved.");

                setSelectedBook(null);

            } else {

                await createBook(bookData);

                setMessage("Book added.");
            }

            await loadBooks();

        } catch (error) {

            setError(error.message);

            throw error;
        }
    };


    // EDIT
    const handleEdit = (book) => {

        setSelectedBook(book);

        setMessage("");

        setError("");

        document
            .getElementById("book-form")
            ?.scrollIntoView({ block: "start" });
    };


    // DELETE (confirmation happens inline in the list)
    const handleDelete = async (id) => {

        try {

            setError("");

            await deleteBook(id);

            setBooks((current) =>
                current.filter((book) => book._id !== id)
            );

            if (selectedBook?._id === id) {
                setSelectedBook(null);
            }

            setMessage("Book deleted.");

        } catch (error) {

            setError(error.message);
        }
    };


    const total = books.reduce(
        (sum, book) => sum + (Number(book.price) || 0),
        0
    );

    const summary = loading
        ? "Loading your books…"
        : books.length === 0
            ? "No books yet."
            : `${books.length} ${books.length === 1 ? "book" : "books"}, worth ${formatPrice(total)} in total.`;


    return (

        <main className="mx-auto max-w-6xl px-5 pt-10 pb-20 sm:px-8 sm:pt-14">

            <div className="border-b border-rule pb-6">

                <h1 className="font-serif text-4xl font-semibold tracking-tight">
                    Your shelf
                </h1>

                <p className="mt-2 text-muted" aria-live="polite">
                    {summary}
                </p>

            </div>


            {(message || error) && (

                <div className="mt-6 space-y-3">
                    <Alert tone="success">{message}</Alert>
                    <Alert tone="error">{error}</Alert>
                </div>

            )}


            <div className="mt-8 grid gap-8 lg:grid-cols-[22rem_1fr] lg:items-start">

                <aside
                    id="book-form"
                    className="scroll-mt-6 lg:sticky lg:top-6"
                >
                    <BookForm
                        selectedBook={selectedBook}
                        onSave={handleSave}
                        onCancel={() => setSelectedBook(null)}
                    />
                </aside>


                <section aria-labelledby="book-list-heading">

                    <h2 id="book-list-heading" className="sr-only">
                        Books
                    </h2>

                    <BookTable
                        books={books}
                        loading={loading}
                        editingId={selectedBook?._id}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                </section>

            </div>

        </main>
    );
};


export default Books;
