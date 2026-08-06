const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/database");
const authRoutes = require("./routes/auth.route");
const path = require("path");
const challengeRoutes = require("./routes/challenge.route");
const ArtworkModel = require('./models/artwork.model.js');
const artworkRoutes = require("./routes/artwork.route");
const dashboardRoutes=require("./routes/dashboard.route");
const voteRoutes = require("./routes/vote.route");
const resultRoutes = require("./routes/result.route");
const museumRoutes = require("./routes/museum.route");
const submissionRoutes = require("./routes/submission.route");
const otpRoutes = require("./routes/otp.route");


// dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/uploads",express.static(path.join(__dirname, "uploads")));
app.use("/api/artworks", artworkRoutes);    
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/museum", museumRoutes);
app.use("/api/submissions",submissionRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Artswith_y2 Backend 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});