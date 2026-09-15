import { genreColor } from "../lib/genres";

// Decorative shelf for the home page. Heights are percentages of the shelf.
const SPINES = [
    { title: "Wings of Fire", genre: "Biography", height: 82, width: 30 },
    { title: "Dune", genre: "Fiction", height: 94, width: 38 },
    { title: "Cosmos", genre: "Science", height: 74, width: 28 },
    { title: "Clean Code", genre: "Programming", height: 88, width: 34 },
    { title: "Malgudi Days", genre: "Fiction", height: 70, width: 26 },
    { title: "The Discovery of India", genre: "History", height: 98, width: 44 },
    { title: "The Hobbit", genre: "Fantasy", height: 78, width: 32 },
    { title: "Refactoring", genre: "Programming", height: 86, width: 30 },
    { title: "Sapiens", genre: "History", height: 80, width: 36 },
    { title: "Gitanjali", genre: "Fiction", height: 66, width: 22 },
    { title: "The Pragmatic Programmer", genre: "Technology", height: 92, width: 40 },
    { title: "Origin of Species", genre: "Science", height: 84, width: 34 },
    { title: "Godaan", genre: "Fiction", height: 76, width: 28 },
    { title: "The Silmarillion", genre: "Fantasy", height: 90, width: 36 },
    { title: "Long Walk to Freedom", genre: "Biography", height: 96, width: 42 }
];


const Shelf = () => {

    return (

        <div aria-hidden="true" className="select-none">

            <div className="flex h-72 items-end gap-1 overflow-hidden px-2 sm:h-80">

                {SPINES.map((spine, index) => (

                    <div
                        key={spine.title}
                        className="spine-rise relative flex shrink-0 items-center justify-center overflow-hidden rounded-t-[3px]"
                        style={{
                            height: `${spine.height}%`,
                            width: `${spine.width}px`,
                            backgroundColor: genreColor(spine.genre),
                            animationDelay: `${index * 45}ms`
                        }}
                    >

                        {index % 3 === 0 && (
                            <span className="absolute inset-x-0 top-4 h-[3px] bg-brass/70" />
                        )}

                        <span
                            className="whitespace-nowrap font-serif text-[11px] text-paper/90"
                            style={{
                                writingMode: "vertical-rl",
                                transform: "rotate(180deg)"
                            }}
                        >
                            {spine.title}
                        </span>

                    </div>

                ))}

            </div>

            {/* Shelf board */}
            <div className="h-3 rounded-sm border-t-2 border-brass bg-green-deep" />

        </div>
    );
};

export default Shelf;
