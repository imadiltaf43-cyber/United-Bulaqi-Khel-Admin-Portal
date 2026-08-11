import { useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import "./Changepassword.css";

import { toast } from "../../utils/toast";

import { changePassword } from "../../services/profileService";

import {
  FaEye,
  FaEyeSlash,
  FaLock,
} from "react-icons/fa";

export default function ChangePassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await changePassword(form);

      toast.success(res.data.message);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>

      <div className="password-page">

        <div className="password-card">

          <div className="password-title">

            <FaLock />

            <div>

              <h2>Change Password</h2>

              <p>
                Update your account password.
              </p>

            </div>

          </div>

          <form onSubmit={submit}>

            <div className="password-input">

              <input
                type={showCurrent ? "text" : "password"}
                placeholder="Current Password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowCurrent(!showCurrent)
                }
              >
                {showCurrent ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            <div className="password-input">

              <input
                type={showNew ? "text" : "password"}
                placeholder="New Password"
                name="newPassword"
                value={form.newPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowNew(!showNew)
                }
              >
                {showNew ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            <div className="password-input">

              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowConfirm(!showConfirm)
                }
              >
                {showConfirm ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            <div className="password-actions">

              <button
                type="submit"
                className="save-password-btn"
                disabled={loading}
              >
                {loading
                  ? "Updating..."
                  : "Update Password"}
              </button>

            </div>

          </form>

        </div>

      </div>

    </AdminLayout>
  );
}