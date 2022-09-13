import { Request, Response, NextFunction } from 'express';
import Error from '../../interface/error';

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next?: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'error has exist ';

  res.status(status).json({
    status,
    message,
  });
};

export default errorHandler;
