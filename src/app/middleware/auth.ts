import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret, TokenExpiredError } from 'jsonwebtoken';
import config from '../config';
import ApiError from '../errors/apiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      const varifyToken = jwtHelpers.varifyToken(
        token,
        config.jwt.secret as Secret,
      );

      req.user = varifyToken;
      if (roles?.length && !roles.includes(varifyToken.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }
      next();
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        res.status(500).json({
          success: false,
          message:'This token has expired (JWT)',
          errors:{
            ...err,
            scretCode:"R1lCfyF3XN"
          },
        });
      }
      next(err);
    }
  };
};

export default auth;
