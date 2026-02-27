import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

export async function generateEmbedding(noteContent: string) {
  const result = await model.embedContent({
    content: {
      role: "user",
      parts: [{ text: noteContent }],
    },
    outputDimensionality: 768,
  } as any);
  const vector = result.embedding.values;
  const vectorString = `[${vector.join(",")}]`;
  return vectorString;
}
