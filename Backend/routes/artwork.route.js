const express = require("express");
const router = express.Router();
const { createArtwork, getMyArtworks, getArtworkById, deleteArtwork,} = require("../controllers/artwork.controller");
const {protect,} = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

router.post(
    "/",
    protect,
    upload.single("image"),
    createArtwork
);
router.get(
"/my",
protect,
getMyArtworks
);
router.get(
"/:id",
getArtworkById
);
router.delete(
    "/:id",
    protect,
    deleteArtwork
);

module.exports = router;