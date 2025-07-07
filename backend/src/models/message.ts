import mongoose, { Schema } from 'mongoose';

export interface IMessage {
    role: string;
    content: string;
}

export const MessageSchema = new Schema<IMessage>(
    {
        role: { type: String, required: true },
        content: { type: String, required: true },
    },
    { _id: true }
);

export default mongoose.model<IMessage>('Message', MessageSchema);