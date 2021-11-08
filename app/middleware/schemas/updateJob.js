const Joi = require('joi');

// Schema description when updating a job
const updateJobSchema = Joi.object({
    id : Joi.number(),
    title : Joi.string(),
    region : Joi.string(),
    city : Joi.string(),
    type : Joi.string(),
    description : Joi.string()
});

module.exports = updateJobSchema;