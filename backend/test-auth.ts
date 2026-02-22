import { auth } from "./src/lib/auth";
import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  });
};
