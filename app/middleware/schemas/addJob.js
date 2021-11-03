const Joi = require('joi');

const addJobSchema = Joi.object({
    title : Joi.string().required(),
    region : Joi.string().required(),
    city : Joi.string().required(),
    type : Joi.string().required(),
    description : Joi.string().required()
});

module.exports = addJobSchema;