import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is missing. AI features will not work.");
}

const genAI = new GoogleGenAI({ apiKey: apiKey || "" });

export async function generateGemResponse(prompt: string, systemInstruction: string) {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}

export async function generateStreamingGemResponse(
  prompt: string, 
  systemInstruction: string,
  onChunk: (text: string) => void
) {
  try {
    const stream = await genAI.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction,
      },
    });

    for await (const chunk of stream) {
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini Stream Error:", error);
    throw error;
  }
}
