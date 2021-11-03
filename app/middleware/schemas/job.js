const Joi = require('joi');

const addJobSchema = Joi.object({
    title : Joi.string().required(),
    region : Joi.string().required(),
    city : Joi.string().required(),
    type : Joi.string().required(),
    description : Joi.string().required()
});

const updateJobSchema = Joi.object({
    id : Joi.number(),
    title : Joi.string(),
    region : Joi.string(),
    city : Joi.string(),
    type : Joi.string(),
    description : Joi.string()
});

module.exports = addJobSchema, updateJobSchema;