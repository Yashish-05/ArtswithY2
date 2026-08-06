const Artwork = require("../models/artwork.model");

const getCommunityFeed = async (req, res) => {
  try {
    const artworks = await Artwork.find({
      visibility: "public",
    })
      .populate("artist", "username profileImage")
      .populate("challenge", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: artworks,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getCommunityFeed,
};