const { Joi } = require("celebrate");
const { passwordRegex } = require("../../utils/regex");

export const newUserSchema = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp(passwordRegex)).required(),
  passwordConfirm: Joi.string().pattern(new RegExp(passwordRegex)).required(),
  photo: Joi.string(),
  //   passwordChangedAt: Joi.date(), //remove it when logic for changing password is implemented
});
