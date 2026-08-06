const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    artwork: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artwork",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//  it Prevent duplicate votes
voteSchema.index(
  { user: 1, artwork: 1 },
  { unique: true }
);

module.exports = mongoose.model("Vote", voteSchema);