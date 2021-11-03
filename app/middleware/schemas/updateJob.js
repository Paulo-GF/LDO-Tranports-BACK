const Joi = require('joi');

const updateJobSchema = Joi.object({
    id : Joi.number(),
    title : Joi.string(),
    region : Joi.string(),
    city : Joi.string(),
    type : Joi.string(),
    description : Joi.string()
});

module.exports = updateJobSchema;