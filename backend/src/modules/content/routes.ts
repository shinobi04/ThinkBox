import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import { createController, getController } from "./controller";

const contentRouter = Router();

contentRouter.post("/content" ,requireAuth, createController);
contentRouter.get("/content" , requireAuth ,getController )

export default contentRouter;