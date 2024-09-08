"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config"); //import the environment variable from .env files
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const auth_1 = __importDefault(require("./routes/auth"));
const notes_1 = __importDefault(require("./routes/notes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_STRING);
console.log("MONGODB connected");
const app = (0, express_1.default)(); // create a new express app
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json()); // helps config the body of api reuqest into the form of jason fso that we dont have to do it ourselves at every endpoints
app.use(express_1.default.urlencoded({ extended: true })); //help us parse the url get and create parameter...
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
})); //only replies to certain request - we only accept request from this URL and that URL must include the credential in the request
app.get("/api/test", (req, res) => {
    res.json({ message: "hello from express endpoint!" });
});
app.use(express_1.default.static(path_1.default.join(__dirname, "../../frontend/dist"))); //start frontend just by starting backend
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
app.use("/api/notes", notes_1.default);
app.listen(7000, () => {
    console.log("server is running on localhost: 7000");
});
