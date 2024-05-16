"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUserSchema = void 0;
const types_1 = require("../../utils/types");
const { Joi } = require("celebrate");
const { passwordRegex } = require("../../utils/regex");
exports.newUserSchema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(passwordRegex)).required(),
    passwordConfirm: Joi.string().valid(Joi.ref("password")).required(),
    photo: Joi.string().optional(),
    rol: Joi.string()
        .valid(...types_1.userRoles)
        .required(),
    //   passwordChangedAt: Joi.date(), //remove it when logic for changing password is implemented
});
