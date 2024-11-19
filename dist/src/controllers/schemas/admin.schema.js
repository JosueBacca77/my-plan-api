"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newAdminSchema = void 0;
const regex_1 = require("../../utils/regex");
const { Joi } = require('celebrate');
exports.newAdminSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp(regex_1.passwordRegex)).required(),
    passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': "Passwords doesn't match",
    }),
});
