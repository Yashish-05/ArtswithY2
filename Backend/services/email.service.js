const axios = require("axios");

const sendOTPEmail = async (email, otp) => {

    try {

        const response = await axios.post(

            "https://api.brevo.com/v3/smtp/email",

            {
                sender: {
                    name: "Artswith_y2",
                    email: "yashishkumarkamboj@gmail.com",
                },

                to: [
                    {
                        email,
                    },
                ],

                subject: "Verify your Artswith_y2 Account",

                htmlContent: `
                    <div style="font-family:Arial;padding:30px">

                        <h2>Welcome to Artswith_y2 🎨</h2>

                        <p>
                            Use the following OTP to verify your account:
                        </p>

                        <h1
                            style="
                                letter-spacing:8px;
                                color:#6C63FF;
                            "
                        >
                            ${otp}
                        </h1>

                        <p>
                            This OTP expires in
                            <strong>5 minutes</strong>.
                        </p>

                    </div>
                `,
            },

            {
                headers: {

                    "api-key": process.env.BREVO_API_KEY,

                    "Content-Type": "application/json",

                },
            }

        );

        console.log("✅ Email sent:", response.status);

    }

    catch (error) {

        console.error(
            "❌ Brevo API Error:",
            error.response?.data || error.message
        );

        throw error;

    }

};

module.exports = {
    sendOTPEmail,
};