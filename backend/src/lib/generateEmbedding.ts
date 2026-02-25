import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

export async function generateEmbedding(noteContent: string) {
  const result = await model.embedContent({
    content: { 
      role: "user", // 1. Added role to satisfy the 'Content' type
      parts: [{ text: noteContent }] // 2. Use 'text' key inside parts
    },
    outputDimensionality: 768,
  }as any);
  const vector = result.embedding.values;
  const vectorString = `[${vector.join(',')}]`
  return vectorString;
}