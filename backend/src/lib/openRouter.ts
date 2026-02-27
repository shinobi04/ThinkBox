/**
 * OpenRouter Service Integration
 *
 * Provides functions to interact with the OpenRouter API (using OpenAI's SDK).
 * Implements the Retrieval-Augmented Generation (RAG) logic by passing
 * retrieved context and user queries to an LLM, and streaming the
 * resulting generated response out to the provided Express Response object.
 */
import OpenAI from "openai";
import type { Response } from "express";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export async function RagImplementation(
  context: string,
  userQuery: string,
  res: Response,
) {
  const stream = await openai.chat.completions.create({
    model: "qwen/qwen3.5-flash-02-23",
    max_tokens: 1000,
    messages: [
      {
        role: "system",
        content: `Use these notes to answer accurately: \n${context}`,
      },
      {
        role: "user",
        content: userQuery,
      },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;

    if (content) {
      res.write(content);
      process.stdout.write(content);
    }
  }
}
