import express, { Request, Response} from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { verifyToken } from "../middleware/auth"

const router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
    console.log("auth/test path passed");
    res.send("Auth test route");
});

router.post("/login", [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more chracter is required").isLength({min:6})
], async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() })
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password) //take the password, form the same hashing as it did when the user created account and if the 2 hashing are the same, the password is correct
        //once the comparison happen, the result is boolean (true or false)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" }) //not letting exactly whter the email or password was wrong for security issue
        }

        const token  = jwt.sign(
            {userId: user.id}, 
            process.env.JWT_SECRET_KEY as string, 
            {
                expiresIn: "1d",
            }
        );

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", //true when NODe_ENV is production (when deployed), false when it is development (local host)
            maxAge: 86400000
        })
        res.status(200).json({userId: user._id});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" })
    }
})

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    //this run the middleware (verifyToken) to check if the request passed or not by chekcing the HTTP sent here from frontend in the request
    //if passed, the middleware will forward the request to this function
    res.status(200).send({userId: req.userId})
})

router.post("/logout", (req: Request, res: Response)=>{ //no need to verifyToken since we just set anything there is to an invalid token
    res.cookie("auth_token", "", {
        expires: new Date(0) //the token is expire the moment it is created => can never be used => the cookie token is now invalid
    })
    //dont forget to send back the response :))
    res.send();
})

export default router;