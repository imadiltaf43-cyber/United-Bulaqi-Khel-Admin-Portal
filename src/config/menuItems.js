import {
  FaTachometerAlt,
  FaMountain,
  FaProjectDiagram,
  FaTruckMonster,
  FaUsers,
  FaChartLine,
  FaBriefcase,
  FaEnvelope,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";

const menuItems = [
  {
    title: "Dashboard",
    icon: FaTachometerAlt,
    path: "/dashboard",
  },
  {
    title: "Minerals",
    icon: FaMountain,
    path: "/minerals",
  },
  {
    title: "Projects",
    icon: FaProjectDiagram,
    path: "/projects",
  },
  {
    title: "Equipment",
    icon: FaTruckMonster,
    path: "/equipment",
  },
  {
    title: "Employees",
    icon: FaUsers,
    path: "/employees",
  },
  {
    title: "Investors",
    icon: FaChartLine,
    path: "/investors",
  },
  {
    title: "Careers",
    icon: FaBriefcase,
    path: "/careers",
  },
  {
    title: "Applications",
    icon: FaBriefcase,
    path: "/careers/applications",
  },
  {
    title: "Messages",
    icon: FaEnvelope,
    path: "/messages",
  },
  {
    title: "Settings",
    icon: FaCog,
    path: "/settings",
  },

  {
    title: "My Profile",
    path: "/settings/profile",
    icon: FaUserCircle,
},
];

export default menuItems;