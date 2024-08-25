import express, { Application, Request, Response }  from 'express';
import cors from 'cors';
import "dotenv/config"; //import the environment variable from .env files
import mongoose from 'mongoose';
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth"
import noteRoutes from "./routes/notes"
import cookieParser from "cookie-parser"

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
console.log("MONGODB connected")
const app: Application = express(); // create a new express app
app.use(cookieParser())
app.use(express.json()); // helps config the body of api reuqest into the form of jason fso that we dont have to do it ourselves at every endpoints
app.use(express.urlencoded({ extended: true })); //help us parse the url get and create parameter...
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
})); //only replies to certain request - we only accept request from this URL and that URL must include the credential in the request

app.get("/api/test", (req: Request, res: Response) => {
    res.json({ message: "hello from express endpoint!"});
});

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/notes", noteRoutes)

app.listen(7000, ()=>{
    console.log("server is running on localhost: 7000")
});

