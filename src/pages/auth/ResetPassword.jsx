import { useState } from "react";
import {
    useLocation,
    useNavigate,
    Navigate,
} from "react-router-dom";

import { toast } from "../../utils/toast";

import { resetPassword } from "../../services/authService";

import PasswordInput from "../../components/auth/PasswordInput";

import logo from "../../assets/images/logo.jpeg";
import background from "../../assets/images/login-bg.jpg";

import "./ForgotPassword.css";

export default function ResetPassword() {

    const navigate = useNavigate();

    const location = useLocation();

    const email = location.state?.email;
    const otp = location.state?.otp;

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] = useState(false);

    if (!email || !otp) {
        return <Navigate to="/forgot-password" replace />;
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {

            toast.error("Passwords do not match");

            return;

        }

        try {

            setLoading(true);

            await resetPassword({

                email,

                otp,

                newPassword: password,

            });

            toast.success(
                "Password changed successfully"
            );

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Reset Failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div
            className="login-page"
            style={{
                backgroundImage: `url(${background})`,
            }}
        >

            <div className="login-overlay"></div>

            <div className="login-card">

                <img
                    src={logo}
                    alt="UBKE"
                    className="login-logo"
                />

                <h2>Create New Password</h2>

                <p className="auth-subtitle">

                    Enter your new password.

                </p>

                <form onSubmit={handleSubmit}>

                    <PasswordInput

                        label="New Password"

                        name="password"

                        value={password}

                        placeholder="Enter New Password"

                        onChange={(e) =>
                            setPassword(e.target.value)
                        }

                    />

                    <PasswordInput

                        label="Confirm Password"

                        name="confirmPassword"

                        value={confirmPassword}

                        placeholder="Confirm Password"

                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }

                    />

                    <button
                        className="login-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Updating..."
                            : "Update Password"}

                    </button>

                </form>

            </div>

        </div>

    );

}