import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../../utils/toast";

import AdminLayout from "../../layouts/AdminLayout";

import {
    getProfile,
    sendEmailOtp,
    verifyEmailOtp,
    changeEmail,
} from "../../services/profileService";

import {
    FaEnvelope,
    FaPaperPlane,
    FaCheckCircle,
    FaSave,
} from "react-icons/fa";

import "./ChangeEmail.css";

export default function ChangeEmail() {

    const navigate = useNavigate();

    const [currentEmail, setCurrentEmail] = useState("");

    const [newEmail, setNewEmail] = useState("");

    const [otp, setOtp] = useState("");

    const [otpSent, setOtpSent] = useState(false);

    const [verified, setVerified] = useState(false);

    const [loading, setLoading] = useState(false);

    const [sendingOtp, setSendingOtp] = useState(false);

    const [verifyingOtp, setVerifyingOtp] = useState(false);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const res = await getProfile();

            setCurrentEmail(res.data.email);

        } catch (err) {

            toast.error("Failed to load profile.");

        }

    };

    // ===========================
    // Send OTP
    // ===========================

    const handleSendOtp = async () => {

        if (!newEmail.trim()) {

            toast.error("Enter a new email.");

            return;

        }

        if (newEmail === currentEmail) {

            toast.error("Please enter a different email.");

            return;

        }

        try {

            setSendingOtp(true);

            const res = await sendEmailOtp({

                newEmail,

            });

            toast.success(res.data.message);

            setOtpSent(true);

        } catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Failed to send OTP."

            );

        } finally {

            setSendingOtp(false);

        }

    };

    // ===========================
    // Verify OTP
    // ===========================

    const handleVerifyOtp = async () => {

        if (!otp.trim()) {

            toast.error("Enter OTP.");

            return;

        }

        try {

            setVerifyingOtp(true);

            const res = await verifyEmailOtp({

                newEmail,

                otp,

            });

            toast.success(res.data.message);

            setVerified(true);

        } catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Invalid OTP."

            );

        } finally {

            setVerifyingOtp(false);

        }

    };

    // ===========================
    // Update Email
    // ===========================

    const handleUpdateEmail = async () => {

        try {

            setLoading(true);

            const res = await changeEmail({

                newEmail,

            });

            toast.success(res.data.message);

            toast.info("Please login again.");

            localStorage.removeItem("token");
            localStorage.removeItem("admin");

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        } catch (err) {

            toast.error(

                err.response?.data?.message ||

                "Failed to update email."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AdminLayout>

            <div className="change-email-page">

                <div className="email-card">

                    <h2>

                        <FaEnvelope />

                        Change Email

                    </h2>

                    <p>

                        Update your login email securely.

                    </p>

                    <div className="email-group">

                        <label>

                            Current Email

                        </label>

                        <input

                            value={currentEmail}

                            readOnly

                        />

                    </div>

                    <div className="email-group">

                        <label>

                            New Email

                        </label>

                        <input

                            type="email"

                            placeholder="Enter new email"

                            value={newEmail}

                            onChange={(e) => {

                                setNewEmail(e.target.value);

                            }}

                        />

                    </div>

                    <button

                        className="gold-btn"

                        onClick={handleSendOtp}

                        disabled={sendingOtp}

                    >

                        <FaPaperPlane />

                        {

                            sendingOtp

                                ? "Sending..."

                                : "Send OTP"

                        }

                    </button>

                    {

                        otpSent && (

                            <>

                                <div className="email-group">

                                    <label>

                                        Enter OTP

                                    </label>

                                    <input

                                        value={otp}

                                        onChange={(e) => {

                                            setOtp(e.target.value);

                                        }}

                                        placeholder="6 Digit OTP"

                                    />

                                </div>

                                <button

                                    className="gold-btn"

                                    onClick={handleVerifyOtp}

                                    disabled={verifyingOtp || verified}

                                >

                                    <FaCheckCircle />

                                    {

                                        verified

                                            ? "Verified"

                                            : verifyingOtp

                                                ? "Verifying..."

                                                : "Verify OTP"

                                    }

                                </button>

                            </>

                        )

                    }

                    {

                        verified && (

                            <button

                                className="save-btn"

                                onClick={handleUpdateEmail}

                                disabled={loading}

                            >

                                <FaSave />

                                {

                                    loading

                                        ? "Updating..."

                                        : "Update Email"

                                }

                            </button>

                        )

                    }

                </div>

            </div>

        </AdminLayout>

    );

}