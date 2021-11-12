const Joi = require('joi');

// Schema description when someone applied for a job
const applySchema = Joi.object({
    // Data validator :
    jobId: Joi.number(),
    userMail : Joi.string().pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/).required(),
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    phone : Joi.string().pattern(/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/).required(),
    offerTitle : Joi.string(),
    offerURL : Joi.string(),
    message : Joi.string()
});

module.exports = applySchema;



