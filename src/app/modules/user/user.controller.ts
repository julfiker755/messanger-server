import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { userService } from './user.service';
import catchAsync from '@/app/shared/catchAsync';
import sendResponse from '@/app/shared/sendResponse';
import config from '@/app/config';


const userGetBD= catchAsync(async (req: Request, res: Response) => {
  const results= await userService.userGetBD(req.query)
  const {result,meta}:any=results
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Info  Succesfully',
    meta:meta,
    data: result,
  });
});


const userStoreBD = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.userStoreBD(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created Succesfully',
    data: result,
  });
})

const loginUser= catchAsync(async (req: Request, res: Response) => {
  const result = await userService.loginUserBD(req.body)
  const {accessToken,data}=result
   res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: config.node_env === "production" ? true : false,
    sameSite: config.node_env === "production" ? "none" : "strict",
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Login  succesfully',
    data:{
      token:accessToken,
      data:data,
    }
  });
});


const loginLogout= catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: config.node_env === "production",
    sameSite: config.node_env === "production" ? "none" : "strict",
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged out successfully",
    data: null,
  });
});



export const userController = {
  userGetBD,
  userStoreBD,
  loginUser,
  loginLogout
};
