import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { toast } from "../../utils/toast";

import { verifyOtp } from "../../services/authService";

import logo from "../../assets/images/logo.jpeg";
import background from "../../assets/images/login-bg.jpg";

import "./ForgotPassword.css";

export default function VerifyOtp() {

    const navigate = useNavigate();

    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");

    const [loading, setLoading] = useState(false);

    if (!email) {
        return <Navigate to="/forgot-password" replace />;
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await verifyOtp({
                email,
                otp,
            });

            toast.success("OTP Verified");

            navigate("/reset-password", {
                state: {
                    email,
                    otp,
                },
            });

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Invalid OTP"
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

                <h2>Verify OTP</h2>

                <p className="auth-subtitle">
                    Enter the 6-digit OTP sent to
                    <br />
                    <strong>{email}</strong>
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>OTP Code</label>

                        <input
                            type="text"
                            maxLength={6}
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) =>
                                setOtp(e.target.value)
                            }
                            required
                        />

                    </div>

                    <button
                        className="login-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Verifying..."
                            : "Verify OTP"}

                    </button>

                </form>

            </div>

        </div>

    );

}