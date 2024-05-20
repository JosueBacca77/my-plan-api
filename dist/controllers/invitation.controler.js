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
exports.createInvitation = exports.getInvitation = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const invitation_model_1 = require("../models/invitation.model");
const handlerFactory_1 = require("../common/handlerFactory");
const tokens_1 = require("../utils/tokens");
exports.getInvitation = handlerFactory_1.handlerFactory.getDocument(invitation_model_1.Invitation);
exports.createInvitation = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { email, name, lastName, role, phone } = body;
    const foundInvitation = yield invitation_model_1.Invitation.findOne({ email });
    const expiredDate = foundInvitation === null || foundInvitation === void 0 ? void 0 : foundInvitation.tokenExpires;
    if (foundInvitation && expiredDate > new Date(Date.now())) {
        //Thee is a invtation for this user that hasn't expired
        const response = {
            status: "error",
            statusCode: 409,
            message: `Invitation for ${email} already sent`,
            data: {
                foundInvitation,
            },
        };
        return res.status(response.statusCode).json(response);
    }
    const tokens = (0, tokens_1.generateToken)();
    console.log("original token", tokens.token);
    const newInvitation = yield invitation_model_1.Invitation.create({
        name,
        lastName,
        email,
        phone,
        role,
        token: tokens.hashedToken,
    });
    const response = {
        status: "success",
        statusCode: 200,
        message: `Invitation to ${email} has been sent successfully`,
        data: newInvitation,
    };
    res.status(response.statusCode).json(response);
}));
