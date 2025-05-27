"use client";
import React from "react";
import { useState } from "react";
/* import { getChatGptResponse } from "./api/actions"; */

export default function Home() {
  const [prompt, setPrompt] = useState("");
  type Message = { role: string; content: string };
  const [chat, setChat] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPrompt(() => e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("prompt: ", prompt);
    setChat((prev) => [
      ...prev,
      { role: "user", content: prompt },
      { role: "assistant", content: "" },
    ]);
    setPrompt("");

    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const reader = response.body?.getReader();
    let assistantMsg = "";

    while (true) {
      const { value, done } = await reader!.read();
      if (done) {
        setIsStreaming(false);
        break;
      }
      setIsStreaming(true);
      assistantMsg += new TextDecoder("utf-8").decode(value);
      setChat((prev) => {
        // Actualiza solo el último mensaje (el del assistant)
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: assistantMsg,
        };
        return updated;
      });
    }
  }

  return (
    <div className="flex flex-col p-80 justify-center items-center min-h-screen">
      <div className=" flex flex-col gap-4 max-w-lg">
        {chat?.map((message, index) => (
          <div
            key={index}
            className={`  ${
              message.role === "user"
                ? " bg-green-200 self-end"
                : "bg-white self-start"
            } text-black p-2 m-2 rounded-2xl`}
          >
            {message.content}
          </div>
        ))}
        {isStreaming && <div className="text-white">Escribiendo...</div>}
      </div>
      <form
        className="flex fixed bottom-6 flex-col gap-4 m-4"
        onSubmit={handleSubmit}
      >
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
  );
}
