import React, { useState, useRef, useEffect } from "react";
import { IMessage } from "../../../backend/src/models/message";
import * as apiClient from "../api-client";

const Chatty: React.FC = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchInitialMessages = async () => {
            try {
                const initialMessages = await apiClient.getInitialChatMessages();
                console.log("Initial messages fetched:", initialMessages);
                setMessages(initialMessages);
            } catch (err) {
                console.error("Error fetching initial messages:", err);
            }
        };

        fetchInitialMessages();
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;
        const inputHolder = input;
        setInput("");
        setMessages((msgs) => [...msgs, { role: "user", content: inputHolder }]); //add user message to display
        try {
            const response = await apiClient.sendMessage({ role: "user", content: inputHolder });
            if (response.content) {
                setMessages((msgs) => [...msgs, { role: "assistant", content: response.content }]); //add bot message to display
            }
        } catch (err) {
            console.error("Error sending message:", err);
            setMessages((msgs) => [...msgs, { role: "assistant", content: "Error: Unable to get a response. Please sign in or try again later." }]);
        }

    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <div className="flex flex-col items-center w-full h-80">
            <h2 className="text-white text-3xl font-bold mt-6">Your big sibling, Chatty!</h2>
            <div
                className="w-full max-w-6xl flex-1 flex flex-col mt-10 border rounded-lg shadow bg-stone-500 border-[silver] bg-opacity-35 backdrop-blur-sm"
                style={{ height: "500px", minHeight: "500px", maxHeight: "500px" }}
            >
                <div className="overflow-y-auto p-4 flex flex-col gap-3 flex-1">
                    {messages.slice(1).map((msg, idx) => (
                        <div
                            key={idx}
                            className={`
                                ${msg.role === "user" ? "self-end bg-blue-600 text-white" : "self-start bg-gray-200 text-gray-900"}
                                rounded-2xl px-4 py-2 max-w-[75%] whitespace-pre-line
                            `}
                        >
                            {msg.content}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
                <div className="flex border-t bg-stone-500 border border-[silver] bg-opacity-35 backdrop-blur-sm p-3">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type a message..."
                        className="flex-1 border-none outline-none text-base px-3 py-2 rounded-full bg-gray-100"
                    />
                    <button
                        onClick={handleSend}
                        className="ml-2 px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chatty;
