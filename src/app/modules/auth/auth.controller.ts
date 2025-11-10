import catchAsync from "@/helpers/catchAsync";
import sendResponse from "@/helpers/sendResponse";
import { authService } from "./auth.service";
import { Request, Response } from "express";
import httpStatus from "http-status";

const signUpAuth = catchAsync(async (req: Request, res: Response) => {
	const result = await authService.signUpAuth(req.body);
	sendResponse(res, {
		statusCode: httpStatus.OK,
		success: true,
		message: "User SignUp in successfully",
		data: result,
	});
});

export const authController = {
	signUpAuth,
};
