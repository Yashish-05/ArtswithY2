const Vote = require("../models/vote.model");
const Artwork = require("../models/artwork.model");

const voteArtwork = async (req, res) => {
  try {
    const { artworkId } = req.params;

    const artwork = await Artwork.findById(artworkId);

    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found.",
      });
    }

    const existingVote = await Vote.findOne({
      user: req.user.id,
      artwork: artworkId,
    });

    if (existingVote) {
      return res.status(400).json({
        success: false,
        message: "You have already voted for this artwork.",
      });
    }

    await Vote.create({
      user: req.user.id,
      artwork: artworkId,
    });

    artwork.voteCount += 1;
    await artwork.save();

    res.status(200).json({
      success: true,
      message: "Vote submitted successfully.",
      data: {
        voteCount: artwork.voteCount,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  voteArtwork,
};