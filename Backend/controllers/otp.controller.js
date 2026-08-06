const bcrypt = require("bcryptjs");
const OTP = require("../models/otp.model");
const User = require("../models/user.model");
const PendingUser = require("../models/pendingUser.model");
const generateToken = require("../utils/generateToken");
const generateOTP = require("../utils/generateOTP");
const { sendOTPEmail } = require("../services/email.service");


// ===========================
// Send OTP
// ===========================

const sendOTP = async (req, res) => {

    try {

        const { email } = req.body;

        if (!email) {

            return res.status(400).json({
                success: false,
                message: "Email is required."
            });

        }

        // Delete old OTP if exists

        await OTP.deleteMany({ email });

        const otp = generateOTP();

        const hashedOTP = await bcrypt.hash(otp, 10);

        await OTP.create({

            email,

            otp: hashedOTP,

            expiresAt: new Date(
                Date.now() + 5 * 60 * 1000
            ),

        });

        await sendOTPEmail(email, otp);

        res.status(200).json({

            success: true,

            message: "OTP sent successfully."

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


// ===========================
// Verify OTP
// ===========================

const verifyOTP = async (req, res) => {

    try {

        const { email, otp } = req.body;

        const otpRecord = await OTP.findOne({ email });

        if (!otpRecord) {

            return res.status(404).json({

                success: false,

                message: "OTP not found."

            });

        }

        if (new Date() > otpRecord.expiresAt) {

            await OTP.deleteOne({
                _id: otpRecord._id
            });

            await PendingUser.deleteMany({ email });

            return res.status(400).json({

                success: false,

                message: "OTP expired."

            });

        }

        const matched = await bcrypt.compare(

            otp,

            otpRecord.otp

        );

        if (!matched) {

            return res.status(400).json({

                success: false,

                message: "Invalid OTP."

            });

        }

        const pendingUser = await PendingUser.findOne({

            email,

        });

        if (!pendingUser) {

            return res.status(404).json({

                success: false,

                message: "Pending registration not found."

            });

        }

        const user = await User.create({

            fullName: pendingUser.fullName,

            username: pendingUser.username,

            email: pendingUser.email,

            password: pendingUser.password,

        });

        await OTP.deleteMany({ email });

        await PendingUser.deleteMany({ email });

        res.status(201).json({

            success: true,

            message: "Registration completed successfully.",

            token: generateToken(user._id),

            user: {

                id: user._id,

                fullName: user.fullName,

                username: user.username,

                email: user.email,

                role: user.role,

            }

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};

module.exports = {

    sendOTP,

    verifyOTP,

};