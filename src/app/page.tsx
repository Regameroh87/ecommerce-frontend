"use client";
import { useState } from "react";
import { getChatGptResponse } from "./api/actions";

export default function Home() {
  const [prompt, setPrompt] = useState("");

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPrompt(() => e.target.value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("prompt: ", prompt);
    const response = getChatGptResponse(prompt);
    console.log("response: ", response);
  }
  return (
    <div className="flex p-80 justify-center min-h-screen">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className=" bg-white p-2 text-black"
          type="text"
          name="message"
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
