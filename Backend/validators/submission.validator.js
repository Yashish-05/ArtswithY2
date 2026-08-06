const Joi = require("joi");

const createSubmissionSchema = Joi.object({
    challengeId: Joi.string()
        .required()
        .messages({
            "string.empty": "Challenge ID is required.",
            "any.required": "Challenge ID is required.",
        }),

    artworkId: Joi.string()
        .required()
        .messages({
            "string.empty": "Artwork ID is required.",
            "any.required": "Artwork ID is required.",
        }),
});

module.exports = {
    createSubmissionSchema,
};