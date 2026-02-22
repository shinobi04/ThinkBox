import { auth } from "../lib/auth";
import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { AppError } from "../utils/AppError";
type Session = typeof auth.$Infer.Session;

declare global {
  namespace Express {
    interface Request {
      user?: Session["user"];
      session?: Session["session"];
    }
  }
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return next(new AppError("Unauthorized", 401));
    }

    req.user = session.user;
    req.session = session.session;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    next(new AppError("Internal Server Error", 500));
  }
};
