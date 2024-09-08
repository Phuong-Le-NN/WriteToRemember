"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.cookies["auth_token"];
    if (!token) {
        return res.status(401).json({ message: "unauthorized 1" });
    }
    try {
        //verify that the token received was created by us and not someone else
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId; //whenver request passed the middle ware and forwarded to the function, the userId is included and passed on as well
        next(); //tell express to continue and do the next thing it was going to do (foward request to ...)
    }
    catch (error) {
        return res.status(401).json({ message: "unauthorized 2" });
    }
};
exports.verifyToken = verifyToken;
