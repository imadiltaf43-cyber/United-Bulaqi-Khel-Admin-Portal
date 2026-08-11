import {
  FaMountain,
  FaProjectDiagram,
  FaUsers,
  FaHammer,
  FaEnvelope,
  FaEye,
} from "react-icons/fa";

import "./DashboardCards.css";

export default function DashboardCards({ statistics }) {

  const cards = [

    {
      title: "Total Minerals",
      value: statistics?.totalMinerals || 0,
      icon: <FaMountain />,
      color: "#C9A227",
    },

    {
      title: "Total Projects",
      value: statistics?.totalProjects || 0,
      icon: <FaProjectDiagram />,
      color: "#1E4D3B",
    },

    {
      title: "Employees",
      value: statistics?.totalEmployees || 0,
      icon: <FaUsers />,
      color: "#0D6EFD",
    },

    {
      title: "Active Projects",
      value: statistics?.activeProjects || 0,
      icon: <FaHammer />,
      color: "#198754",
    },

    {
      title: "Messages",
      value: statistics?.totalMessages || 0,
      icon: <FaEnvelope />,
      color: "#DC3545",
    },

    {
      title: "Visitors",
      value: statistics?.totalVisitors || 0,
      icon: <FaEye />,
      color: "#6F42C1",
    },

  ];

  return (

    <div className="dashboard-cards">

      {

        cards.map((card, index) => (

          <div
            className="dashboard-card"
            key={index}
          >

            <div
              className="dashboard-icon"
              style={{
                background: card.color,
              }}
            >

              {card.icon}

            </div>

            <div className="dashboard-info">

              <h2>{card.value}</h2>

              <p>{card.title}</p>

            </div>

          </div>

        ))

      }

    </div>

  );

}