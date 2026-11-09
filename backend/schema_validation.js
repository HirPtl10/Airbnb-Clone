const Joi = require('joi');

const schemaValidator = Joi.object({
    title: Joi.string()
    .max(20)
    .min(3)
    .required(),
    description: Joi.string()
    .max(20)
    .min(3)
    .required(),
    image: Joi.string().uri().required(),
    price: Joi.number()
    .integer()
    .max(100000)
    .required(),
    location: Joi.string()
    .max(20)
    .min(3)
    .required(),
    country: Joi.string()
    .max(20)
    .min(3)
    .required(),
    owner: Joi.required()
})

module.exports = schemaValidator;