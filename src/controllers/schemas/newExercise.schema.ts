const { Joi } = require("celebrate");

export const newExerciseSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  files: Joi.array().optional(),
  muscularGroup: Joi.string(),
});
