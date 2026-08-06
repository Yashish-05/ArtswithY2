const express = require("express");

const router = express.Router();

const {
    getChallengeResults,
} = require("../controllers/result.controller");

router.get(
    "/:challengeId",
    getChallengeResults
);

module.exports = router;