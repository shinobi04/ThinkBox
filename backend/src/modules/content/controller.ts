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

    const results = await prisma.$queryRaw`
            SELECT 
                id, 
                title, 
                content, 
                1 - (embedding <=> ${vectorString}::vector) AS similarity
            FROM "note"
            WHERE "userId" = ${req.user!.id}
            ORDER BY similarity DESC
            LIMIT 2
        `;

    return sendSuccess(res, results, "Smart search results", 200);
  } catch (error) {
    console.error("Vector Search Error:", error);
    return sendError(res, "Search failed", 500);
  }
}

export { createController, getController, searchController };
