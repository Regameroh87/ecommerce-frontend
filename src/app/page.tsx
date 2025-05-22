"use client";
import React from "react";
import { useState } from "react";
/* import { getChatGptResponse } from "./api/actions"; */

export default function Home() {
  const [prompt, setPrompt] = useState("");
  type Message = { role: string; content: string };
  const [chat, setChat] = useState<Message[]>([]);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPrompt(() => e.target.value);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("prompt: ", prompt);
    setChat((prev) => [...prev, { role: "user", content: prompt }]);
    setPrompt("");
    /* const response = await getChatGptResponse(prompt); */
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();

    console.log("response: ", data.message);
    /*     if (data) {
      const { message } = await data.response.json();
      setChat((prev) => [...prev, { role: "assistant", content: response }]);
    } */
  }

  return (
    <div className="flex p-80 justify-center min-h-screen">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          {chat?.map((message, index) => (
            <div
              key={index}
              className={`${
                message.role === "user" ? "text-blue-500" : "text-green-500"
              } bg-gray-200 p-2 rounded-2xl`}
            >
              {message.content}
            </div>
          ))}
        </div>
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
