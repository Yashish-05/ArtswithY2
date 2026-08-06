const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
    {
        challenge: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Challenge",
            required: true,
        },

        artwork: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Artwork",
            required: true,
        },

        artist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        status: {
            type: String,
            enum: ["submitted", "approved", "rejected"],
            default: "submitted",
        },

        votes: {
            type: Number,
            default: 0,
        },

        submittedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Prevent duplicate submissions:
 * One artist can only submit once per challenge.
 */
submissionSchema.index(
    { challenge: 1, artist: 1 },
    { unique: true }
);

module.exports = mongoose.model("Submission", submissionSchema);