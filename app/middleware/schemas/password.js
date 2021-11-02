const Joi = require('joi');

const passwordSchema = Joi.object({
    userId : Joi.number(),
    newPassword : Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,24}$/).required(),
    newPasswordConfirm : Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,24}$/).required()
});

module.exports = passwordSchema;
