import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { registerUser } from "../services/api";
import Alert from "../components/Alert";
import Field from "../components/Field";
import { inputClass, primaryButton } from "../lib/ui";


const Register = () => {

    const navigate = useNavigate();

    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm();


    const password = watch("password");


    const onSubmit = async (data) => {

        try {

            setServerError("");

            const response = await registerUser({
                name: data.name,
                email: data.email,
                password: data.password
            });

            localStorage.setItem(
                "token",
                response.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.user)
            );

            navigate("/books");

        } catch (error) {

            setServerError(error.message);
        }
    };


    const describe = (name) => ({
        "aria-invalid": errors[name] ? "true" : "false",
        "aria-describedby": errors[name] ? `${name}-error` : undefined
    });


    return (

        <main className="mx-auto flex max-w-6xl justify-center px-5 py-16 sm:px-8 sm:py-24">

            <div className="w-full max-w-sm">

                <h1 className="font-serif text-4xl font-semibold tracking-tight">
                    Create an account
                </h1>

                <p className="mt-2 text-muted">
                    Sign up to start your book list.
                </p>


                <div className="mt-6">
                    <Alert tone="error">{serverError}</Alert>
                </div>


                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-6 space-y-5"
                    noValidate
                >

                    <Field label="Name" htmlFor="name" error={errors.name?.message}>
                        <input
                            id="name"
                            type="text"
                            autoComplete="name"
                            className={inputClass}
                            {...describe("name")}
                            {...register("name", {
                                required: "Enter your name",
                                minLength: {
                                    value: 3,
                                    message: "Name needs at least 3 characters"
                                }
                            })}
                        />
                    </Field>


                    <Field label="Email" htmlFor="email" error={errors.email?.message}>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            className={inputClass}
                            {...describe("email")}
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
                            autoComplete="new-password"
                            placeholder="At least 6 characters"
                            className={inputClass}
                            {...describe("password")}
                            {...register("password", {
                                required: "Choose a password",
                                minLength: {
                                    value: 6,
                                    message: "Password needs at least 6 characters"
                                }
                            })}
                        />
                    </Field>


                    <Field label="Confirm password" htmlFor="confirmPassword" error={errors.confirmPassword?.message}>
                        <input
                            id="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            className={inputClass}
                            {...describe("confirmPassword")}
                            {...register("confirmPassword", {
                                required: "Type your password again",
                                validate: (value) =>
                                    value === password ||
                                    "Passwords don't match"
                            })}
                        />
                    </Field>


                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${primaryButton} w-full`}
                    >
                        {isSubmitting ? "Creating account…" : "Create account"}
                    </button>

                </form>


                <p className="mt-8 border-t border-rule pt-6 text-sm text-muted">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-medium text-green underline underline-offset-4"
                    >
                        Log in
                    </Link>
                </p>

            </div>

        </main>
    );
};

export default Register;
