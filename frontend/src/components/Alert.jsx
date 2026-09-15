const tones = {
    success: "border-green/25 bg-green-soft text-green",
    error: "border-danger/30 bg-danger/5 text-danger"
};

const Alert = ({ tone = "success", children }) => {

    if (!children) {
        return null;
    }

    return (
        <div
            role={tone === "error" ? "alert" : "status"}
            className={`rounded-md border px-4 py-3 text-sm ${tones[tone]}`}
        >
            {children}
        </div>
    );
};

export default Alert;
