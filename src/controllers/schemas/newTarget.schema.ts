const { Joi } = require("celebrate");

export const newTargetSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  color: Joi.string().required(),
});
