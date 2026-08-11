import "./Settings.css";

import AdminLayout from "../../layouts/AdminLayout";
import { Link } from "react-router-dom";

import {
  FaUserCircle,
  FaLock,
  FaEnvelope,
  FaShieldAlt,
  FaChevronRight,
  FaGlobe,
} from "react-icons/fa";




const settings = [
  {
    title: "My Profile",
    description: "Update your personal information and profile photo.",
    icon: <FaUserCircle />,
    path: "/settings/profile",
  },
  {
    title: "Change Password",
    description: "Update your account password securely.",
    icon: <FaLock />,
    path: "/settings/change-password",
  },
  {
    title: "Change Email",
    description: "Verify and update your registered email address.",
    icon: <FaEnvelope />,
    path: "/settings/change-email",
  },
  {
    title: "Security",
    description: "Manage login sessions and security settings.",
    icon: <FaShieldAlt />,
    path: "/settings/security",
  },

   {
    title: "Website Settings",
    description:
      "Manage Hero, About, Projects, Footer and Website content.",
    icon: <FaGlobe />,
    path: "/settings/website",
  },

];

export default function Settings() {
  return (
    <AdminLayout>
      <div className="settings-page">

        <div className="settings-header">
          <h2>Settings</h2>

          <p>
            Manage your account preferences and security.
          </p>
        </div>

        <div className="settings-grid">

          {settings.map((item) => (

            <Link
              to={item.path}
              className="settings-card"
              key={item.title}
            >

              <div className="settings-icon">
                {item.icon}
              </div>

              <div className="settings-content">

                <h4>{item.title}</h4>

                <p>{item.description}</p>

              </div>

              <FaChevronRight className="settings-arrow" />

            </Link>

          ))}

        </div>

      </div>
    </AdminLayout>
  );
}