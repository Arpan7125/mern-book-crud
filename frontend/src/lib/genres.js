// Each genre has its own spine colour, used in the book list and on the home shelf
export const GENRES = [
    { name: "Fiction", color: "#7A2E3A" },
    { name: "Science", color: "#2E6E73" },
    { name: "Technology", color: "#4A5568" },
    { name: "Programming", color: "#33507A" },
    { name: "Biography", color: "#8A6A2F" },
    { name: "History", color: "#5B4636" },
    { name: "Fantasy", color: "#5A3F77" }
];

const FALLBACK_COLOR = "#7C817A";

export const genreColor = (name) =>
    GENRES.find((genre) => genre.name === name)?.color || FALLBACK_COLOR;
