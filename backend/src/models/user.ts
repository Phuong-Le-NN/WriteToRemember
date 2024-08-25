import mongoose from "mongoose"
import bcrypt from "bcryptjs"

//the type created for us to use with typescript in frontend
export type UserType = {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    notes: mongoose.Types.ObjectId[];
};

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note'}]
});

//middleware for mongodb telling monngo that before update the document, check if the password has changed, if yes, then we call bcrypt to hash it
userSchema.pre("save", async function (next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }
    next(); //function by mongo - tell it to just do the next thing, whatever it is
})

const User = mongoose.model<UserType>("User", userSchema);

export default User;
