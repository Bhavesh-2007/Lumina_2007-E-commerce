import { GoogleGenAI } from "@google/genai";
import { MOCK_PRODUCTS } from '../constants';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const productContext = MOCK_PRODUCTS.map(p => 
  `- ${p.name} ($${p.price}): ${p.description} (Category: ${p.category})`
).join('\n');

const SYSTEM_INSTRUCTION = `
You are 'Monty', the intelligent shopping assistant for the SnapCart E-Commerce store.
You are friendly, concise, and helpful.
Your goal is to help users find products, answer questions about items, and provide styling or technical advice.

Here is our current product catalog:
${productContext}

Rules:
1. Only recommend products from the catalog above.
2. If a user asks about a product not in the catalog, politely say we don't carry it yet.
3. Keep answers under 100 words unless detailed specs are requested.
4. Use emojis occasionally to be friendly. 🧡
`;

export const getGeminiResponse = async (history: { role: 'user' | 'model'; text: string }[], message: string): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({ message });
    return response.text || "I'm having trouble connecting to my brain right now. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently experiencing high traffic. Please try again in a moment.";
  }
};