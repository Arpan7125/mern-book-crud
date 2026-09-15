import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { loginUser } from "../services/api";
import Alert from "../components/Alert";
import Field from "../components/Field";
import { inputClass, primaryButton } from "../lib/ui";


const Login = () => {

    const navigate = useNavigate();

    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm();


    const onSubmit = async (data) => {

        try {

            setServerError("");

            const response = await loginUser(data);

            // Store JWT
            localStorage.setItem(
                "token",
                response.token
            );

            // Store user
            localStorage.setItem(
                "user",
                JSON.stringify(response.user)
            );

            navigate("/books");

        } catch (error) {

            setServerError(error.message);
        }
    };


    return (

        <main className="mx-auto flex max-w-6xl justify-center px-5 py-16 sm:px-8 sm:py-24">

            <div className="w-full max-w-sm">

                <h1 className="font-serif text-4xl font-semibold tracking-tight">
                    Log in
                </h1>

                <p className="mt-2 text-muted">
                    Log in to see and edit your books.
                </p>


                <div className="mt-6">
                    <Alert tone="error">{serverError}</Alert>
                </div>


                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-6 space-y-5"
                    noValidate
                >

                    <Field label="Email" htmlFor="email" error={errors.email?.message}>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            className={inputClass}
                            aria-invalid={errors.email ? "true" : "false"}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            {...register("email", {
                                required: "Enter your email",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email, like you@example.com"
                                }
                            })}
                        />
                    </Field>


                    <Field label="Password" htmlFor="password" error={errors.password?.message}>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            className={inputClass}
                            aria-invalid={errors.password ? "true" : "false"}
                            aria-describedby={errors.password ? "password-error" : undefined}
                            {...register("password", {
                                required: "Enter your password"
                            })}
                        />
                    </Field>


                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${primaryButton} w-full`}
                    >
                        {isSubmitting ? "Logging in…" : "Log in"}
                    </button>

                </form>


                <p className="mt-8 border-t border-rule pt-6 text-sm text-muted">
                    New here?{" "}
                    <Link
                        to="/register"
                        className="font-medium text-green underline underline-offset-4"
                    >
                        Create an account
                    </Link>
                </p>

            </div>

        </main>
    );
};

export default Login;
