import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import {
  createController,
  getController,
  searchController,
} from "./controller";

const contentRouter = Router();

contentRouter.post("/content", createController);
contentRouter.get("/content", getController);
contentRouter.get("/search", searchController);

export default contentRouter;
