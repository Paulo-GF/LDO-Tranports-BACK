const Joi = require('joi');

// Schema description when contact page is submitted
const contactSchema = Joi.object({
    // Data validator :
    userMail : Joi.string().required(),
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    subject : Joi.string().required(),
    message : Joi.string().required()
});

module.exports = contactSchema;