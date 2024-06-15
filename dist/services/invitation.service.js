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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvitationService = exports.createInvitationService = void 0;
const email_1 = require("../common/Email/email");
const handlerFactory_1 = require("../common/handlerFactory");
const invitation_model_1 = require("../models/invitation.model");
const tokens_1 = require("../utils/tokens");
const getInvitationService = () => __awaiter(void 0, void 0, void 0, function* () { return handlerFactory_1.handlerFactory.getDocument(invitation_model_1.Invitation); });
exports.getInvitationService = getInvitationService;
const createInvitationService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, lastName, role, phone } = body;
    const foundInvitation = yield invitation_model_1.Invitation.findOne({ email }).sort({ _id: -1 }).lean();
    const expiredDate = foundInvitation === null || foundInvitation === void 0 ? void 0 : foundInvitation.tokenExpires;
    if (foundInvitation && expiredDate > new Date()) {
        //There is an invtation for this user that hasn't expired
        const response = {
            status: "error",
            statusCode: 409,
            message: `Invitation for ${email} already sent`,
            data: {
                foundInvitation,
            },
        };
        return response;
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
    try {
        const emailService = new email_1.EmailService();
        emailService.sendInvitation({
            firstName: name,
            token: tokens.token,
            to: email
        });
    }
    catch (error) {
        const response = {
            status: "success",
            statusCode: 207,
            message: `Invitation to ${email} has been created successfully, but there was an error sending it`,
            data: {
                status: "multi-status",
                responses: [
                    {
                        statusCode: 201,
                        status: "success",
                        message: `Invitation to ${email} has been created successfully.`,
                    },
                    {
                        statusCode: 500,
                        status: "error",
                        message: `There was an error sending the invitation`,
                    },
                ]
            },
        };
        return response;
    }
    const response = {
        status: "success",
        statusCode: 200,
        message: `Invitation to ${email} has been sent successfully`,
        data: newInvitation,
    };
    return response;
});
exports.createInvitationService = createInvitationService;
