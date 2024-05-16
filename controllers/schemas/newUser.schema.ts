import { userRoles } from "../../utils/types";

const { Joi } = require("celebrate");
const { passwordRegex } = require("../../utils/regex");

export const newUserSchema = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp(passwordRegex)).required(),
  passwordConfirm: Joi.string().valid(Joi.ref("password")).required(),
  photo: Joi.string().optional(),
  rol: Joi.string()
    .valid(...userRoles)
    .required(),
  //   passwordChangedAt: Joi.date(), //remove it when logic for changing password is implemented
});
