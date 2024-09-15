import OpenAI from "openai";
import express, { Request, Response} from "express";
import { verifyToken } from "../middleware/auth";
import {ChatCompletionMessageParam} from "openai/resources";


const router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
    console.log("chatbot/test path passed");
    res.send("Auth test route");
});

// Initialize OpenAI with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.CHAT_BOT as string, // Use environment variable for API key
});

// Global variable to hold the conversation history
let conversationHistory: ChatCompletionMessageParam[] = [
  { role: "system", content: "You are a helpful assistant." },
];

router.post("/ask",  verifyToken, async (req: Request, res: Response) => {
    const userMessage = String(req.body.message);

  // Update conversation history with the user's message
  conversationHistory.push({role: 'user', content: userMessage });

  try {
    // Request a completion from OpenAI based on the updated conversation history
    const completion = await openai.chat.completions.create({
      messages: conversationHistory,
      model: "gpt-3.5-turbo",
    });

    // Extract the response
    const botResponse = completion.choices[0].message.content;

    // Update conversation history with the assistant's response
    conversationHistory.push({role: "assistant", content: String(botResponse)});

    // Send the assistant's response back to the client
    res.json({ message: botResponse });
  } catch (error) {
    console.error("Error calling OpenAI: ", error);
    res.status(500).send("Error generating response from OpenAI");
  }
});

// Exports
export default router;