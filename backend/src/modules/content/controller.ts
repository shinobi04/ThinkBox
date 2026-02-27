/**
 * Content Controller
 *
 * Handles HTTP requests related to notes, including creation, retrieval,
 * and AI-powered vector search using embeddings. The search endpoint
 * streams results directly to the client as plain text for real-time
 * responses using OpenRouter and RAG (Retrieval-Augmented Generation).
 */
import type { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { prisma } from "../../lib/prisma";
import { sendError, sendSuccess } from "../../utils/response";
import { generateEmbedding } from "../../lib/generateEmbedding";
import { RagImplementation } from "../../lib/openRouter";

async function createController(req: Request, res: Response) {
  const { title, content } = req.body;
  try {
    if (!title || !content) {
      return sendError(res, "Title / Content required", 401);
    }
    const embedding = await generateEmbedding(content);

    const note = await prisma.$executeRaw`
    INSERT INTO "note" (id, title, content, "userId", embedding)
    VALUES (gen_random_uuid(), ${title}, ${content}, ${req.user!.id}, ${embedding}::vector)
  `;
    return sendSuccess(res, note, "Notes Created", 201);
  } catch (error) {
    console.error(error);
    return new AppError("error", 501);
  }
}

async function getController(req: Request, res: Response) {
  try {
    const notes = await prisma.$queryRaw`
            SELECT id, title, content, "userId"
            FROM "note" 
            WHERE "userId" = ${req.user!.id}
        `;
    return sendSuccess(res, notes, "Notes Fetched", 200);
  } catch (error) {
    console.log(error);

    return new AppError("error", 501);
  }
}

async function searchController(req: Request, res: Response) {
  const { q } = req.query;
  try {
    if (!q) return sendError(res, "Search query is required", 400);

    const vectorString = await generateEmbedding(q as string);

    const results = await prisma.$queryRaw<any[]>`
            SELECT id, title, content, 
            1 - (embedding <=> ${vectorString}::vector) AS similarity
            FROM "note"
            WHERE "userId" = ${req.user!.id}
            ORDER BY similarity DESC
            LIMIT 2
        `;

    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });

    res.write(`NOTES: ${JSON.stringify(results)}\n\n`);

    const context = results
      .map((note: any) => `Title: ${note.title}\nContent: ${note.content}`)
      .join("\n\n---\n\n");

    await RagImplementation(context, q as string, res);

    res.end();
  } catch (error) {
    console.error("Vector Search Error:", error);
    if (!res.headersSent) return sendError(res, "Search failed", 500);
    res.end();
  }
}

export { createController, getController, searchController };
