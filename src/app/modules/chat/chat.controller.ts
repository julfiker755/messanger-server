import catchAsync from '@/app/shared/catchAsync';
import sendResponse from '@/app/shared/sendResponse';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { chatService } from './chat.service';

const chatStoreBD = catchAsync(async (req: Request, res: Response) => {
  const userId=""
  const result = await chatService.chatStoreBD(userId,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Chat created succesfully',
    data: result,
  });
});
const getUserChatBD = catchAsync(async (req: Request, res: Response) => {
  const userId=""
  const result = await chatService.chatStoreBD(userId,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user Chat succesfully',
    data: result,
  });
});

export const chatController = {
  chatStoreBD,
};
