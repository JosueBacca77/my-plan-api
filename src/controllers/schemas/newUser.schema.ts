const { Joi } = require("celebrate");
const { passwordRegex } = require("../../utils/regex");

export const newUserSchema = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  token: Joi.string().required(),
  password: Joi.string().pattern(new RegExp(passwordRegex)).required(),
  passwordConfirm: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords doesn't match",
  }),
  role: Joi.string().required(),
});

// Define el esquema para el cliente extendiendo el esquema base
export const newClientSchema = newUserSchema.concat(
  Joi.object({
    birthDate: Joi.date().required(),
    height: Joi.number().required(),
    weight: Joi.number().required(),
    conditions: Joi.array().items(Joi.string()).optional(),
  })
);

// Define el esquema para el entrenador extendiendo el esquema base
export const newTrainerSchema = newUserSchema.concat(
  Joi.object({
    birthDate: Joi.date().required(),
  })
);
