import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Internal server error';

  res.status(status).json({
    type: 'error',
    status,
    message,
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    data: null,
  });
};

export default errorMiddleware;
