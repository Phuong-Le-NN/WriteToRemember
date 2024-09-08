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
const note_1 = __importDefault(require("../models/note"));
const auth_1 = require("../middleware/auth");
const user_1 = __importDefault(require("../models/user"));
const router = express_1.default.Router();
router.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("notes/test path passed");
    res.send("Notes test route");
}));
// To retrieve all notes from the database
router.get("/allNotes", auth_1.verifyToken, (req, res) => {
    console.log(req.userId);
    //The require('mongodb') statement imports the MongoDB Node.js driver.
    //The .ObjectId property of the imported MongoDB driver is a class used to create or work with MongoDB ObjectId instances.
    const ObjectId = require('mongodb').ObjectId;
    note_1.default.aggregate([
        { $match: { userId: new ObjectId(req.userId) } },
        { $sort: { createdAt: -1 } }
    ])
        .then((result) => {
        if (result.length > 0) {
            console.log(result);
            res.json({
                msg: "All notes have been fetched successfully!",
                content: result,
            });
        }
        else {
            res.json({ msg: "No notes to show!" });
        }
    })
        .catch((error) => res.json({ msg: error.message }));
});
// To add a new note to the database
router.post("/addNote", auth_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("addnote path called", req.body);
    const user = yield user_1.default.findById(req.userId);
    if (!user) {
        return res.status(400).json({ message: "User does not exists!" });
    }
    const { title, details } = req.body;
    let note = new note_1.default({ title: title, details: details, userId: req.userId });
    note
        .save()
        .then((result) => {
        res.json({
            msg: "Your note was saved successfully!",
            content: result,
        });
    })
        .catch((error) => res.status(400).json({ msg: error.message }));
}));
// To retrive a single note by its ID
router.get("/noteDetails/:id", auth_1.verifyToken, (req, res) => {
    const id = req.params.id;
    note_1.default.findById(id)
        .then((result) => {
        if (result != null) {
            res.json({
                msg: "The note was fetched successfully!",
                content: result,
            });
        }
        else {
            res.json({ msg: "This note doesn't exits!" });
        }
    })
        .catch((error) => res.json({ msg: error.message }));
});
// To edit an existing note
router.patch("/updateNote/:id", auth_1.verifyToken, (req, res) => {
    const id = req.params.id;
    note_1.default.findByIdAndUpdate(id, req.body, { new: true })
        .then((result) => {
        if (result != null) {
            res.json({
                msg: "The note was updated successfully!",
                content: result,
            });
        }
        else {
            res.json({ msg: "This note doesn't exist!" });
        }
    })
        .catch((error) => res.json({ msg: error.message }));
});
// To delete a note from the database
router.delete("/deleteNote/:id", auth_1.verifyToken, (req, res) => {
    const id = req.params.id;
    note_1.default.findByIdAndDelete(id)
        .then((result) => {
        if (result != null) {
            res.json({ msg: "The note was successfully deleted!" });
        }
        else {
            res.json({ msg: "This note doesn't exist!" });
        }
    })
        .catch((error) => res.json({ msg: error.message }));
});
// Exports
exports.default = router;
