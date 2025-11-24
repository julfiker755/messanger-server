import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import httpStatus from 'http-status';
import config from '../../config';
import { userService } from './user.service';


const userStoreBD = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.userStoreBD(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created succesfully',
    data: result,
  });
})

const UserGetBD= catchAsync(async (req: Request, res: Response) => {
  const results= await userService.UserGetBD(req.query)
  const {result,meta}:any=results
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Info succesfully',
    meta:meta,
    data: result,
  });
});

const loginUser= catchAsync(async (req: Request, res: Response) => {
  const result = await userService.loginUserBD(req.body)
  const {refreshToken,accessToken,needsPasswordChange}=result
   res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: config.node_env === "production" ? true : false,
    sameSite: config.node_env === "production" ? "none" : "strict",
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login  succesfully',
    data: {
      accessToken:refreshToken,
      needsPasswordChange,
    },
  });
});

const refreshTokenBD = catchAsync(async (req: Request, res: Response) => {
  const { accessToken } = req.cookies;
  const result = await userService.refreshTokenBD(accessToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Refresh Token in successfully",
    data: result,
  });
});


export const userController = {
  userStoreBD,
  UserGetBD,
  loginUser,
  refreshTokenBD
};
