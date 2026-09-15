import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Field from "./Field";
import { GENRES } from "../lib/genres";
import { inputClass, primaryButton, quietButton } from "../lib/ui";


const EMPTY_BOOK = {
    title: "",
    author: "",
    isbn: "",
    genre: "",
    publishedYear: "",
    price: ""
};


const BookForm = ({
    selectedBook,
    onSave,
    onCancel
}) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: EMPTY_BOOK
    });


    // Fill the form when Edit is clicked, clear it otherwise
    useEffect(() => {

        if (selectedBook) {

            reset({
                title: selectedBook.title,
                author: selectedBook.author,
                isbn: selectedBook.isbn,
                genre: selectedBook.genre,
                publishedYear: selectedBook.publishedYear,
                price: selectedBook.price
            });

        } else {

            reset(EMPTY_BOOK);
        }

    }, [selectedBook, reset]);


    const submitHandler = async (data) => {

        try {

            await onSave({
                ...data,
                publishedYear: Number(data.publishedYear),
                price: Number(data.price)
            });

            reset(EMPTY_BOOK);

        } catch {
            // The page shows the error; keep what was typed so it can be fixed
        }
    };


    // Keep a genre that isn't in the list (e.g. from older data) selectable while editing
    const genreOptions =
        selectedBook?.genre &&
        !GENRES.some((genre) => genre.name === selectedBook.genre)
            ? [...GENRES.map((genre) => genre.name), selectedBook.genre]
            : GENRES.map((genre) => genre.name);


    const describe = (name) => ({
        "aria-invalid": errors[name] ? "true" : "false",
        "aria-describedby": errors[name] ? `${name}-error` : undefined
    });


    return (

        <div
            className={`rounded-lg border bg-white p-6 transition-colors ${
                selectedBook ? "border-green" : "border-rule"
            }`}
        >

            <h2 className="font-serif text-2xl font-semibold tracking-tight">
                {selectedBook ? "Edit book" : "Add a book"}
            </h2>

            {selectedBook && (
                <p className="mt-1 text-sm text-muted">
                    Editing “{selectedBook.title}”
                </p>
            )}


            <form
                onSubmit={handleSubmit(submitHandler)}
                className="mt-5 space-y-4"
                noValidate
            >

                <Field label="Title" htmlFor="title" error={errors.title?.message}>
                    <input
                        id="title"
                        type="text"
                        className={inputClass}
                        {...describe("title")}
                        {...register("title", {
                            required: "Enter the book's title"
                        })}
                    />
                </Field>


                <Field label="Author" htmlFor="author" error={errors.author?.message}>
                    <input
                        id="author"
                        type="text"
                        className={inputClass}
                        {...describe("author")}
                        {...register("author", {
                            required: "Enter the author's name"
                        })}
                    />
                </Field>


                <Field label="ISBN" htmlFor="isbn" error={errors.isbn?.message}>
                    <input
                        id="isbn"
                        type="text"
                        inputMode="numeric"
                        placeholder="9780132350884"
                        className={`${inputClass} tabular-nums`}
                        {...describe("isbn")}
                        {...register("isbn", {
                            required: "Enter the ISBN",
                            minLength: {
                                value: 10,
                                message: "ISBN needs at least 10 characters"
                            }
                        })}
                    />
                </Field>


                <Field label="Genre" htmlFor="genre" error={errors.genre?.message}>
                    <select
                        id="genre"
                        className={inputClass}
                        {...describe("genre")}
                        {...register("genre", {
                            required: "Choose a genre"
                        })}
                    >
                        <option value="">Choose a genre</option>

                        {genreOptions.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </Field>


                <div className="grid grid-cols-2 gap-4">

                    <Field label="Year" htmlFor="publishedYear" error={errors.publishedYear?.message}>
                        <input
                            id="publishedYear"
                            type="number"
                            inputMode="numeric"
                            placeholder="2008"
                            className={`${inputClass} tabular-nums`}
                            {...describe("publishedYear")}
                            {...register("publishedYear", {
                                required: "Enter the year",
                                min: {
                                    value: 1000,
                                    message: "Use a year from 1000 to 2100"
                                },
                                max: {
                                    value: 2100,
                                    message: "Use a year from 1000 to 2100"
                                }
                            })}
                        />
                    </Field>


                    <Field label="Price (₹)" htmlFor="price" error={errors.price?.message}>
                        <input
                            id="price"
                            type="number"
                            step="0.01"
                            inputMode="decimal"
                            placeholder="450"
                            className={`${inputClass} tabular-nums`}
                            {...describe("price")}
                            {...register("price", {
                                required: "Enter the price",
                                min: {
                                    value: 0,
                                    message: "Price can't be negative"
                                }
                            })}
                        />
                    </Field>

                </div>


                <div className="flex gap-3 pt-2">

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${primaryButton} flex-1`}
                    >
                        {isSubmitting
                            ? "Saving…"
                            : selectedBook
                                ? "Save changes"
                                : "Add book"}
                    </button>

                    {selectedBook && (
                        <button
                            type="button"
                            onClick={onCancel}
                            className={quietButton}
                        >
                            Cancel
                        </button>
                    )}

                </div>

            </form>

        </div>
    );
};

export default BookForm;
