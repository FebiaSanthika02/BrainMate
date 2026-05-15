import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

async function callGemini(prompt) {
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    throw new Error("Gemini API key not found. Please set VITE_GEMINI_API_KEY in your .env file.");
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);

    if (error.message && (error.message.includes("429") || error.message.includes("Quota exceeded") || error.message.includes("rate limit"))) {
      throw new Error("Please wait a moment! The free Google API quota allows about 5 requests per minute. Wait 30–60 seconds before trying again.");
    }

    throw new Error(error.message || "Failed to reach AI");
  }
}

export async function getSummary(content) {
  const prompt = `Create a clear, in-depth summary of the following material in English. Use Markdown with headings, bullet points, and emphasis on key concepts.\n\nMaterial:\n${content.substring(0, 30000)}`;
  return await callGemini(prompt);
}

export async function getQuiz(content) {
  const prompt = `Based on the material below, create 5 multiple-choice questions in English.
  Return ONLY valid JSON (array of objects) with no extra text:
  [
    { "question": "...", "options": ["...", "...", "...", "..."], "correct": 0 },
    ...
  ]
  \n\nMaterial:\n${content.substring(0, 30000)}`;

  const response = await callGemini(prompt);
  try {
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : response);
  } catch {
    throw new Error("Could not parse quiz format from AI. Please try again.");
  }
}

export async function getFlashcards(content) {
  const prompt = `Based on the material below, create 8 flashcards for memorization in English.
  Return ONLY valid JSON (array of objects) with no extra text:
  [
    { "front": "Term/Question", "back": "Short explanation/Answer" },
    ...
  ]
  \n\nMaterial:\n${content.substring(0, 30000)}`;

  const response = await callGemini(prompt);
  try {
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : response);
  } catch {
    throw new Error("Could not parse flashcard format from AI. Please try again.");
  }
}

export async function getChatResponse(content, history, userMessage) {
  const historyText = history.map(m => `${m.role}: ${m.text}`).join('\n');
  const prompt = `You are an interactive study assistant helping a student understand document material.
  Answer in a friendly, informative, and concise way in English.

  Document context:
  ${content.substring(0, 15000)}

  Chat history:
  ${historyText}

  Student question: ${userMessage}

  Your answer:`;

  return await callGemini(prompt);
}
