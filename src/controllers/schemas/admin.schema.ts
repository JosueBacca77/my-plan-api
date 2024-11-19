import { passwordRegex } from '../../utils/regex';

const { Joi } = require('celebrate');

export const newAdminSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().pattern(new RegExp(passwordRegex)).required(),
  passwordConfirm: Joi.string().valid(Joi.ref('password')).required().messages({
    'any.only': "Passwords doesn't match",
  }),
});
