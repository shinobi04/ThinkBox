import type { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { prisma } from "../../lib/prisma";
import { sendError, sendSuccess } from "../../utils/response";
import { generateEmbedding } from "../../lib/generateEmbedding";

async function  createController(req : Request , res : Response){
    const {title , content} = req.body;
    try {
        if(!title || !content){
            return sendError(res, "Title / Content required" , 401);
        }
        const embedding = await generateEmbedding(content);

        const note = await prisma.$executeRaw`
    INSERT INTO "note" (id, title, content, "userId", embedding)
    VALUES (gen_random_uuid(), ${title}, ${content}, ${req.user!.id}, ${embedding}::vector)
  `
        return sendSuccess(res  ,note ,"Notes Created" , 201 )
    } catch (error) {
        console.error(error); 
        return new AppError("error" , 501);
    }

}

async function getController(req : Request , res : Response){
    try {
        const notes = await prisma.$queryRaw`
            SELECT id, title, content, "userId"
            FROM "note" 
            WHERE "userId" = ${req.user!.id}
        `;
        return sendSuccess(res , notes , "Notes Fetched" , 200);
    } catch (error) {
        console.log(error);
        
        return new AppError("error" , 501);
    }
}

export {createController , getController};