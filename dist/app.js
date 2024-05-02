"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const muscularGroup_routes_1 = __importDefault(require("./routes/muscularGroup.routes"));
const appError_1 = __importDefault(require("./utils/appError"));
const celebrate_1 = require("celebrate");
const errorController_1 = __importDefault(require("./controllers/errorController"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const xss_clean_1 = __importDefault(require("xss-clean"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const app = (0, express_1.default)();
app.use((req, res, next) => {
    console.log(req.headers);
    next();
});
app.use((0, cors_1.default)());
app.options("*", (0, cors_1.default)());
app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 30,
    message: "Too many requests, please try again later.",
});
app.use("/api", limiter);
app.use((0, compression_1.default)());
app.use(express_1.default.json({ limit: "10kb" }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_mongo_sanitize_1.default)());
app.use((0, xss_clean_1.default)());
// app.use(
//   hpp({
//     whitelist: whiteListParameters,
//   })
// );
//Able x-www-form-urlencode form data to be parsed
app.use(express_1.default.urlencoded({ extended: true }));
app.enable("trust proxy");
app.use("/api/v1/muscular-groups", muscularGroup_routes_1.default);
app.all("*", (req, res, next) => {
    next(new appError_1.default(`The route ${req.url} doesn't exist`, 404));
});
app.use((0, celebrate_1.errors)());
app.use(errorController_1.default);
exports.default = app;
