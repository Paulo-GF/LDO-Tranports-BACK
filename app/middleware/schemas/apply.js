const Joi = require('joi');

// Schema description when someone applied for a job
const applySchema = Joi.object({
    // Data validator :
    jobId: Joi.number(),
    userMail : Joi.string().pattern(/^[^@\s]+@[^@\s]+\.[^@\s]+$/).required(),
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    phone : Joi.number().required(),
    offerTitle : Joi.string(),
    offerURL : Joi.string(),
    message : Joi.string()
});

module.exports = applySchema;



