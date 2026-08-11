import "./Sidebar.css";

import { NavLink, useNavigate } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";


import {
  FaBars,
  FaAngleLeft,
  FaSignOutAlt,
} from "react-icons/fa";



import logo from "../../assets/images/UBKE.jpg";

import menuItems from "../../config/menuItems";

export default function Sidebar({
    collapsed,
    setCollapsed,
    mobileMenu,
    setMobileMenu,
}) {

  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (

    <aside
                className={`
            sidebar
            ${collapsed ? "collapsed" : ""}
            ${mobileMenu ? "show" : ""}
            `}
    >

      {/* Header */}

      <div className="sidebar-header">

        <img
          src={logo}
          alt="UBKE"
          className="sidebar-logo"
        />

        {!collapsed && (

          <div className="sidebar-company">

            <h3>UNITED BULAQI KHEL</h3>

            <span>ENTERPRISES</span>

          </div>

        )}

      </div>

      {/* Collapse */}

      <button
        className="collapse-btn"
        onClick={() => setCollapsed(!collapsed)}
      >

        {collapsed ? <FaBars /> : <FaAngleLeft />}

      </button>

      {/* Navigation */}

      <nav className="sidebar-menu">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (

            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenu(false)}
              className={({ isActive }) =>
                isActive
                  ? "menu-item active"
                  : "menu-item"
              }
            >

              <Icon className="menu-icon" />

              {!collapsed && (

                <span>{item.title}</span>

              )}

            </NavLink>

          );

        })}

      </nav>

      {/* Footer */}

      <div className="sidebar-footer">

        <button
          className="logout-btn"
          onClick={handleLogout}
        >

          <FaSignOutAlt />

          {!collapsed && (

            <span>Logout</span>

          )}

        </button>

      </div>

    </aside>

  );

}