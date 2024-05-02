const { Joi } = require("celebrate");
const newMuscularGroupSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
});
module.exports = {
    newMuscularGroupSchema,
};
