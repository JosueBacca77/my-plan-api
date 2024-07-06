"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPlanSchema = void 0;
const { Joi } = require("celebrate");
const specificRoutine = Joi.object({
    day: Joi.number().required(),
    description: Joi.string.required()
});
const muscularGroup = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required()
});
const planExercise = Joi.object({
    day: Joi.string().required(),
    series: Joi.number(),
    repetitions: Joi.string(),
    explanation: Joi.string(),
    metodology: Joi.string(),
});
const muscularGroupPlan = Joi.object({
    muscularGroup: Joi.object(muscularGroup).required(),
    exercises: Joi.array().items(planExercise)
});
exports.newPlanSchema = Joi.object({
    client: Joi.string().required(),
    startDate: Joi.date().required(),
    finishDate: Joi.date().required(),
    target: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
        color: Joi.string().required()
    }).required(),
    warmUp: Joi.string(),
    finalBlock: Joi.string(),
    specificRoutine: Joi.array().items(specificRoutine),
    muscularGroupsPlan: Joi.array().items(muscularGroupPlan)
});
