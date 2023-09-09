import { NextFunction, Response } from "express";
import { StatusCode_Err, StatusCode_Success } from "./statusCode";

export interface ErrorType {
  msg: string;
  status: StatusCode_Err;
}
export interface SuccessType {
  msg: string;
  status: StatusCode_Success;
}
export const isErrorType = (data: ErrorType) => {
  if (
    typeof data !== "object" ||
    data === null ||
    typeof data.msg !== "string" ||
    typeof data.status !== "number"
  ) {
    return false;
  } else {
    true;
  }
};
// data is not of type ErrorType

export const createErrMessage = (
  error: ErrorType,
  next: NextFunction,
): void => {
  return next(error);
};

export const createSuccessMessage = (
  success: SuccessType,
  res: Response,
  data?: any,
): Response => {
  const { status, msg } = success;
  return res.status(status).json({ msg, data });
};
