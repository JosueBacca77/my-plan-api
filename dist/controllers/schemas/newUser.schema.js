"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTrainerSchema = exports.newClientSchema = exports.newUserSchema = void 0;
const { Joi } = require("celebrate");
const { passwordRegex } = require("../../utils/regex");
exports.newUserSchema = Joi.object({
    name: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    token: Joi.string().required(),
    password: Joi.string().pattern(new RegExp(passwordRegex)).required(),
    passwordConfirm: Joi.string().valid(Joi.ref("password")).required().messages({
        "any.only": "Passwords doesn't match",
    }),
});
// Define el esquema para el cliente extendiendo el esquema base
exports.newClientSchema = exports.newUserSchema.concat(Joi.object({
    birthDate: Joi.date().required(),
    height: Joi.number().required(),
    weight: Joi.number().required(),
    conditions: Joi.string().optional(),
}));
// Define el esquema para el entrenador extendiendo el esquema base
exports.newTrainerSchema = exports.newUserSchema.concat(Joi.object({
    birthDate: Joi.date().required(),
}));
