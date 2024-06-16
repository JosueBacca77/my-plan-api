"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newInvitationSchema = void 0;
const types_1 = require("../../utils/types");
const { Joi } = require("celebrate");
exports.newInvitationSchema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string(),
    role: Joi.string()
        .valid(...types_1.userRoles)
        .required(),
    //   passwordChangedAt: Joi.date(), //remove it when logic for changing password is implemented
});
