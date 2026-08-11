import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "../../utils/toast";

import { forgotPassword } from "../../services/authService";

import logo from "../../assets/images/logo.jpeg";
import background from "../../assets/images/login-bg.jpg";

import "./ForgotPassword.css";

export default function ForgotPassword() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await forgotPassword(email);

            toast.success("OTP sent to your email.");

            navigate("/verify-otp", {
                state: { email }
            });

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Failed to send OTP."
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

                <h2>Forgot Password</h2>

                <p className="auth-subtitle">
                    Enter your registered email.
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter Email"
                            required
                        />

                    </div>

                    <button
                        className="login-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Sending..."
                            : "Send OTP"}

                    </button>

                </form>

                <div className="back-login">

                    <Link to="/login">

                        Back to Login

                    </Link>

                </div>

            </div>

        </div>

    );

}