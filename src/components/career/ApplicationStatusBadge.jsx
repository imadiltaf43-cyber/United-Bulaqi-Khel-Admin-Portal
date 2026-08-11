import React from "react";

export default function ApplicationStatusBadge({ status }) {
  const getBadgeClass = () => {
    switch (status) {
      case "Pending":
        return "bg-warning text-dark";

      case "Shortlisted":
        return "bg-primary";

      case "Interview":
        return "bg-info text-dark";

      case "Hired":
        return "bg-success";

      case "Rejected":
        return "bg-danger";

      default:
        return "bg-secondary";
    }
  };

  const getIcon = () => {
    switch (status) {
      case "Pending":
        return "🕒";

      case "Shortlisted":
        return "⭐";

      case "Interview":
        return "🎤";

      case "Hired":
        return "✅";

      case "Rejected":
        return "❌";

      default:
        return "•";
    }
  };

  return (
    <span
      className={`badge rounded-pill px-3 py-2 fw-semibold ${getBadgeClass()}`}
    >
      <span className="me-1">{getIcon()}</span>

      {status}
    </span>
  );
}