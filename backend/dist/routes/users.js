"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
router.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user/test path passed");
    res.send("User test route");
}));
router.post("/register", [
    (0, express_validator_1.check)("lastName", "Last Name is reqires").isString(),
    (0, express_validator_1.check)("firstName", "First Name is required").isString(), //check that the firstname property exist if not return message, it also check if first name is a string
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password with 6 or more characters required").isLength({
        min: 6
    })
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() });
    }
    try {
        let user = yield user_1.default.findOne({
            email: req.body.email,
        });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        //no need to do hashing, we have already done that before saving the password, check middleware in models/user.ts
        user = new user_1.default(req.body);
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, //storing id in the web token and the secret key used to accessed it it
        process.env.JWT_SECRET_KEY, {
            expiresIn: "1d" //token expire in 1 day
        });
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000
        });
        return res.status(200).send({ message: "User register OK" });
    }
    catch (error) {
        console.log(error); //log the error out for developer to see, but not return the rror to the frontend (as it is irrelevant and might be valuable to hacker (?))
        res.status(500).send({ message: "Something went wrong" });
    }
}));
exports.default = router;
