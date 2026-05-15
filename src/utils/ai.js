import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Initialize the Google Generative AI SDK
const genAI = new GoogleGenerativeAI(API_KEY);

// Use gemini-flash-latest as it is the supported model for this specific API key
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

async function callGemini(prompt) {
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    throw new Error("API Key Gemini tidak ditemukan. Harap isi VITE_GEMINI_API_KEY di file .env");
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // Check if it's a rate limit error (429)
    if (error.message && (error.message.includes("429") || error.message.includes("Quota exceeded") || error.message.includes("rate limit"))) {
      throw new Error("Tunggu sebentar! 🛑 Kuota gratis API Google membatasi 5 interaksi per menit. Mohon tunggu sekitar 30-60 detik sebelum menekan tombol lagi.");
    }
    
    throw new Error(error.message || "Gagal menghubungi AI");
  }
}

export async function getSummary(content) {
  const prompt = `Buatkan rangkuman yang rapi dan mendalam dari materi berikut dalam Bahasa Indonesia. Gunakan format Markdown dengan heading, bullet points, dan penekanan pada konsep kunci. \n\nMateri: \n${content.substring(0, 30000)}`;
  return await callGemini(prompt);
}

export async function getQuiz(content) {
  const prompt = `Berdasarkan materi berikut, buatkan 5 soal pilihan ganda dalam Bahasa Indonesia. 
  Kembalikan HANYA dalam format JSON murni (array of objects) seperti ini tanpa tambahan teks lain:
  [
    { "question": "...", "options": ["...", "...", "...", "..."], "correct": 0 },
    ...
  ]
  \n\nMateri: \n${content.substring(0, 30000)}`;
  
  const response = await callGemini(prompt);
  try {
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : response);
  } catch (e) {
    throw new Error("Gagal membaca format kuis dari AI. Coba lagi.");
  }
}

export async function getFlashcards(content) {
  const prompt = `Berdasarkan materi berikut, buatkan 8 flashcards untuk membantu hafalan. 
  Kembalikan HANYA dalam format JSON murni (array of objects) seperti ini tanpa tambahan teks lain:
  [
    { "front": "Istilah/Pertanyaan", "back": "Penjelasan/Jawaban singkat" },
    ...
  ]
  \n\nMateri: \n${content.substring(0, 30000)}`;
  
  const response = await callGemini(prompt);
  try {
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : response);
  } catch (e) {
    throw new Error("Gagal membaca format flashcard dari AI. Coba lagi.");
  }
}

export async function getChatResponse(content, history, userMessage) {
  const historyText = history.map(m => `${m.role}: ${m.text}`).join('\n');
  const prompt = `Anda adalah asisten belajar interaktif yang membantu mahasiswa memahami materi dokumen.
  Jawablah dengan ramah, informatif, dan langsung ke intinya.

  Context Dokumen: 
  ${content.substring(0, 15000)}

  Histori Chat: 
  ${historyText}

  Pertanyaan Mahasiswa: ${userMessage}
  
  Berikan jawaban Anda sekarang:`;
  
  return await callGemini(prompt);
}
