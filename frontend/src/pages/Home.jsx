import { Link } from "react-router-dom";

import Shelf from "../components/Shelf";
import { primaryButton } from "../lib/ui";


const Home = () => {

    const token = localStorage.getItem("token");

    return (

        <main className="mx-auto max-w-6xl px-5 sm:px-8">

            <section className="grid grid-cols-1 gap-14 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-end lg:gap-16 lg:py-24">

                <div className="min-w-0 max-w-xl">

                    <h1 className="font-serif text-5xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl">
                        Your books, catalogued.
                    </h1>

                    <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                        Add titles as you collect them, record the author, genre,
                        year and price, and keep one list you can edit from any device.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-4">

                        {token ? (

                            <Link to="/books" className={primaryButton}>
                                Open your shelf
                            </Link>

                        ) : (

                            <>
                                <Link to="/register" className={primaryButton}>
                                    Create account
                                </Link>

                                <Link
                                    to="/login"
                                    className="rounded-md px-2 py-2.5 font-medium text-green underline decoration-rule decoration-2 underline-offset-4 transition-colors hover:decoration-green"
                                >
                                    Log in
                                </Link>
                            </>

                        )}

                    </div>

                </div>

                <Shelf />

            </section>

        </main>
    );
};

export default Home;
