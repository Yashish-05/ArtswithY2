const Artwork = require("../models/artwork.model");

const getMuseumArtworks = async (req, res) => {
  try {

    const artworks = await Artwork.find({
      visibility: "public",
      voteCount: { $gt: 0 },
    })
      .populate("artist", "username profileImage")
      .populate("challenge", "title")
      .sort({ voteCount: -1 });

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
  getMuseumArtworks,
};