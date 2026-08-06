const Artwork = require("../models/artwork.model");
const Challenge = require("../models/challenge.model");
const { createChallengeSchema, } = require("../validators/challenge.validator");
const Submission = require("../models/submission.model");
const updateChallengeStatus = require("../utils/updateChallengeStatus");
const User = require("../models/user.model");

const createChallenge = async (req, res) => {
    try {
        const { error } =
            createChallengeSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        const slug = req.body.title
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-");

        const challenge = await Challenge.create({
            ...req.body,
            slug,
            createdBy: req.user.id,
        });
        await updateChallengeStatus();
        res.status(201).json({
            success: true,
            message: "Challenge created successfully",
            challenge,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getActiveChallenge = async (req, res) => {
    try {
        await updateChallengeStatus();
        const challenge = await Challenge.findOne({
            status: "active",
        });

        if (!challenge) {
            return res.status(200).json({
                success: true,
                challenge: null,
                hasJoined: false,
                participantCount: 0,
                message: "No active challenge found.",
            });
        }

        let hasJoined = false;
let submission = null;

if (req.user) {
    hasJoined = challenge.participants.some(
        participant =>
            participant.toString() === req.user.id
    );

    submission = await Submission.findOne({
        challenge: challenge._id,
        artist: req.user.id,
    });
}
        res.status(200).json({

            success: true,

            challenge,

            hasJoined,

            hasSubmitted: !!submission,

            // submissionId: submission?._id || null,
            submissionId: submission?.artwork|| null,

            participantCount: challenge.participantCount,

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
const getAllChallenges = async (req, res) => {
    try {
        await updateChallengeStatus();
        const challenges = await Challenge
            .find({
    status: "active"
})
            .sort({ createdAt: -1 })
            .select("-participants -submissions");
        res.status(200).json({
            success: true,
            count: challenges.length,
            challenges,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getChallengeBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const challenge = await Challenge.findOne({ slug })
            .populate("createdBy", "username profileImage")
            .populate("winner", "title image");
        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: "Challenge not found.",
            });
        }
        res.status(200).json({
            success: true,
            challenge,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const joinChallenge = async (req, res) => {
    try {
        const { id } = req.params;
        const challenge = await Challenge.findById(id);
        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: "Challenge not found."
            });
        }
        if (challenge.status !== "active") {
            return res.status(400).json({
                success: false,
                message: "This challenge is no longer active."
            });
        }
        const alreadyJoined = challenge.participants.includes(req.user.id);
        if (alreadyJoined) {
            return res.status(400).json({
                success: false,
                message: "You have already joined this challenge."
            });
        }
        challenge.participants.push(req.user.id);
        challenge.participantCount += 1;
        await challenge.save();
        res.status(200).json({
            success: true,
            message: "Challenge joined successfully.",
            data: challenge,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const selectWinners = async (req, res) => {
    try {
        const { challengeId } = req.params;
        const challenge =
            await Challenge.findById(challengeId);
        if (!challenge) {
            return res.status(404).json({
                success: false,
                message: "Challenge not found."
            });
        }
        if (challenge.status === "completed") {
            return res.status(400).json({
                success: false,
                message:
                    "Winners have already been selected."
            });
        }
        const submissions =
            await Submission.find({
                challenge: challengeId,
            }).populate("artwork");
        const ranked = submissions.sort(
            (a, b) =>
                b.artwork.voteCount -
                a.artwork.voteCount
        );
        // Winner
        if (ranked[0]) {
            challenge.winner =
                ranked[0].artwork._id;
        }
        // Runner Up
        if (ranked[1]) {
            challenge.runnerUp =
                ranked[1].artwork._id;
        }
        // Third Place
        if (ranked[2]) {
            challenge.thirdPlace =
                ranked[2].artwork._id;
        }
        challenge.status = "completed";
        // Update artwork statuses
        if (ranked[0]) {
            ranked[0].artwork.isWinner = true;
            ranked[0].artwork.museumStatus = true;
            ranked[0].artwork.status = "museum";
            await ranked[0].artwork.save();
        }
        if (ranked[1]) {
            ranked[1].artwork.status = "winner";
            await ranked[1].artwork.save();
        }
        if (ranked[2]) {
            ranked[2].artwork.status = "winner";
            await ranked[2].artwork.save();
        }
        await challenge.save();
        res.status(200).json({
            success: true,
            message:
                "Winners selected successfully.",
            data: {
                winner:
                    ranked[0]?.artwork.title || null,
                runnerUp:
                    ranked[1]?.artwork.title || null,
                thirdPlace:
                    ranked[2]?.artwork.title || null,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getHallOfFame = async (req, res) => {

    try {

        const artworks = await Artwork.find({

            museumStatus: true,

        })

           .populate(
    "artist",
    "fullName username profileImage"
)

            .populate("challenge", "title theme")

            .sort({

                createdAt: -1,

            });

        res.status(200).json({

            success: true,

            count: artworks.length,

            data: artworks,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};
const getDashboardStats = async (req, res) => {

    try {
await updateChallengeStatus();
        const activeChallenges = await Challenge.countDocuments({
            status: "active",
        });

        const completedChallenges = await Challenge.countDocuments({
            status: "completed",
        });

        const hallOfFame = await Challenge.countDocuments({
            winner: { $ne: null },
        });

        const artists = await User.countDocuments({
            role: "artist",
        });

        res.json({

            activeChallenges,

            completedChallenges,

            hallOfFame,

            artists,

        });

    }

    catch (error) {

        res.status(500).json({

            message: error.message,

        });

    }

};
module.exports = {
    createChallenge,
    getAllChallenges,
    getActiveChallenge,
    getChallengeBySlug,
    joinChallenge,
    selectWinners,
    getHallOfFame,
    getDashboardStats,
};