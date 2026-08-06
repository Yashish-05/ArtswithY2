const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Artwork = require("../models/artwork.model");
const Submission = require("../models/submission.model");
const generateToken = require("../utils/generateToken");
const PendingUser = require("../models/pendingUser.model");
const OTP = require("../models/otp.model");
const generateOTP = require("../utils/generateOTP");
const { sendOTPEmail } = require("../services/email.service");
// const registerUser = async (req, res) => {
//     try {
//         const {
//             fullName,
//             username,
//             email,
//             password
//         } = req.body;
//                                 // Check Empty Fields
//         if (!fullName || !username || !email || !password) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please fill all fields"
//             });
//         }
//                                     // Check Email
//         const emailExists = await User.findOne({ email });
//         if (emailExists) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Email already exists"
//             });
//         }
//                                     // Check Username
//         const usernameExists = await User.findOne({ username });
//         if (usernameExists) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Username already exists"
//             });
//         }
//                                     // Hash Password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//                                     // Create User
//         const user = await User.create({
//             fullName,
//             username,
//             email,
//             password: hashedPassword
//         });
//         res.status(201).json({
//             success: true,
//             message: "Registration Successful",
//             token: generateToken(user._id),
//             user: {
//                 id: user._id,
//                 fullName: user.fullName,
//                 username: user.username,
//                 email: user.email,
//                 role: user.role
//             }
//         });
//     }
//     catch (error) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// };
const registerUser = async (req, res) => {

    try {

        const {
            fullName,
            username,
            email,
            password,
        } = req.body;

        if (
            !fullName ||
            !username ||
            !email ||
            !password
        ) {

            return res.status(400).json({
                success: false,
                message: "Please fill all fields",
            });

        }

        // Check existing user

        const emailExists =
            await User.findOne({ email });

        if (emailExists) {

            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });

        }

        const usernameExists =
            await User.findOne({ username });

        if (usernameExists) {

            return res.status(400).json({
                success: false,
                message: "Username already exists",
            });

        }

        // Remove previous pending registration

        // await PendingUser.deleteMany({ email });

        // await OTP.deleteMany({ email });

        // // Hash password

        // const salt = await bcrypt.genSalt(10);

        // const hashedPassword =
        //     await bcrypt.hash(password, salt);

        // // Save pending user

        // await PendingUser.create({

        //     fullName,

        //     username,

        //     email,

        //     password: hashedPassword,

        //     expiresAt: new Date(
        //         Date.now() + 5 * 60 * 1000
        //     ),

        // });

        // // Generate OTP

        // const otp = generateOTP();

        // const hashedOTP =
        //     await bcrypt.hash(otp, 10);

        // await OTP.create({

        //     email,

        //     otp: hashedOTP,

        //     expiresAt: new Date(
        //         Date.now() + 5 * 60 * 1000
        //     ),

        // });

        // await sendOTPEmail(email, otp);
        console.log("STEP 1");

        await PendingUser.deleteMany({ email });

        console.log("STEP 2");

        await OTP.deleteMany({ email });

        console.log("STEP 3");

        const salt = await bcrypt.genSalt(10);

        console.log("STEP 4");

        const hashedPassword = await bcrypt.hash(password, salt);

        console.log("STEP 5");

        await PendingUser.create({
            fullName,
            username,
            email,
            password: hashedPassword,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        console.log("STEP 6");

        const otp = generateOTP();

        console.log("STEP 7");

        const hashedOTP = await bcrypt.hash(otp, 10);

        console.log("STEP 8");

        await OTP.create({
            email,
            otp: hashedOTP,
            expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });

        console.log("STEP 9");

        await sendOTPEmail(email, otp);

        console.log("STEP 10");

        res.status(200).json({

            success: true,

            message:
                "OTP sent successfully. Please verify your email.",

            email,

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check Empty Fields
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }
        // Find User
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        // Login Success
        res.status(200).json({
            success: true,
            message: "Login Successful",
            token: generateToken(user._id),
            user: {
                id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getProfile = async (req, res) => {
    try {

        const userId = req.user._id;

        const totalArtworks = await Artwork.countDocuments({
            artist: userId,
        });

        const joinedChallenges = await Submission.countDocuments({
            artist: userId,
        });

        const artworks = await Artwork.find({
            artist: userId,
        }).select(
            "voteCount isWinner museumStatus"
        );

        let totalVotes = 0;
        let totalWins = 0;
        let museumEntries = 0;

        artworks.forEach((artwork) => {

            totalVotes += artwork.voteCount;

            if (artwork.isWinner) {
                totalWins++;
            }

            if (artwork.museumStatus) {
                museumEntries++;
            }

        });

        res.status(200).json({

            success: true,

            user: {

                ...req.user.toObject(),

                stats: {

                    artworks: totalArtworks,

                    votes: totalVotes,

                    joinedChallenges,

                    wins: totalWins,

                    museumEntries,

                },

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
    registerUser,
    loginUser,
    getProfile
};