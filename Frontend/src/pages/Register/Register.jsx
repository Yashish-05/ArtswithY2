import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

import { registerUser } from "../../services/authService";
import {
    getToken,
    getUser,
} from "../../utils/auth";
import { useEffect } from "react";
import AuthLayout from "../../components/Auth/AuthLayout";

import "./Register.css";
const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {

        if (getToken()) {

            const user = getUser();

            if (user?.role === "admin") {

                navigate("/admin");

            } else {

                navigate("/dashboard");

            }

        }

    }, [navigate]);

    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
   const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

        const response = await registerUser(formData);

        toast.success(response.message);

        navigate("/verify-otp", {

            state: {

                email: formData.email,

            },

        });

    }

    catch (error) {

        toast.error(

            error.response?.data?.message ||

            "Registration failed."

        );

    }

    finally {

        setLoading(false);

    }

};
    return (
        <AuthLayout
            title="Create Account"
            subtitle="Become part of the Artswith_y2 community."
        >

            <form
                className="register-form"
                onSubmit={handleSubmit}
            >

                <Input
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                />
                <Input
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    suffix={
                        showPassword
                            ? <EyeInvisibleOutlined />
                            : <EyeOutlined />
                    }
                    onSuffixClick={() =>
                        setShowPassword(!showPassword)
                    }
                />
                <Button
                    type="submit"
                    loading={loading}
                >
                    {loading ? "Creating Account..." : "Create Account"}
                </Button>
                <p className="auth-switch">
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};
export default Register;