import { userRoles } from "../../utils/types";

const { Joi } = require("celebrate");

export const newInvitationSchema = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string(),
  role: Joi.string()
    .valid(...userRoles)
    .required(),
  //   passwordChangedAt: Joi.date(), //remove it when logic for changing password is implemented
});
