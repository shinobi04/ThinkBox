import { Router } from "express";
import { requireAuth } from "../../middleware/auth";
import {
  createController,
  deleteController,
  getController,
  searchController,
  SearchfromId,
} from "./controller";

const contentRouter = Router();

contentRouter.post("/content", createController);
contentRouter.get("/content", getController);
contentRouter.get("/search", searchController);
contentRouter.get("/content/:id", SearchfromId);
contentRouter.delete("/delete/:id", deleteController);

export default contentRouter;
