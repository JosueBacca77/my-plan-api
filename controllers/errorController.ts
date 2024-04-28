import { AppErrorInterface } from "../utils/types";

import { Request, Response, NextFunction } from "express";
const AppError = require("../utils/appError");

const handleCastDBError = (error: any): typeof AppError => {
  const message = `Invalid ${error.path}: ${error.value}`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDBError = (
  error: AppErrorInterface
): AppErrorInterface => {
  const regex = /name: "(.*?)"/;
  const match = error?.message.match(regex);

  const message = `Duplicated field value ${match[0]}`;

  return new AppError(message, 400);
};

const handleValidationFieldsDBError = (
  error: AppErrorInterface
): AppErrorInterface => {
  const errors = Object.values(error.errors).map((err) => err.message);

  const message = `Invalid data: ${errors.join(". ")}`;

  return new AppError(message, 400);
};

const handleJsonWebTokenError = (): AppErrorInterface =>
  new AppError("Invalid token", 401);

const handleJsonWebTokenExpiredError = (): AppErrorInterface =>
  new AppError("Token has expired, please log in again", 401);

const sendDevelopmentError = (
  error: AppErrorInterface,
  req: Request,
  res: Response
) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(error.statusCode).json({
      status: error.status,
      stack: error.stack,
      message: error.message,
      error: error,
    });
  }

  return res.status(error.statusCode).render("error", {
    title: "Something went wrong",
    msg: error.message,
  });
};

const sendProductionError = (
  error: AppErrorInterface,
  req: Request,
  res: Response
) => {
  if (req.originalUrl.startsWith("/api")) {
    if (error.isOperational) {
      return res.status(error.code).json({
        status: error.status,
        message: error.message,
      });
    }

    return res.status(error.code).json({
      status: "error",
      message: "Something went wrong",
    });
  }

  return res.status(error.statusCode).render("error", {
    title: "PLease try again later",
    msg: error.message,
  });
};

const errorHandler = (
  error: AppErrorInterface,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.code = error.code || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "development") {
    return sendDevelopmentError(error, req, res);
  }

  if (process.env.NODE_ENV === "production") {
    let prodError = { ...error };

    if (error.name === "CastError") {
      prodError = handleCastDBError(prodError);
    }

    if (error.code === 11000) {
      prodError = handleDuplicateFieldsDBError(error);
    }

    if (error.name === "ValidationError") {
      prodError = handleValidationFieldsDBError(prodError);
    }

    if (error.name === "JsonWebTokenError") {
      prodError = handleJsonWebTokenError();
    }

    if (error.name === "TokenExpiredError") {
      prodError = handleJsonWebTokenExpiredError();
    }

    return sendProductionError(prodError, req, res);
  }

  res.status(error.code).json({
    status: error.status,
    message: error.message,
  });
};

export default errorHandler;
