"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getChatGptResponse(prompt: string) {
  const response = await openai.chat.completions
    .create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    })
    .then((res) => {
      return res.choices[0].message.content;
    })
    .catch((error) => {
      console.error("Error:", error);
      return "Sorry, I couldn't process your request.";
    });
  return response;
}
