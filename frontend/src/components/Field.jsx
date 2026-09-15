const Field = ({ label, htmlFor, error, className = "", children }) => {

    return (
        <div className={className}>

            <label
                htmlFor={htmlFor}
                className="mb-1.5 block text-sm font-medium text-ink"
            >
                {label}
            </label>

            {children}

            {error && (
                <p
                    id={`${htmlFor}-error`}
                    className="mt-1.5 text-sm text-danger"
                >
                    {error}
                </p>
            )}

        </div>
    );
};

export default Field;
