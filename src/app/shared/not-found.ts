import {NextFunction, Request, Response } from 'express';
import httpStatus from "http-status";

const NotFound=(req:Request,res:Response,next:NextFunction):any=>{
    return res.status(httpStatus.NOT_FOUND).json({
        success:false,
        message:"API Not Found",
        error:{
            path:req.originalUrl,
            message:"Your Requested path is not found"
          }
       })
}

export default NotFound