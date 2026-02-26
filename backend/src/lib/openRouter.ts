import OpenAI from "openai";
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export async function RagImplementation() {
  const stream = await openai.chat.completions.create({
    model: "qwen/qwen3.5-flash-02-23",
    messages: [
      {
        role: "user",
        content: "What is the meaning of life?",
      },
    ],
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || "";
    process.stdout.write(content);
  }
}
