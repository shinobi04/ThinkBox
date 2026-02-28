import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import {
  createController,
  deleteController,
  getController,
  searchController,
} from "./controller";

const contentRouter = Router();

contentRouter.post("/content", createController);
contentRouter.get("/content", getController);
contentRouter.get("/search", searchController);
contentRouter.delete("/delete/:id", deleteController);

export default contentRouter;
