const Artwork = require("../models/artwork.model");
const Challenge = require("../models/challenge.model");
const Submission = require("../models/submission.model");
const User = require("../models/user.model");
const fs = require("fs");
const path = require("path");
const {
  createArtworkSchema,
} = require("../validators/artwork.validator");
const createArtwork = async (req, res) => {
  try {
    const { error } = createArtworkSchema.validate(req.body);
    if (!req.file) {
    return res.status(400).json({
        success: false,
        message: "Please upload an artwork image.",
    });
}
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const challenge = await Challenge.findById(req.body.challenge);
    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found.",
      });
    }
    const artwork = await Artwork.create({
      title: req.body.title,
      description: req.body.description,
      image: req.file
        ? `/uploads/artworks/${req.file.filename}`
        : "",
      challenge: req.body.challenge,
      artist: req.user.id,
      status: "submitted",
    });
    challenge.submissions.push(artwork._id);
    challenge.submissionCount += 1;
    await challenge.save();
    res.status(201).json({
      success: true,
      message: "Artwork submitted successfully.",
      artwork,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const getMyArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find({
      artist: req.user.id,
    })
      .populate("challenge", "title")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: artworks.length,
      data: artworks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const getArtworkById = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id)
      .populate("artist","fullName username profileImage")
      .populate("challenge","title theme status")
    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: "Artwork not found.",
      });
    }
    res.status(200).json({
      success: true,
      data: artwork,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
const deleteArtwork = async (req, res) => {

    try {

        const artwork = await Artwork.findById(req.params.id);

        if (!artwork) {

            return res.status(404).json({
                success: false,
                message: "Artwork not found."
            });

        }

        // Owner check
        if (artwork.artist.toString() !== req.user.id) {

            return res.status(403).json({
                success: false,
                message: "You can delete only your own artwork."
            });

        }

        // Winner protection
        if (
            artwork.isWinner ||
            artwork.museumStatus
        ) {

            return res.status(400).json({
                success: false,
                message: "Winning artworks cannot be deleted."
            });

        }

        const challenge = await Challenge.findById(
            artwork.challenge
        );

        if (
            challenge &&
            challenge.status === "completed"
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Challenge has already ended."
            });

        }

        // Remove from Challenge
        if (challenge) {

            challenge.submissions =
                challenge.submissions.filter(

                    id =>
                        id.toString() !== artwork._id.toString()

                );

            challenge.submissionCount =
                Math.max(
                    0,
                    challenge.submissionCount - 1
                );

            await challenge.save();

        }

        // Delete submission
        await Submission.deleteOne({

            artwork: artwork._id,

        });

        // Update user stats
        await User.findByIdAndUpdate(

            artwork.artist,

            {

                $inc: {

                    totalArtworks: -1,

                },

            }

        );

        // Delete image from uploads
        if (artwork.image) {

            const imagePath = path.join(

                __dirname,

                "..",

                artwork.image

            );

            if (fs.existsSync(imagePath)) {

                fs.unlinkSync(imagePath);

            }

        }

        await artwork.deleteOne();

        res.json({

            success: true,

            message: "Artwork deleted successfully."

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

module.exports = {
  createArtwork,
  getMyArtworks,
  getArtworkById,
  deleteArtwork,
};