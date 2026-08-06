const express = require("express");

const router = express.Router();

const { voteArtwork } = require("../controllers/vote.controller");
const { protect } = require("../middleware/auth.middleware");

router.post(
  "/:artworkId",
  protect,
  voteArtwork
);

module.exports = router;