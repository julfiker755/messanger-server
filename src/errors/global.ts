// import {
//   PrismaClientValidationError,
//   PrismaClientKnownRequestError,
// } from "@prisma/client/runtime/library";
// import { NextFunction, Request, Response } from "express";
// import httpStatus from "http-status";
// import { TokenExpiredError } from "jsonwebtoken";

// const globalErrorHander = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
//   let success = false;
//   let message = err.message || "Something went wrong!";
//   let error = err;

//   if (err instanceof PrismaClientValidationError) {
//     message = "Validation Error";
//     error = err;
//   } else if (err instanceof PrismaClientKnownRequestError) {
//     if (err.code === "P2002") {
//       message = "Duplicate Key error";
//       error = err;
//     }
//   } else if (err instanceof TokenExpiredError) {
//     error = {
//       ...err,
//       scretCode: "R1lCfyF3XN",
//     };
//   }

//   res.status(statusCode).json({
//     success: success,
//     message: message || "Something went wrong",
//     errors: error,
//   });
// };

// export default globalErrorHander;
