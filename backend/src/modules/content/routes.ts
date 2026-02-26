import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { createController, getController, searchController } from "./controller";

const contentRouter = Router();

contentRouter.post("/content" ,requireAuth, createController);
contentRouter.get("/content" , requireAuth ,getController )
contentRouter.get("/search" , requireAuth ,searchController )

export default contentRouter;