"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdminEndpoint = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
exports.checkAdminEndpoint = (0, catchAsync_1.default)((req, res, next) => {
    if (req.headers.ADMIN_KEY !== process.env.ADMIN_KEY) {
        return res
            .status(403)
            .json({ message: 'You are not authorized to use this endpoint' });
    }
    next();
});
