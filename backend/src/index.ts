import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import noteRoutes from "./routes/notes";
import cookieParser from "cookie-parser";
import path from 'path';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
console.log("MONGODB connected");

const app: Application = express();

// Apply CORS middleware
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));


// Optional: handle preflight separately ONLY if needed
// app.options('*', cors());  // This line is only needed if you're NOT using app.use(cors(...)) correctly

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Define API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);

// Test endpoint
app.get("/api/test", (req: Request, res: Response) => {
    res.json({ message: "hello from express endpoint!" });
});

// Start the server
app.listen(7000, () => {
    console.log("Server is running on localhost:7000");
});
