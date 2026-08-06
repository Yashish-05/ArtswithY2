const Joi = require("joi");

const createArtworkSchema = Joi.object({

    title: Joi.string()
        .min(3)
        .max(100)
        .required(),

    description: Joi.string()
        .allow("")
        .optional(),

    challenge: Joi.string()
        .required(),

});

module.exports = {
    createArtworkSchema,
};