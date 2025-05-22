"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log("API Key: ", process.env.OPENAI_API_KEY);

export async function getChatGptResponse(prompt: string) {
  const response = await openai.chat.completions
    .create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "Eres un entrenador personal experto en fitness y nutrición. Responde de manera motivadora y profesional.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
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
