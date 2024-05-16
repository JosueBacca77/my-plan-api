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
const user_model_1 = __importDefault(require("../models/user.model."));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
    const { name, lastName, birthDate, hiredDate, email, password, passwordConfirm, photo, weight, height, conditions, } = body;
    const foundUser = yield user_model_1.default.findOne({ email });
    if (foundUser) {
        const response = {
            status: "error",
            statusCode: 409,
            message: `User with email ${email} already exists`,
            data: foundUser,
        };
        res.send(response.status).json(response);
    }
    const newUser = yield user_model_1.default.create({
        name,
        lastName,
        email,
        photo,
        password,
        passwordConfirm,
    });
    let rolUser = null;
    // if (rol === TRAINER) {
    //   //send email wth token
    //   rolUser = await Trainer.create({
    //     user: {
    //       name: newUser.name,
    //       lastName: newUser.lastName,
    //       email: newUser.email,
    //       photo: newUser.photo,
    //     },
    //     hiredDate,
    //     birthDate,
    //   });
    // }
    // if (rol === CLIENT) {
    //   //send code trought SMS
    //   rolUser = await Trainer.create({
    //     user: {
    //       name: newUser.name,
    //       lastName: newUser.lastName,
    //       email: newUser.email,
    //       photo: newUser.photo,
    //     },
    //     hiredDate,
    //     birthDate,
    //     weight,
    //     height,
    //     conditions,
    //   });
    // }
    // const url = `${req.protocol}://${req.get("host")}/me`;
    // await new Email(newUser, url).sendWelcome();
    //expiresIn could be a integer (miliseconds) or in this format 90d 10h 5m 3s
    // createSendToken(newUser, 201, req, res);
    const response = {
        status: "success",
        statusCode: 200,
        message: "User registered successfully",
        data: rolUser,
    };
    res.status(response.statusCode).json(response);
}));
exports.getExercise = handlerFactory_1.handlerFactory.getDocument(exercise_model_1.default);
exports.postExercise = handlerFactory_1.handlerFactory.createDocument(exercise_model_1.default);
exports.patchExercise = handlerFactory_1.handlerFactory.updateDocument(exercise_model_1.default);
exports.deleteExercise = handlerFactory_1.handlerFactory.deleteDocument(exercise_model_1.default);
