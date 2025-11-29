import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret, TokenExpiredError } from 'jsonwebtoken';
import config from '../config';
import ApiError from '../errors/apiError';
import { jwtHelpers } from '../../helpers/jwtHelpers';

const auth = () => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.headers.authorization?.split(" ")[1]
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }
      const varifyToken = jwtHelpers.varifyToken(
        token,
        config.jwt.secret as Secret,
      );
      console.log( varifyToken)

      req.user = varifyToken;
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
