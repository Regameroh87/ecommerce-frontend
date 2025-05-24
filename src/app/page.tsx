"use client";
import React from "react";
import { useState } from "react";
/* import { getChatGptResponse } from "./api/actions"; */

export default function Home() {
  const [prompt, setPrompt] = useState("");
  type Message = { role: string; content: string };
  const [partialMessage, setPartialMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPrompt(() => e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("prompt: ", prompt);
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setPrompt("");

    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const reader = response.body?.getReader();

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = new TextDecoder("utf-8").decode(value);
        setPartialMessage((prev) => prev + text);
        setIsStreaming(true);
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: partialMessage },
      ]);
      console.log("");
      setIsStreaming(false);
      setPartialMessage("");
    }
  }
  return (
    <div className="flex flex-col p-80 justify-center min-h-screen">
      <div className=" w-auto h-auto bg-amber-50 text-amber-300 gap-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.role === "user" ? "text-right" : "text-left"}
          >
            {msg.content}
          </div>
        ))}

        {isStreaming && (
          <div className="text-left text-gray-500 italic m-4">
            {partialMessage}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4 m-4">
        <form onSubmit={handleSubmit}>
          <input
            className=" bg-white p-2 text-black"
            type="text"
            name="message"
            autoComplete="off"
            value={prompt}
            onChange={onChange}
          />
          <button
            className=" bg-blue-500 hover:bg-blue-800 p-2 rounded-2xl"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
