import type { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    
    let color = '\x1b[32m'; // Green
    if (res.statusCode >= 400 && res.statusCode < 500) color = '\x1b[33m'; // Yellow
    if (res.statusCode >= 500) color = '\x1b[31m'; // Red
    const resetColor = '\x1b[0m';
    
    console.log(
      `[${timestamp}] ${req.method} ${req.originalUrl} ${color}${res.statusCode}${resetColor} - ${duration}ms`
    );
  });
  
  next();
};
