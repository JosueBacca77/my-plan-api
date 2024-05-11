"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newExerciseSchema = void 0;
const { Joi } = require("celebrate");
exports.newExerciseSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
    files: Joi.array().optional(),
    muscularGroup: Joi.string(),
});
