const Joi = require('joi');

// Schema description when updating a job
const updateJobSchema = Joi.object({
    id : Joi.number(),
    title : Joi.string().required(),
    region : Joi.string().required(),
    city : Joi.string().required(),
    type : Joi.string().required(),
    description : Joi.string().required()
});

module.exports = updateJobSchema;