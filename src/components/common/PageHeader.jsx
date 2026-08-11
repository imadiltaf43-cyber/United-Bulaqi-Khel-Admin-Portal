import { Link } from "react-router-dom";

export default function PageHeader({
  title,
  subtitle,
  buttonText,
  buttonLink,
}) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2 className="fw-bold mb-1">{title}</h2>
        <p className="text-muted mb-0">{subtitle}</p>
      </div>

      {buttonText && (
        <Link
          to={buttonLink}
          className="btn btn-warning px-4 py-2 fw-semibold"
        >
          {buttonText}
        </Link>
      )}
    </div>
  );
}