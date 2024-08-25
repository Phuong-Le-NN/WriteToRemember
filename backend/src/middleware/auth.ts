import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken";

//add the userId type to the Request interface in the namespace Express
declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) =>{
    const token = req.cookies["auth_token"];
    if (!token){
        return res.status(401).json({ message: "unauthorized 1" });
    }

    try {
        //verify that the token received was created by us and not someone else
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
        req.userId = (decoded as JwtPayload).userId; //whenver request passed the middle ware and forwarded to the function, the userId is included and passed on as well
        next(); //tell express to continue and do the next thing it was going to do (foward request to ...)
    } catch(error) {
        return res.status(401).json({ message: "unauthorized 2"})
    }
}