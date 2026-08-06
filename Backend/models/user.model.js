const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
      maxlength: 200,
    },

    role: {
      type: String,
      enum: ["artist", "admin"],
      default: "artist",
    },

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    joinedChallenges: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Challenge",
      },
    ],

    museumEntries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artwork",
      },
    ],

    totalWins: {
        type: Number,
        default: 0,
    },

    totalVotes: {
        type: Number,
        default: 0,
    },

    totalArtworks: {
        type: Number,
        default: 0,
    },

    achievements: [
      {
        title: String,
        description: String,
        earnedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);