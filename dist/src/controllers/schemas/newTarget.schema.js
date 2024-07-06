"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTargetSchema = void 0;
const { Joi } = require("celebrate");
exports.newTargetSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    color: Joi.string().required(),
});
