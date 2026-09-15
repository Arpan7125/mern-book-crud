import { Link } from "react-router-dom";

import { primaryButton } from "../lib/ui";


const NotFound = () => {

    return (

        <main className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">

            <div className="max-w-md">

                <p className="font-serif text-7xl font-semibold text-brass">
                    404
                </p>

                <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight">
                    This page isn't on the shelf
                </h1>

                <p className="mt-3 text-muted">
                    The link may be old or mistyped.
                </p>

                <Link to="/" className={`${primaryButton} mt-8`}>
                    Go to home
                </Link>

            </div>

        </main>
    );
};

export default NotFound;
