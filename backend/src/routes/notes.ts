import express, { Request, Response} from "express";
import Note from "../models/note"
import {verifyToken} from "../middleware/auth";
import User from "../models/user";


const router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
    console.log("notes/test path passed");
    res.send("Notes test route");
});


// To retrieve all notes from the database
router.get("/allNotes", verifyToken, (req: Request, res: Response) => {
    console.log(req.userId)
    Note.aggregate(
      [ 
        { $match : {  } },
        // { $match : { userId : req.userId } },
        // { $sort: {createdAt: -1}}
       ]
      )
      .then((result) => {
        if (result.length > 0) {
          console.log(result)
          res.json({
            msg: "All notes have been fetched successfully!",
            content: result,
          });
        } else {
          res.json({ msg: "No notes to show!" });
        }
      })
      .catch((error) => res.json({ msg: error.message }));
  })

  // To add a new note to the database
  router.post("/addNote",  verifyToken, async (req: Request, res: Response) => {
    console.log("addnote path called", req.body)
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User does not exists!" });
    }
    const {title, details} = req.body
    let note = new Note ({title: title, details: details, userId: req.userId});
    note
      .save()
      .then((result) => {
        res.json({
          msg: "Your note was saved successfully!",
          content: result,
        });
      })
      .catch((error) => res.status(400).json({ msg: error.message }));
  });
  
  // To retrive a single note by its ID
  router.get("/noteDetails/:id",  verifyToken, (req: Request, res: Response) => {
    const id = req.params.id;
    Note.findById(id)
      .then((result) => {
        if (result != null) {
          res.json({
            msg: "The note was fetched successfully!",
            content: result,
          });
        } else {
          res.json({ msg: "This note doesn't exits!" });
        }
      })
      .catch((error) => res.json({ msg: error.message }));
  });
  
  // To edit an existing note
  router.patch("/updateNote/:id", verifyToken, (req: Request, res: Response) => {
    const id = req.params.id;
    Note.findByIdAndUpdate(id, req.body, { new: true })
      .then((result) => {
        if (result != null) {
          res.json({
            msg: "The note was updated successfully!",
            content: result,
          });
        } else {
          res.json({ msg: "This note doesn't exist!" });
        }
      })
      .catch((error) => res.json({ msg: error.message }));
  })
  
  // To delete a note from the database
  router.delete("/deleteNote/:id", verifyToken, (req: Request, res: Response) => {
    const id = req.params.id;
    Note.findByIdAndDelete(id)
      .then((result) => {
        if (result != null) {
          res.json({ msg: "The note was successfully deleted!" });
        } else {
          res.json({ msg: "This note doesn't exist!" });
        }
      })
      .catch((error) => res.json({ msg: error.message }));
  })
  
  // Exports
  export default router;