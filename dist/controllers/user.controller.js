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
exports.deleteExercise = exports.patchExercise = exports.postExercise = exports.getExercise = exports.signup = void 0;
const handlerFactory_1 = require("../common/handlerFactory");
const exercise_model_1 = __importDefault(require("../models/exercise.model"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handler_1 = require("../factories/users/handler");
const invitation_model_1 = require("../models/invitation.model");
const crypto_1 = __importDefault(require("crypto"));
// const getAllExercises = handlerFactory.getAllDocuments(Exercise);
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user._id);
    const expiresIn = Number(process.env.JWT_EXPIRES_IN);
    const cookieOptions = {
        expires: new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000),
        httpOnly: true,
        //req.secure ins an express variable
        //we can access to this because of app.set("trust proxy", 1);
        secure: req.secure,
        // secure: true // This is essential for HTTPS
    };
    //ADDITIONAL CONSIDERATION: If you're using a load balancer or reverse proxy, ensure it's configured to pass the secure flag correctly.
    //We cant do this because not all deployed applications are automatically set to https
    // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie("jwt", token, cookieOptions);
    //The password will be included in the response
    //(the select:false in the chema works for find operations)
    user.password = undefined;
    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};
exports.signup = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const hashedToken = crypto_1.default
        .createHash("sha256")
        .update(body.token)
        .digest("hex");
    const invitation = yield invitation_model_1.Invitation.findOne({ token: hashedToken }).lean();
    if (!invitation) {
        const response = {
            status: "error",
            statusCode: 401,
            message: `User hasn't been invited`,
            data: null,
        };
        return res.status(response.statusCode).json(response);
    }
    if (invitation.isUsed) {
        const response = {
            status: "error",
            statusCode: 401,
            message: `Invitation has already been used and user created successfully`,
            data: null,
        };
        return res.status(response.statusCode).json(response);
    }
    //Check invitation is not expired
    if (invitation.tokenExpires < new Date()) {
        const response = {
            status: "error",
            statusCode: 401,
            message: `Invitation for ${invitation.email} has expired`,
            data: {
                foundInvitation: invitation,
            },
        };
        return res.status(response.statusCode).json(response);
    }
    let validationSchema = (0, handler_1.getValidationSchema)(invitation.role);
    if (!validationSchema) {
        return res.status(400).json({
            status: "error",
            statusCode: 400,
            message: "Invalid role",
            data: null,
        });
    }
    const newUserData = Object.assign(Object.assign({}, body), { email: invitation.email, role: invitation.role });
    try {
        const { error } = validationSchema.validate(newUserData);
        if (error) {
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                message: "Validation error",
                data: error.details,
            });
        }
    }
    catch (validationError) {
        return res.status(400).json({
            status: "error",
            statusCode: 400,
            message: "Validation failed",
            data: validationError,
        });
    }
    const factory = (0, handler_1.getUserFactory)(invitation.role);
    const newUser = yield factory.createUser(newUserData);
    //Set invitaation as used
    invitation.isUsed = true;
    yield invitation.save();
    const response = {
        status: "success",
        statusCode: 200,
        message: "User registered successfully",
        data: newUser,
    };
    res.status(response.statusCode).json(response);
}));
exports.getExercise = handlerFactory_1.handlerFactory.getDocument(exercise_model_1.default);
exports.postExercise = handlerFactory_1.handlerFactory.createDocument(exercise_model_1.default);
exports.patchExercise = handlerFactory_1.handlerFactory.updateDocument(exercise_model_1.default);
exports.deleteExercise = handlerFactory_1.handlerFactory.deleteDocument(exercise_model_1.default);
