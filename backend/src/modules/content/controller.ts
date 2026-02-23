import type { Request, Response } from "express";
import { AppError } from "../../utils/AppError";
import { prisma } from "../../lib/prisma";
import { sendError, sendSuccess } from "../../utils/response";

async function  createController(req : Request , res : Response){
    const {title , content} = req.body;
    try {
        if(!title || !content){
            return sendError(res, "Title / Content required" , 401);
        }
        const notes = await prisma.note.create({
            data : {
                title,
                content,
                user  : {
                    connect: {
                        id  : req.user!.id
                    }
                }
            }
        })
        return sendSuccess(res , notes ,"Notes Created" , 201 )
    } catch (error) {
        return new AppError("error" , 501);
    }

}

async function getController(req : Request , res : Response){
    try {
        const notes = await prisma.note.findMany({
            where : {
                userId : req.user!.id
            }
        })
        return sendSuccess(res , notes , "Notes Fetched" , 200);
    } catch (error) {
        return new AppError("error" , 501);
    }
}

export {createController , getController};