import express, { Request, Response} from "express";
import User from "../models/user"
import jwt from "jsonwebtoken"
import { check, validationResult } from "express-validator"

const router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
    console.log("user/test path passed");
    res.send("User test route");
});

router.post("/register", [
    check("lastName", "Last Name is reqires").isString(),
    check("firstName", "First Name is required").isString(), //check that the firstname property exist if not return message, it also check if first name is a string
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
        min:6
    })
],async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() })
    }
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

        const token = jwt.sign(
            {userId: user.id}, //storing id in the web token and the secret key used to accessed it it
            process.env.JWT_SECRET_KEY as string, {
                expiresIn: "1d" //token expire in 1 day
             }
        ) 
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        })
        return res.status(200).send({ message: "User register OK"});
    } catch (error) {
        console.log(error); //log the error out for developer to see, but not return the rror to the frontend (as it is irrelevant and might be valuable to hacker (?))
        res.status(500).send({message: "Something went wrong"})
    }
})

export default router;