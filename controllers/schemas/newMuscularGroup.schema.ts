const { Joi } = require("celebrate");

export const newMuscularGroupSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
});
