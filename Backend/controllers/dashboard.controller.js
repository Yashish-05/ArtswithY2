const Artwork = require("../models/artwork.model");
const Challenge = require("../models/challenge.model");
const updateChallengeStatus = require("../utils/updateChallengeStatus");
const getDashboard = async (req, res) => {
    await updateChallengeStatus();
    try {
        const userId = req.user.id;
        const submittedArtworks =
            await Artwork.countDocuments({
                artist: userId,
            });
        const museumEntries =
            await Artwork.countDocuments({
                artist: userId,
                museumStatus: true,
            });
        const votes = await Artwork.aggregate([
            {
                $match: {
                    artist: userId,
                },
            },
            {
                $group: {
                    _id: null,
                    totalVotes: {
                        $sum: "$voteCount",
                    },
                },
            },
        ]);
        const joinedChallenges =
            await Challenge.countDocuments({
                participants: userId,
            });
        const recentArtworks =
            await Artwork.find({
                artist: userId,
            })
            .sort({ createdAt: -1 })
            .limit(3);
       const activeChallenge =
    await Challenge.findOne({
        status: "active",
    })
    .select(
        "title slug deadline banner participants"
    );
        res.status(200).json({
            success: true,
            stats: {
                submittedArtworks,
                joinedChallenges,
                votesReceived:
                    votes[0]?.totalVotes || 0,
                museumEntries,
            },
            recentArtworks,
            activeChallenge,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
module.exports = {
    getDashboard,
};