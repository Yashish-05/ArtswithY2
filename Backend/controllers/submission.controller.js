const Submission = require("../models/submission.model");
const Challenge = require("../models/challenge.model");
const Artwork = require("../models/artwork.model");

const {
    createSubmissionSchema,
} = require("../validators/submission.validator");

const createSubmission = async (req, res) => {
    try {

        // Validate request body
        const { error } =
            createSubmissionSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const { challengeId, artworkId } = req.body;

        // Find challenge
        const challenge = await Challenge.findById(challengeId);

        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: "Challenge not found.",
            });
        }

        // Challenge must be active
        if (challenge.status !== "active") {
            return res.status(400).json({
                success: false,
                message: "Challenge is no longer active.",
            });
        }

        // User must have joined
        const joined = challenge.participants.some(
            participant =>
                participant.toString() === req.user.id
        );

        if (!joined) {
            return res.status(403).json({
                success: false,
                message: "Join the challenge before submitting artwork.",
            });
        }

        // Find artwork
        const artwork = await Artwork.findById(artworkId);

        if (!artwork) {
            return res.status(404).json({
                success: false,
                message: "Artwork not found.",
            });
        }

        // Verify ownership
        if (artwork.artist.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can only submit your own artwork.",
            });
        }

        // Check duplicate submission
        const alreadySubmitted =
            await Submission.findOne({
                challenge: challengeId,
                artist: req.user.id,
            });

        if (alreadySubmitted) {
            return res.status(400).json({
                success: false,
                message:
                    "You have already submitted an artwork to this challenge.",
            });
        }

        // Create submission
        const submission =
            await Submission.create({

                challenge: challengeId,

                artwork: artworkId,

                artist: req.user.id,

            });

        // Update challenge
        challenge.submissions.push(submission._id);

        challenge.submissionCount += 1;

        await challenge.save();

        res.status(201).json({

            success: true,

            message: "Artwork submitted successfully.",

            submission,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }
};
const getChallengeSubmissions = async (req, res) => {

    try {

        const { challengeId } = req.params;

        const submissions = await Submission.find({

            challenge: challengeId,

        })

            .populate({

                path: "artwork",

                select:
                    "title image description voteCount",

            })

            .populate({

                path: "artist",

                select: "fullName username profileImage",

            })
            .sort({
                createdAt: -1,
            });
        res.status(200).json({
            success: true,
            submissions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message:
                "Failed to fetch submissions.",
        });
    }
};
const mongoose = require("mongoose");
const getLeaderboard = async (req, res) => {
    try {
        const { challengeId } = req.params;
        const leaderboard = await Submission.aggregate([
            {
                $match: {
                    challenge: new mongoose.Types.ObjectId(challengeId),
                },
            },
            {
                $lookup: {
                    from: "artworks",
                    localField: "artwork",
                    foreignField: "_id",
                    as: "artwork",
                },
            },
            {
                $unwind: "$artwork",
            },
            {
                $lookup: {
                    from: "users",
                    localField: "artist",
                    foreignField: "_id",
                    as: "artist",
                },
            },
            {
                $unwind: "$artist",
            },
            {
                $sort: {
                    "artwork.voteCount": -1,
                },
            },
            {
                $project: {
                    _id: 1,
                    createdAt: 1,
                    artwork: {
                        _id: "$artwork._id",
                        title: "$artwork.title",
                        image: "$artwork.image",
                        description: "$artwork.description",
                        voteCount: "$artwork.voteCount",
                    },
                    artist: {
                        _id: "$artist._id",
                        name: "$artist.name",
                        profilePicture: "$artist.profilePicture",
                    },
                },
            },
        ]);
        res.status(200).json({
            success: true,
            leaderboard,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to load leaderboard.",
        });
    }
};
module.exports = {
    createSubmission,
    getChallengeSubmissions,
    getLeaderboard,
};