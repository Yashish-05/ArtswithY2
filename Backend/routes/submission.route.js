const express = require("express");

const router = express.Router();

const {
    createSubmission,
    getChallengeSubmissions,
    getLeaderboard,
} = require("../controllers/submission.controller");

const {
    protect,
} = require("../middleware/auth.middleware");

const {
    authorize,
} = require("../middleware/role.middleware");

router.get(
    "/challenge/:challengeId",
    getChallengeSubmissions
);
router.get(
    "/leaderboard/:challengeId",
    getLeaderboard
);
// Submit an artwork to a challenge
router.post(
    "/",
    protect,
    authorize("artist", "admin"),
    createSubmission
);

module.exports = router;