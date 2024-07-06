"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
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
const exercise__routes_1 = __importDefault(require("./routes/exercise..routes"));
const users__routes_1 = __importDefault(require("./routes/users..routes"));
const invitation_routes_1 = __importDefault(require("./routes/invitation.routes"));
const target_routes_1 = __importDefault(require("./routes/target.routes "));
const plans__routes_1 = __importDefault(require("./routes/plans..routes"));
require("./global-augmentations");
exports.app = (0, express_1.default)();
// declare global {
//   namespace Express {
//     interface Request {
//       user?: UserModel;
//     }
//   }
// }
exports.app.use((0, cors_1.default)());
exports.app.options("*", (0, cors_1.default)());
exports.app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
if (process.env.NODE_ENV === "development") {
    exports.app.use((0, morgan_1.default)("dev"));
}
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 1 * 60 * 1000,
    max: 30,
    message: "Too many requests, please try again later.",
});
exports.app.use("/api", limiter);
exports.app.use((0, compression_1.default)());
exports.app.use(express_1.default.json({ limit: "10kb" }));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, express_mongo_sanitize_1.default)());
exports.app.use((0, xss_clean_1.default)());
// app.use(
//   hpp({
//     whitelist: whiteListParameters,
//   })
// );
//Able x-www-form-urlencode form data to be parsed
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.enable("trust proxy");
exports.app.use("/api/v1/muscular-groups", muscularGroup_routes_1.default);
exports.app.use("/api/v1/exercises", exercise__routes_1.default);
exports.app.use("/api/v1/users", users__routes_1.default);
exports.app.use("/api/v1/invitations", invitation_routes_1.default);
exports.app.use("/api/v1/targets", target_routes_1.default);
exports.app.use("/api/v1/plans", plans__routes_1.default);
exports.app.all("*", (req, res, next) => {
    next(new appError_1.default(`The route ${req.url} doesn't exist`, 404));
});
exports.app.use((0, celebrate_1.errors)());
exports.app.use(errorController_1.default);
exports.default = exports.app;
