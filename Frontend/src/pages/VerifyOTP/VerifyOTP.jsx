import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthLayout from "../../components/Auth/AuthLayout";
import Button from "../../components/UI/Button/Button";

import api from "../../services/api";
import { saveAuth } from "../../utils/auth";

import "./VerifyOTP.css";

const VerifyOTP = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState([
        "", "", "", "", "", ""
    ]);
    const handleChange = (value, index) => {

        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];

        newOtp[index] = value;

        setOtp(newOtp);

        if (value && index < 5) {

            inputs.current[index + 1]?.focus();

        }

    };

    const handleKeyDown = (e, index) => {

        if (

            e.key === "Backspace" &&

            !otp[index] &&

            index > 0

        ) {

            inputs.current[index - 1]?.focus();

        }

    };

    const handlePaste = (e) => {

        e.preventDefault();

        const pasted = e.clipboardData
            .getData("text")
            .trim();

        if (!/^\d{6}$/.test(pasted)) return;

        const digits = pasted.split("");

        setOtp(digits);

        inputs.current[5]?.focus();

    };
    const [loading, setLoading] = useState(false);

    const [timer, setTimer] = useState(60);

    const inputs = useRef([]);

    useEffect(() => {

        if (timer <= 0) return;

        const interval = setInterval(() => {

            setTimer((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(interval);

    }, [timer]);
    const handleVerify = async () => {

    const otpValue = otp.join("");

    if (otpValue.length !== 6) {

        toast.error("Please enter all 6 digits.");

        return;

    }

    try {

        setLoading(true);

        const response = await api.post(

            "/otp/verify",

            {

                email,

                otp: otpValue,

            }

        );

        saveAuth(response.data);

        toast.success(response.data.message);

        if (response.data.user.role === "admin") {

            navigate("/admin");

        }

        else {

            navigate("/dashboard");

        }

    }

    catch (error) {

        toast.error(

            error.response?.data?.message ||

            "OTP Verification Failed."

        );

    }

    finally {

        setLoading(false);

    }

};

    return (

        <AuthLayout

            title="Verify Your Email"

            subtitle="Complete your registration"

        >

            <div className="verify-card">

                <div className="verify-icon">

                    📩

                </div>

                <h2>

                    Email Verification

                </h2>

                <p>

                    We sent a verification code to

                </p>

                <span className="verify-email">

                    {email}

                </span>

                <div className="otp-container">

                    {

                        otp.map((digit, index) => (

                            <input

                                key={index}

                                ref={(el) =>

                                    inputs.current[index] = el

                                }

                                className="otp-box"

                                type="text"

                                inputMode="numeric"

                                maxLength={1}

                                value={digit}

                                onChange={(e) =>

                                    handleChange(e.target.value, index)

                                }

                                onKeyDown={(e) =>

                                    handleKeyDown(e, index)

                                }

                                onPaste={handlePaste}

                            />

                        ))

                    }

                </div>

                <div className="timer-section">

                    {

                        timer > 0

                            ? (

                                <p>

                                    Resend code in

                                    <span>

                                        {" "}

                                        00:{timer.toString().padStart(2, "0")}

                                    </span>

                                </p>

                            )

                            : (

                                <button

                                    className="resend-btn"

                                >

                                    Resend OTP

                                </button>

                            )

                    }

                </div>

                <Button

    loading={loading}

    onClick={handleVerify}

>

    {

        loading

            ? "Verifying..."

            : "Verify OTP"

    }

</Button>

            </div>

        </AuthLayout>

    );

};

export default VerifyOTP;