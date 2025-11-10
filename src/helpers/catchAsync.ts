import ApiGlobalError from "@/errors/apiGlobalError";
import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";

// This is a higher-order function
const catchAsync = (fn: RequestHandler): RequestHandler => {
	return async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			await fn(req, res, next);
		} catch (err: any) {
			if (err instanceof ApiGlobalError) {
				res.status(httpStatus.BAD_REQUEST).json({
					success: false,
					message: "Validation failed. Check your sent data",
					errors: err.customErrors || [],
				});
				return;
			} else {
				next(err);
			}
		}
	};
};

export default catchAsync;
