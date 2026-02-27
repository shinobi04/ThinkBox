import express, { type Request, type Response } from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://127.0.0.1:3001",
      "http://127.0.0.1:3000",
    ],
    credentials: true,
  }),
);

import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import { requireAuth } from "./middleware/auth";
import { requestLogger } from "./middleware/logger";
import { errorHandler, notFoundHandler } from "./middleware/error";
import { sendSuccess } from "./utils/response";
import contentRouter from "./modules/content/routes";

app.use(express.json());
app.use(requestLogger);

app.all("/api/auth/{*any}", toNodeHandler(auth));

app.get("/", (req: Request, res: Response) => {
  sendSuccess(res, null, "Hello from Bun + Express + TS!");
});

app.get("/api/protected", requireAuth, (req: Request, res: Response) => {
  sendSuccess(
    res,
    {
      user: req.user,
      session: req.session,
    },
    "This is a protected route",
  );
});
app.use("/api", requireAuth, contentRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
