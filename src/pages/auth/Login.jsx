import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "../../utils/toast";

import { loginAdmin } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

import PasswordInput from "../../components/auth/PasswordInput";
import AuthLoader from "../../components/auth/AuthLoader";

import logo from "../../assets/images/logo.jpeg";
import background from "../../assets/images/login-bg.jpg";

import "./Login.css";

export default function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const data = await loginAdmin(form);

            login(data.token, data.user);

            toast.success("Welcome Back!");

            setTimeout(() => {
                navigate("/dashboard");
            }, 700);

        } catch (err) {

            toast.error(
                err.response?.data?.message ||
                "Login Failed"
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

                <h2>UNITED BULAQI KHEL</h2>

                <span>ENTERPRISES</span>

                <h3>Admin Portal</h3>

                {loading ? (

                    <AuthLoader />

                ) : (

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>Email Address</label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                placeholder="Enter Email"
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <PasswordInput
                            label="Password"
                            name="password"
                            value={form.password}
                            placeholder="Enter Password"
                            onChange={handleChange}
                        />

                        <div className="forgot-password">

                            <Link to="/forgot-password">

                                Forgot Password?

                            </Link>

                        </div>

                        <button
                            className="login-btn"
                            disabled={loading}
                        >

                            Sign In

                        </button>

                    </form>

                )}

            </div>

        </div>

    );

}