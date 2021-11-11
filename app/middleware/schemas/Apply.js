const Joi = require('joi');

// Schema description when someone applied for a job
const applySchema = Joi.object({
    // Data validator :
    userMail : Joi.string().required(),
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    phone : Joi.string().required(),
    offerTitle : Joi.string(),
    offerURL : Joi.string(),
    message : Joi.string()
});

module.exports = applySchema;