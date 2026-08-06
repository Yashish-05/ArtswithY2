
const Joi = require("joi");

const createChallengeSchema = Joi.object({

    title: Joi.string()
        .min(5)
        .max(100)
        .required(),
        
    theme: Joi.string()
        .required(),

    description: Joi.string()
        .min(20)
        .required(),

    difficulty: Joi.string()
        .valid(
            "Beginner",
            "Intermediate",
            "Advanced"
        )
        .required(),

    reward: Joi.string()
        .required(),

    coverImage: Joi.string()
        .allow("")
        .optional(),

    startDate: Joi.date()
        .required(),

    endDate: Joi.date()
        .greater(Joi.ref("startDate"))
        .required(),

    maxParticipants: Joi.number()
        .min(1)
        .default(1000),

    rules: Joi.array()
        .items(Joi.string())
        .default([])
});

module.exports = {
    createChallengeSchema
};