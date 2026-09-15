import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";



const app = express();

const PORT = process.env.PORT || 8000;


// Database
connectDB();


// Middleware
app.use(cors());

app.use(express.json());


// Test route
app.get("/", (req, res) => {

    res.json({
        message: "Book API is running"
    });
});


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/books", bookRoutes);


// Start server
app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );
});