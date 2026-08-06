const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        theme: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        difficulty: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            default: "Beginner",
        },

        reward: {
            type: String,
            required: true,
        },

        maxParticipants: {
            type: Number,
            default: 1000,
        },

        rules: [
            {
                type: String,
            },
        ],

        coverImage: {
            type: String,
            default: "",
        },

        startDate: {
            type: Date,
            required: true,
        },

        endDate: {
            type: Date,
            required: true,
        },

        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        submissions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Artwork",
            },
        ],
        submissionCount: {
            type: Number,
            default: 0
        },

        participantCount: {
            type: Number,
            default: 0
        },

        status: {
            type: String,
            enum: ["upcoming", "active", "completed"],
            default: "upcoming",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        // for winners 
        winner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artwork",
            default: null
        },

        runnerUp: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artwork",
            default: null
        },

        thirdPlace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artwork",
            default: null
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Challenge", challengeSchema);