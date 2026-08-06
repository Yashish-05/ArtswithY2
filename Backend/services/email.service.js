const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendOTPEmail = async (email, otp) => {
    try {

        const { data, error } = await resend.emails.send({

            from: "Artswith_y2 <onboarding@resend.dev>",

            to: email,

            subject: "Verify your Artswith_y2 Account",

            html: `
                <div style="font-family:Arial;padding:30px">
                    <h2>Welcome to Artswith_y2 🎨</h2>

                    <p>Use the following OTP to verify your account:</p>

                    <h1
                        style="
                            color:#6C63FF;
                            letter-spacing:8px;
                        "
                    >
                        ${otp}
                    </h1>

                    <p>
                        This OTP expires in
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

        if (error) {
            console.error("Resend Error:", error);
            throw new Error(error.message);
        }

        console.log("✅ Email Sent");
        console.log(data);

    } catch (err) {

        console.error("❌ Resend API Error:", err);

        throw err;

    }
};

module.exports = {
    sendOTPEmail,
};