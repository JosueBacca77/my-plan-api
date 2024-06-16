import { passwordRegex } from "../../utils/regex";

const { Joi } = require("celebrate");

export const logInSchema = Joi.object({
  password: Joi.string().pattern(new RegExp(passwordRegex)).required(),
  email: Joi.string().email().required(),
});
