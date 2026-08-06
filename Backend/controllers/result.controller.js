const Artwork = require("../models/artwork.model");

const getChallengeResults = async (req, res) => {

    try {
        const { challengeId } = req.params;
        const artworks = await Artwork.find({
            challenge: challengeId,
        })
        .populate("artist", "username profileImage")
        .populate("challenge", "title")
        .sort({ voteCount: -1 });
        if (artworks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No artworks found for this challenge.",
            });
        }
            const challengeTitle = artworks[0]?.challenge?.title || "Challenge";
            const winner = artworks[0] || null;
            const runnerUp =  artworks[1] || null;
            const thirdPlace =  artworks[2] || null;
            const topArtworks = artworks.slice(0, 10);
        res.status(200).json({
            success: true,
            data: {
                challengeTitle,
                winner,
                runnerUp,
                thirdPlace,
                topArtworks,
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
    getChallengeResults,
};