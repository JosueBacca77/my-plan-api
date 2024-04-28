"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan = require("morgan");
const toursRouter = require("./routs/tourRutes");
const AppError = require("./utils/appError");
const { errors } = require("celebrate");
const errorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
const app = express();
app.use(cors());
app.options("*", cors());
app.use(helmet({ contentSecurityPolicy: false }));
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 30,
    message: "Too many requests, please try again later.",
});
app.use("/api", limiter);
app.use(compression());
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());
// app.use(
//   hpp({
//     whitelist: whiteListParameters,
//   })
// );
//Able x-www-form-urlencode form data to be parsed
app.use(express.urlencoded({ extended: true }));
app.enable("trust proxy");
app.use("/api/v1/tours", toursRouter);
app.all("*", (req, res, next) => {
    next(new AppError(`The route ${req.url} doesn't exist`, 404));
});
app.use(errors());
app.use(errorHandler);
exports.default = app;
