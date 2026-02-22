import express, { type Request, type Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

import { auth } from './lib/auth';
import { toNodeHandler } from 'better-auth/node';

app.use(express.json());

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Bun + Express + TS!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
