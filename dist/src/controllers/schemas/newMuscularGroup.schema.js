"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMuscularGroupSchema = void 0;
const { Joi } = require("celebrate");
exports.newMuscularGroupSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
});
