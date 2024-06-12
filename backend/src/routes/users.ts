import express, { Request, Response} from "express";
import User from "../models/user"

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
    try {
        let user = await User.findOne({
            email: req.body.email,
        });
        
        if (user) {
            return res.status(400).json({ message: "User already exists"});
        }
        //no need to do hashing, we have already done that before saving the password, check middleware in models/user.ts
        user = new User(req.body);
        await user.save();
    } catch (error) {
        console.log(error); //log the error out for developer to see, but not return the rror to the frontend (as it is irrelevant and might be valuable to hacker (?))
        res.status(500).send({message: "Something went wrong"})
    }
})