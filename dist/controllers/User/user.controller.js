"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInController = exports.signUpController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const auth_service_1 = require("../../services/Auth/auth.service");
// const getAllExercises = handlerFactory.getAllDocuments(Exercise);
exports.signUpController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const response = yield (0, auth_service_1.signUpService)(body);
    res.status(response.statusCode).json(response);
}));
exports.logInController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { email, password } = body;
    const tokenData = yield (0, auth_service_1.logInService)(email, password);
    if (!tokenData.generatedToken) {
        const response = {
            status: 'error',
            statusCode: 401,
            message: `Not authorized`,
            data: null,
        };
        return res.status(response.statusCode).json(response);
    }
    ;
    const response = {
        status: 'success',
        statusCode: 200,
        message: 'Log in successfully!',
        data: {
            user: tokenData.user,
            token: tokenData.generatedToken.token
        },
    };
    res.cookie("jwt", tokenData.generatedToken.token, tokenData.generatedToken.cookieOptions);
    res.status(response.statusCode).json(response);
}));
