"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInSchema = void 0;
const regex_1 = require("../../utils/regex");
const { Joi } = require("celebrate");
exports.logInSchema = Joi.object({
    password: Joi.string().pattern(new RegExp(regex_1.passwordRegex)).required(),
    email: Joi.string().email().required(),
});
