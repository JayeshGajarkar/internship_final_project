import { Request, Response, NextFunction } from 'express';
import AppError from './appError';

const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR:', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }

};

export default globalErrorHandler;
