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

    await transporter.sendMail({

        from: '"Artswith_y2" <yashishkumarkamboj@gmail.com>',

        to: email,

        subject: "Verify your Artswith_y2 Account",

        html: `
            <div style="font-family:Arial;padding:30px">

                <h2>Welcome to Artswith_y2 🎨</h2>

                <p>Use the following OTP to verify your account:</p>

                <h1
                    style="
                        letter-spacing:8px;
                        color:#6C63FF;
                    "
                >
                    ${otp}
                </h1>

                <p>
                    This OTP will expire in
                    <strong>5 minutes</strong>.
                </p>

                <hr>

                <small>
                    If you didn't request this,
                    please ignore this email.
                </small>

            </div>
        `,

    });

};

module.exports = {
    sendOTPEmail,
};