import { useEffect, useState } from "react";
import "./Profile.css";
import { toast } from "../../utils/toast";

import AdminLayout from "../../layouts/AdminLayout";

import {
  FaCamera,
  FaUserShield,
  FaCalendarAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaSave,
  FaTimes,
} from "react-icons/fa";

import axios from "axios";
import { getProfile as getProfileService } from "../../services/profileService";

export default function Profile() {
  const [profile, setProfile] = useState(null);

  const [fullName, setFullName] = useState("");

  const [phone, setPhone] = useState("");

  const [preview, setPreview] = useState("");

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfileService();

      const profileData = res.data?.user || res.data;

      setProfile(profileData);

      setFullName(profileData.fullName || "");

      setPhone(profileData.phone || "");

      setPreview(profileData.profileImage || "");
    } catch (err) {
      console.log(err);
      toast.error("Unable to load profile.");
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  const saveProfile = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("fullName", fullName);

      formData.append("phone", phone);

      if (image) {
        formData.append("profileImage", image);
      }

      await axios.put(
        "http://localhost:5000/api/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      toast.success("Profile updated successfully");

      fetchProfile();

      setLoading(false);
    } catch (err) {
      toast.error("Something went wrong");

      setLoading(false);
    }
  };

  if (!profile) return null;

  return (
    <AdminLayout>

      <div className="profile-page">

        <div className="profile-header">

          <h2>My Profile</h2>

          <p>
            Manage your personal information and account settings.
          </p>

        </div>

        <div className="profile-card">

          <div className="profile-left">

            <div className="avatar-wrapper">

              <img
                src={
                  preview ||
                  "https://ui-avatars.com/api/?name=Admin"
                }
                alt=""
              />

            </div>

            <label className="upload-btn">

              <FaCamera />

              Change Photo

              <input
                type="file"
                hidden
                onChange={handleImage}
              />

            </label>

          </div>

          <div className="profile-right">

            <div className="input-group">

              <label>Full Name</label>

              <input
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
              />

            </div>

            <div className="input-group">

              <label>

                <FaEnvelope />

                Email

              </label>

              <input
                value={profile.email}
                disabled
              />

            </div>

            <div className="input-group">

              <label>

                <FaPhone />

                Phone

              </label>

              <input
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

            </div>

          </div>

        </div>

        <div className="account-card">

          <h3>Account Information</h3>

          <div className="info-grid">

            <div className="info-box">

              <FaUserShield />

              <span>Role</span>

              <strong>{profile.role}</strong>

            </div>

            <div className="info-box">

              <FaClock />

              <span>Last Login</span>

              <strong>
                {new Date(
                  profile.lastLogin
                ).toLocaleString()}
              </strong>

            </div>

            <div className="info-box">

              <FaCalendarAlt />

              <span>Member Since</span>

              <strong>
                {new Date(
                  profile.createdAt
                ).toLocaleDateString()}
              </strong>

            </div>

            <div className="info-box">

              🟢

              <span>Status</span>

              <strong>Active</strong>

            </div>

          </div>

        </div>

        <div className="profile-buttons">

          <button
            className="cancel-btn"
            onClick={fetchProfile}
          >
            <FaTimes />

            Cancel

          </button>

          <button
            className="save-btn"
            onClick={saveProfile}
          >
            <FaSave />

            {loading
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

      </div>

    </AdminLayout>
  );
}