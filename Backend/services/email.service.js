// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({

//     service: "gmail",

//     auth: {

//         user: process.env.EMAIL_USER,

//         pass: process.env.EMAIL_PASS,

//     },

// });

// const sendOTPEmail = async (email, otp) => {

//     await transporter.sendMail({

//         from: `"Artswith_y2" <${process.env.EMAIL_USER}>`,

//         to: email,

//         subject: "Verify your Artswith_y2 Account",

//         html: `
//             <div style="font-family:Arial;padding:30px">

//                 <h2>Welcome to Artswith_y2 🎨</h2>

//                 <p>
//                     Use the following OTP to verify your account:
//                 </p>

//                 <h1
//                     style="
//                         letter-spacing:8px;
//                         color:#6C63FF;
//                     "
//                 >
//                     ${otp}
//                 </h1>

//                 <p>
//                     This OTP will expire in
//                     <strong>5 minutes</strong>.
//                 </p>

//                 <hr>

//                 <small>
//                     If you didn't request this,
//                     please ignore this email.
//                 </small>

//             </div>
//         `,

//     });

// };

// module.exports = {
//     sendOTPEmail,
// };




const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // IMPORTANT
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

transporter.verify(function (error, success) {

    if (error) {

        console.log("SMTP ERROR:", error);

    } else {

        console.log("SMTP Ready");

    }

});