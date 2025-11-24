import httpStatus from "http-status";
import mongoose from "mongoose";
import { ZodError } from "zod";

// errors
const Errors=[
    {
      path: '',
      message: 'Something went wrong',
    },
  ];
// ZodErrors
const ZodErrors=(err:ZodError)=>{
    const error=err.issues.map((issue:any)=>{
        return {
            path:issue?.path[issue.path.length-1],
            message:issue.message
        }
    })

    return {
        statusCode:httpStatus.BAD_REQUEST,
        message:"Validation Error",
        error,
    }
}
// ValidationError
const ValidationError=(err:mongoose.Error.ValidationError)=>{
    console.log(err);
    const  error=Object.values(err.errors).map((val:any)=>{
        return {
            path:val?.path,
            message:val?.message
        }
    })
    return {
        statusCode:httpStatus.BAD_REQUEST,
        message:"Validation Error",
        error,
    }
}

const DuplicateError = (err: any) => {
    const key = err?.keyPattern ? Object.keys(err.keyPattern)[0] : '';
    const value = err?.keyValue ? err.keyValue[key] : '';
    const error = [{
      path: key,
      message: `${key} already exists`
    }];
  
    return {
      statusCode: httpStatus.BAD_REQUEST,
      message: "Duplicate key error",
      error,
    };
  };
// ApiError
const ApiError=(err:any)=>{
    const errorSources=[{
        path:err.path,
        message:err.message
    }]
    return {
        statusCode:httpStatus.BAD_REQUEST,
        message:"Api Errors",
        errorSources,
    }
}

// CustomError
const CustomError=(err:any)=>{
    const errorSources=err.customErrors.map(((err:any)=>(
        {
            path:err?.field,
            message:err.message 
        }
    )))
    return {
        statusCode:httpStatus.BAD_REQUEST,
        message:"Custom Errors",
        errorSources,
    }
}

// Error
const Error=(err:any)=>{
    const errorSources=[{
        path:'',
        message:err.message
    }]
    return {
        statusCode:httpStatus.BAD_REQUEST,
        message:"Errors",
        errorSources,
    }
}
export const hanlde ={
    Errors,
    ZodErrors,
    ValidationError,
    DuplicateError,
    ApiError,
    CustomError,
    Error
}