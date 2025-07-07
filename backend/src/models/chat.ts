import mongoose, { Schema, Document } from 'mongoose';
import { IMessage, MessageSchema } from './message';


export interface IChat extends Document {
    userId: mongoose.Types.ObjectId; // Reference to the User model
    messages: IMessage[];
}

export const ChatSchema = new Schema<IChat>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        messages: [MessageSchema],
    },
    { timestamps: true }
);

export default mongoose.model<IChat>('Chat', ChatSchema);
