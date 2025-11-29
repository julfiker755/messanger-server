import catchAsync from '@/app/shared/catchAsync';
import sendResponse from '@/app/shared/sendResponse';
import { Request, Response } from 'express';
import { chatService } from './chat.service';
import httpStatus from 'http-status';


//  == chatStoreBD ==
const chatStoreBD = catchAsync(async (req: Request & {user:any}, res: Response) => {
  const userId=req.user?.id
  const result = await chatService.chatStoreBD(userId,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Chat Created Succesfully',
    data: result,
  });
});


//  == getUserChatBD ==
const getUserChatBD = catchAsync(async (req: Request & {user:any}, res: Response) => {
  const userId=req.user?.id
  const result = await chatService.getUserChatBD(userId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Chat Get Succesfully',
    data: result,
  });
});
//  == getUserChatBD ==
const getUserSingleChatBD = catchAsync(async (req: Request & {user:any}, res: Response) => {
  const userId=req.user?.id
  const {id}=req.params
  const result = await chatService.getUserSingleChatBD(id,userId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Chat Get Succesfully',
    data: result,
  });
});

export const chatController = {
  chatStoreBD,
  getUserChatBD,
  getUserSingleChatBD
};
