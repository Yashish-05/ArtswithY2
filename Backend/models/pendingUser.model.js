const mongoose = require("mongoose");

const pendingUserSchema = new mongoose.Schema(
{
    fullName: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
        lowercase: true,
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
    },

    expiresAt: {
        type: Date,
        required: true,
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model(
    "PendingUser",
    pendingUserSchema
);