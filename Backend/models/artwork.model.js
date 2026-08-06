const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
    },

    voteCount: {
      type: Number,
      default: 0,
    },

    commentCount: {
      type: Number,
      default: 0,
    },

    isWinner: {
      type: Boolean,
      default: false,
    },

    museumStatus: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: [
        "draft",
        "submitted",
        "approved",
        "rejected",
        "winner",
        "museum",
      ],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Artwork", artworkSchema);