import express, { Application, Request, Response }  from 'express';
import cors from 'cors';
import "dotenv/config"; //import the environment variable from .env files
import mongoose from 'mongoose';
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth"
import noteRoutes from "./routes/notes"
import cookieParser from "cookie-parser"
import path from 'path';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
console.log("MONGODB connected")
const app: Application = express(); // create a new express app
app.use(cookieParser())
app.use(express.json()); // helps config the body of api reuqest into the form of jason fso that we dont have to do it ourselves at every endpoints
app.use(express.urlencoded({ extended: true })); //help us parse the url get and create parameter...
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
})); //only replies to certain request - we only accept request from this URL and that URL must include the credential in the request

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

app.get("/api/test", (req: Request, res: Response) => {
    res.json({ message: "hello from express endpoint!"});
});

app.use(express.static(path.join(__dirname, "../../frontend/dist"))) //start frontend just by starting backend

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/notes", noteRoutes)

app.listen(7000, ()=>{
    console.log("server is running on localhost: 7000")
});

