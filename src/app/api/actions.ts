"use server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
console.log("API Key: ", process.env.OPENAI_API_KEY);

export async function getChatGptResponse(prompt: string) {
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
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
    stream: true,
  });

  let fullResponse = "";
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      fullResponse += content;
    }
  }
  return fullResponse;
}
