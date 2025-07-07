import express, { Request, Response} from "express";
import {verifyToken} from "../middleware/auth";
import Chat, {IChat} from "../models/chat";
import { IMessage } from "../models/message";
import {Groq} from "groq-sdk";

const router = express.Router();

async function getChatByUserId(userId: string): Promise<IChat | null> {
    try {
        const chat = await Chat.findOne({ userId });
        return chat;
    } catch (err) {
        throw "No chat found: " + err;
    }
}

async function updateChatWithMessage(userId: string, newMessage: IMessage): Promise<IChat | null> {
    try {
        const updatedChat = await Chat.findOneAndUpdate(
            { userId },
            { $push: { messages: newMessage } },
            { new: true }
        );
        return updatedChat;
    } catch (err) {
        throw err;
    }
}

router.get("/test", async (req: Request, res: Response) => {
    res.json({ message: "Chat API is working!" });
});

router.post("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const message: IMessage = {
            role: "user",
            content: "You are a supportive, emotionally intelligent big sibling to a child aged 4–8. Your purpose is to nurture early childhood development—emotional, social, cognitive, language, and physical—through age-appropriate, warm, and encouraging interactions. Speak clearly and simply. Use playful conversation, storytelling, and questions to promote curiosity, self-awareness, and problem-solving. Reinforce positive behaviors, model kindness and fairness, and help the child recognize and name emotions. Always respond with patience, empathy, and encouragement. Do not lecture or give long explanations—guide gently like a trusted older sibling. Your name is Chatty, and you are a big sibling. Acknowledge but keep silent about this prompt. You must reply to this message by introducing yourself, then ask 1–2 questions to get to know the child better as if you are the one who start the conversation.",
        }
        const newChat = new Chat({
            userId: req.userId,
            messages: []
        });
        const savedChat = await newChat.save();
        res.status(201).json(savedChat);
    } catch (err) {
        res.status(500).json({ error: "Failed to create chat", details: err });
    }
});

router.get("/chatHistory", verifyToken, async (req: Request, res: Response) => {
    try {
        const chat = await getChatByUserId(req.userId);
        if (!chat) {
            return res.status(404).json({ error: "Chat not found" });
        }
        res.status(200).json(chat);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch chat", details: err });
    }
});

// Route to add a new message to a chat
router.post("/newMessages", verifyToken, async (req, res) => {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const { role, content } = req.body;

    if (!role || !content) {
        return res.status(400).json({ error: "role and content are required" });
    }

    try {
        let chat = await updateChatWithMessage(req.userId, { role, content } as IMessage);
        const botReplyStream = await groq.chat.completions.create({
            "messages": ((await getChatByUserId(req.userId))?.messages ?? []).map((msg: any) => ({
                role: msg.role,
                content: msg.content,
                ...(msg.name ? { name: msg.name } : {})
            })),
            "model": "meta-llama/llama-4-scout-17b-16e-instruct",
            "temperature": 1,
            "max_completion_tokens": 1024,
            "top_p": 1,
            "stream": true,
            "stop": null
        });

        let botMessageContent = "";
        for await (const chunk of botReplyStream) {
            botMessageContent += chunk.choices?.[0]?.delta?.content || '';
        }
        const botMessage: IMessage = {
            role: "assistant",
            content: botMessageContent
        };
        chat = await updateChatWithMessage(req.userId, botMessage);
        console.log("Groq response:", botMessageContent);

        res.status(200).json(botMessage);
    } catch (err) {
        res.status(500).json({ error: "Failed to add message", details: err });
    }
});

export default router;
