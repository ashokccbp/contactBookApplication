import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  // Default error
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // SQLite specific errors
  if (err.message.includes('UNIQUE constraint failed')) {
    statusCode = 409;
    if (err.message.includes('email')) {
      message = 'A contact with this email already exists';
    } else {
      message = 'Duplicate entry detected';
    }
  } else if (err.message.includes('CHECK constraint failed')) {
    statusCode = 400;
    message = 'Invalid data format';
  }

  // Don't expose internal errors in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Something went wrong on our end';
  }

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};