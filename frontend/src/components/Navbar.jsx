import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { primaryButton } from "../lib/ui";


const LogoMark = () => (
    <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        aria-hidden="true"
    >
        <rect x="2" y="5" width="4.5" height="15" rx="0.75" fill="#1F3A2E" />
        <rect x="8.5" y="2" width="4.5" height="18" rx="0.75" fill="#B8891E" />
        <rect x="15" y="7" width="4.5" height="13" rx="0.75" fill="#7A2E3A" />
    </svg>
);


const navLinkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 transition-colors ${
        isActive
            ? "text-ink underline decoration-brass decoration-2 underline-offset-[10px]"
            : "text-muted hover:text-ink"
    }`;


const Navbar = () => {

    const navigate = useNavigate();

    // Re-render on every route change so login/logout shows up straight away
    useLocation();

    const token = localStorage.getItem("token");

    const user = JSON.parse(
        localStorage.getItem("user") || "null"
    );


    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };


    return (

        <header className="border-b border-rule bg-paper">

            <nav
                aria-label="Main"
                className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
            >

                <Link
                    to="/"
                    className="flex items-center gap-2.5 font-serif text-xl font-semibold tracking-tight"
                >
                    <LogoMark />
                    Shelf
                </Link>


                <div className="flex items-center gap-1 text-sm sm:gap-2">

                    {token ? (

                        <>
                            <NavLink to="/books" className={navLinkClass}>
                                Books
                            </NavLink>

                            <span className="hidden px-2 text-muted sm:inline">
                                {user?.name}
                            </span>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="rounded-md px-3 py-2 text-muted transition-colors hover:bg-green-soft hover:text-ink"
                            >
                                Log out
                            </button>
                        </>

                    ) : (

                        <>
                            <NavLink to="/login" className={navLinkClass}>
                                Log in
                            </NavLink>

                            <Link
                                to="/register"
                                className={`${primaryButton} px-4 py-2 text-sm`}
                            >
                                Create account
                            </Link>
                        </>

                    )}

                </div>

            </nav>

        </header>
    );
};

export default Navbar;
