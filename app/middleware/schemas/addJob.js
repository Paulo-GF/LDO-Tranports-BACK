const Joi = require('joi');

// Schema description when adding a new job
const addJobSchema = Joi.object({
    // Data validator :
    title : Joi.string().required(),
    region : Joi.string().required(),
    city : Joi.string().required(),
    type : Joi.string().required(),
    description : Joi.string().required()
});

module.exports = addJobSchema;