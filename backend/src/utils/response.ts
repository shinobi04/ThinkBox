import type { Response } from 'express';

export interface SuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ErrorResponse {
  success: false;
  message: string;
  error?: any;
}

export const sendSuccess = <T>(res: Response, data: T, message?: string, statusCode = 200) => {
  const response: SuccessResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendError = (res: Response, message: string, statusCode = 500, error?: any) => {
  const response: ErrorResponse = {
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && error ? { error } : {}),
  };
  return res.status(statusCode).json(response);
};
