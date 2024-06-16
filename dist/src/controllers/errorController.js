"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AppError = require("../utils/appError");
const handleCastDBError = (error) => {
    const message = `Invalid ${error.path}: ${error.value}`;
    return new AppError(message, 400);
};
const handleDuplicateFieldsDBError = (error) => {
    const regex = /name: "(.*?)"/;
    const match = error === null || error === void 0 ? void 0 : error.message.match(regex);
    const message = `Duplicated field value ${match[0]}`;
    return new AppError(message, 400);
};
const handleValidationFieldsDBError = (error) => {
    const errors = Object.values(error.errors).map((err) => err.message);
    const message = `Invalid data: ${errors.join(". ")}`;
    return new AppError(message, 400);
};
const handleJsonWebTokenError = () => new AppError("Invalid token", 401);
const handleJsonWebTokenExpiredError = () => new AppError("Token has expired, please log in again", 401);
const sendDevelopmentError = (error, req, res) => {
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
const sendProductionError = (error, req, res) => {
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
const errorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.code = error.code || 500;
    error.status = error.status || "error";
    if (process.env.NODE_ENV === "development") {
        return sendDevelopmentError(error, req, res);
    }
    if (process.env.NODE_ENV === "production") {
        let prodError = Object.assign({}, error);
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
exports.default = errorHandler;
