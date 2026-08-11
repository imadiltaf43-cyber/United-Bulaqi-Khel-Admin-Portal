import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import { getProfile } from "../../services/profileService";

import {
    FaShieldAlt,
    FaUserCheck,
    FaClock,
    FaLaptop,
    FaGlobe,
    FaSignOutAlt,
} from "react-icons/fa";

import { toast } from "../../utils/toast";

import "./Security.css";

export default function Security() {

    const navigate = useNavigate();

    const [profile, setProfile] = useState(null);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const res = await getProfile();

            setProfile(res.data);

        } catch {

            toast.error("Unable to load security details.");

        }

    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        toast.success("Logged out successfully.");

        setTimeout(() => {

            navigate("/login");

        }, 1200);

    };

    return (

        <AdminLayout>

            <div className="security-page">

                <div className="security-header">

                    <h2>

                        <FaShieldAlt />

                        Security Center

                    </h2>

                    <p>

                        Manage your account security and active session.

                    </p>

                </div>

                <div className="security-grid">

                    <div className="security-card">

                        <FaUserCheck className="security-icon"/>

                        <h4>Account Status</h4>

                        <span className="status active">

                            Active

                        </span>

                    </div>

                    <div className="security-card">

                        <FaClock className="security-icon"/>

                        <h4>Last Login</h4>

                        <span>

                            {

                                profile?.lastLogin

                                    ?

                                    new Date(

                                        profile.lastLogin

                                    ).toLocaleString()

                                    :

                                    "-"

                            }

                        </span>

                    </div>

                    <div className="security-card">

                        <FaLaptop className="security-icon"/>

                        <h4>Current Browser</h4>

                        <span>

                            {navigator.userAgent}

                        </span>

                    </div>

                    <div className="security-card">

                        <FaGlobe className="security-icon"/>

                        <h4>Current Platform</h4>

                        <span>

                            {navigator.platform}

                        </span>

                    </div>

                </div>

                <div className="security-actions">

                    <button

                        className="logout-session"

                        onClick={logout}

                    >

                        <FaSignOutAlt />

                        Logout Current Session

                    </button>

                </div>

                <div className="security-tips">

                    <h3>

                        Security Tips

                    </h3>

                    <ul>

                        <li>✔ Keep your password private.</li>

                        <li>✔ Change your password regularly.</li>

                        <li>✔ Never share your OTP.</li>

                        <li>✔ Always logout on shared computers.</li>

                        <li>✔ Update your email if compromised.</li>

                    </ul>

                </div>

            </div>

        </AdminLayout>

    );

}