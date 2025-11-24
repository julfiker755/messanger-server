import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import ApiCustomError from './apiCustomError';
import { hanlde } from './handleErrors';
import ApiError from './apiError';
import { ZodError } from 'zod';



const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  let statusCode = 500;
  let message = err.message || 'Something went Wrong!';
  let errors:any = hanlde.Errors
  // errors hanlde
  if (err instanceof ZodError) {
    const result = hanlde.ZodErrors(err)
    statusCode = result.statusCode;
    message = result.message;
    errors = result.error;
  } else if (err?.name === 'ValidationError') {
    const handle =hanlde.ValidationError(err)
    statusCode = handle.statusCode;
    message = handle.message;
    errors = handle.error;
  } else if (err.code === 11000) {
    const result =hanlde.DuplicateError(err)
    statusCode = result.statusCode;
    message = result.message;
    errors = result.error;
  } else if (err instanceof ApiError) {
    const result = hanlde.ApiError(err);
    statusCode = result.statusCode;
    message = result.message;
    errors = result.errorSources;
  } else if (err instanceof ApiCustomError) {
    const result = hanlde.CustomError(err);
    statusCode = result.statusCode;
    message = result.message;
    errors = result.errorSources;
  } else if (err instanceof Error) {
    const result = hanlde.Error(err);
    statusCode = result.statusCode;
    message = result.message;
    errors = result.errorSources;
  }
  return res.status(statusCode).json({
    success: false,
    message: message,
    errors: errors,
    // stack:config.node_env === "development" ? err?.stack :null,
    // err
  });
};

export default globalErrorHandler;