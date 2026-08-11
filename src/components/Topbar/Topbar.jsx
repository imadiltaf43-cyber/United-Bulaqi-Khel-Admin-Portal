import "./Topbar.css";

import { useState, useMemo } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  FaBars,
  FaArrowLeft,
  FaSearch,
  FaUserCircle,
  FaChevronDown,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";

export default function Topbar({
  collapsed,
  setCollapsed,
  mobileMenu,
  setMobileMenu,
}) {

  const navigate = useNavigate();
  const location = useLocation();
  const { logout: logoutAuth } = useAuth();

  const savedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const user = savedUser;

  const [showMenu, setShowMenu] = useState(false);

  const [search, setSearch] = useState("");

  const pageTitle = useMemo(() => {

    const parts = location.pathname
      .split("/")
      .filter(Boolean);

    if (!parts.length) return "Dashboard";

    return parts[parts.length - 1]
      .replace(/-/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());

  }, [location]);

  const breadcrumb = useMemo(() => {

    return location.pathname
      .split("/")
      .filter(Boolean);

  }, [location]);

  const handleSearch = (e) => {

    if (e.key !== "Enter") return;

    const value = search.toLowerCase().trim();

    if (!value) return;

    const routes = {

      dashboard: "/dashboard",

      minerals: "/minerals",

      settings: "/settings",

      profile: "/settings/profile",

      password: "/settings/change-password",

      email: "/settings/change-email",

      security: "/settings/security",

      employees: "/employees",

      equipment: "/equipment",

      projects: "/projects",

      investors: "/investors",

      careers: "/careers",

      messages: "/messages",

    };

    const found = Object.keys(routes).find(key =>
      key.includes(value)
    );

    if (found) {

      navigate(routes[found]);

    }

  };

  const logout = () => {
    logoutAuth();
    navigate("/login", { replace: true });
  };

  return (

    <header className="topbar">

      <div className="topbar-left">

        <button

          className="icon-btn"

          onClick={() => {

            if (window.innerWidth <= 992) {

              setMobileMenu(!mobileMenu);

            } else {

              setCollapsed(!collapsed);

            }

          }}

        >

          <FaBars />

        </button>

        <button

          className="icon-btn"

          onClick={() => navigate(-1)}

        >

          <FaArrowLeft />

        </button>

        <div className="page-info">

          <h2>{pageTitle}</h2>

          <p>

            {

              breadcrumb.length

                ? breadcrumb.join(" / ")

                : "Dashboard"

            }

          </p>

        </div>

      </div>

      <div className="topbar-search">

        <FaSearch />

        <input

          value={search}

          onChange={(e) =>

            setSearch(e.target.value)

          }

          onKeyDown={handleSearch}

          placeholder="Search pages..."

        />

      </div>

      <div className="topbar-right">

        <div

          className="profile"

          onClick={() =>

            setShowMenu(!showMenu)

          }

        >

          {

            user.profileImage ?

              <img

                src={user.profileImage}

                alt="profile"

              />

              :

              <FaUserCircle className="default-avatar"/>

          }

          <div>

            <h4>

              {

                user.fullName ||

                "Super Admin"

              }

            </h4>

            <span>

              {

                user.role ||

                "Administrator"

              }

            </span>

          </div>

          <FaChevronDown />

        </div>

        {

          showMenu && (

            <div className="profile-menu">

              <button

                onClick={() => {

                  navigate("/settings/profile");

                  setShowMenu(false);

                }}

              >

                <FaUserCircle />

                My Profile

              </button>

              <button

                onClick={() => {

                  navigate("/settings");

                  setShowMenu(false);

                }}

              >

                <FaCog />

                Settings

              </button>

              <button

                onClick={logout}

              >

                <FaSignOutAlt />

                Logout

              </button>

            </div>

          )

        }

      </div>

    </header>

  );

}