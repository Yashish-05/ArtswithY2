const express = require("express");

const router = express.Router();

const {
  getMuseumArtworks,
} = require("../controllers/museum.controller");

router.get("/", getMuseumArtworks);

module.exports = router;