import React, { useState, useEffect, useRef } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import "./Chat.css";

// ⚠️ Important: DO NOT expose API keys in frontend in production.
// For testing only.
const API_KEY = "AIzaSyD4j4zI8pLfjK57tSIP7eRDDPhuCwP7vWY";
const genAI = new GoogleGenerativeAI(API_KEY);

const chatsList = [
  { id: 1, name: "Period Bot", lastMessage: "Hi love 💖, how are you?" },

];

export default function Chatbot() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const openChat = (chat) => {
    setSelectedChat(chat);
    // reset messages when opening Period Bot
    if (chat.id === 1) {
      setMessages([
        {
          sender: "bot",
          text: "Hi love 💖, I’m your period support assistant. Tell me how you’re feeling today!",
        },
      ]);
    } else {
      setMessages([{ sender: "bot", text: `Chat with ${chat.name} started.` }]);
    }
  };

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // only hook Gemini for "Period Bot"
    if (selectedChat?.id === 1) {
      try {
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
          ],
        });

        const prompt = `You are a friendly, supportive chatbot for a periods tracking app. 
        Be warm, comforting, and helpful in your tone. 
        The user said: "${input}"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        setMessages((prev) => [...prev, { sender: "bot", text }]);
      } catch (error) {
        console.error(error);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: "Oops! Something went wrong." },
        ]);
      }
    } else {
      // Fake reply for other friends
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "I'm just a demo chat for now 😊" },
      ]);
    }
  }

  return (
    <div className="chat-app">
      {/* Left Panel */}
      <div className="chat-list">
        {chatsList.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${
              selectedChat?.id === chat.id ? "active" : ""
            }`}
            onClick={() => openChat(chat)}
          >
            <div className="chat-name">{chat.name}</div>
            <div className="chat-last-message">{chat.lastMessage}</div>
          </div>
        ))}
      </div>

      {/* Right Panel */}
      <div className="chat-panel">
        {selectedChat ? (
          <>
            <div className="chat-header">{selectedChat.name}</div>
            <div className="chat-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>
            <div className="chat-input-container">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <p>Select a chat from the left to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
