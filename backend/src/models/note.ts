import mongoose from "mongoose"

const Schema = mongoose.Schema;

//the type created for us to use with typescript in frontend
export type NoteType = {
    _id: string;
    title: string;
    details: string;
    userId: mongoose.Types.ObjectId;
};

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  },
  { timestamps: true }
);

const Note = mongoose.model<NoteType>("Note", noteSchema);
export default Note;
