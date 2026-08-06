
const express = require("express");
const router = express.Router();

const {
    createChallenge,
    getAllChallenges,
    getActiveChallenge,
    getChallengeBySlug,
    joinChallenge,
    selectWinners,
    getHallOfFame,
    getDashboardStats,
} = require("../controllers/challenge.controller");
const { protect } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/role.middleware");
router.get("/active", getActiveChallenge);
router.get("/",getAllChallenges);
router.get("/hall-of-fame", getHallOfFame);
router.get("/dashboard-stats",protect,authorize("admin"),getDashboardStats);
router.get("/:slug", getChallengeBySlug);
router.post("/",protect,authorize("admin"),createChallenge);
router.post("/:id/join",protect,authorize("artist","admin"),joinChallenge);
router.post("/:challengeId/select-winners",protect,authorize("admin"),selectWinners);
module.exports = router;