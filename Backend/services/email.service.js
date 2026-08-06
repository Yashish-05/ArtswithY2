const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error, success) => {

    if (error) {

        console.error("SMTP ERROR:", error);

    } else {

        console.log("✅ Brevo SMTP Ready");

    }

});

const sendOTPEmail = async (email, otp) => {

    console.log("STEP 1");

    console.log("Sending OTP to:", email);

    console.log("SMTP USER:", process.env.EMAIL_USER);

    try {

        console.log("STEP 2");

        const info = await transporter.sendMail({

            from: '"Artswith_y2" <yashishkumarkamboj@gmail.com>',

            to: email,

            subject: "Verify your Artswith_y2 Account",

            html: `
                <h2>Your OTP</h2>
                <h1>${otp}</h1>
            `,

        });

        console.log("STEP 3");

        console.log(info);

    }

    catch (err) {

        console.error("SEND MAIL ERROR");

        console.error(err);

        throw err;

    }

};

module.exports = {
    sendOTPEmail,
};