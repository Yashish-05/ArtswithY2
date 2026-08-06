import { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../../services/authService";
import {
    saveAuth,
    getToken,
    getUser,
} from "../../utils/auth";
import { useEffect } from "react";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import AuthLayout from "../../components/Auth/AuthLayout";

import "./Login.css";
const Login = () => {
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
            const response = await loginUser(formData);

            saveAuth(response);

            toast.success(response.message);

            if (response.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login failed."
            );

        } finally {

            setLoading(false);

        }
    };
    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Login to continue your creative journey."
        >
            <form
                className="login-form"
                onSubmit={handleSubmit}
            >

                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                />

                <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
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
                    {loading ? "Signing In..." : "Login"}
                </Button>
                <p className="auth-switch">
                    Don't have an account?{" "}
                    <Link to="/register">
                        Create one
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};

export default Login;