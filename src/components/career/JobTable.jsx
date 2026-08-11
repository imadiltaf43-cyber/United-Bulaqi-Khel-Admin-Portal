import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaUsers,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStar,
} from "react-icons/fa";

export default function JobTable({ jobs, onDelete }) {
  if (!jobs.length) {
    return (
      <div className="empty-state">
        <h3>No Jobs Found</h3>
        <p>Create your first job posting.</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">

      <table className="job-table">

        <thead>

          <tr>

            <th>Job</th>

            <th>Department</th>

            <th>Location</th>

            <th>Deadline</th>

            <th>Applications</th>

            <th>Status</th>

            <th>Featured</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {jobs.map((job) => (

            <tr key={job._id}>

              {/* Job */}

              <td>

                <div className="job-cell">

                  <img
                    src={
                      job.jobImage ||
                      "/images/no-image.png"
                    }
                    alt={job.title}
                  />

                  <div>

                    <h4>{job.title}</h4>

                    <small>{job.employmentType}</small>

                  </div>

                </div>

              </td>

              {/* Department */}

              <td>

                {job.department}

              </td>

              {/* Location */}

              <td>

                <span className="location">

                  <FaMapMarkerAlt />

                  {job.location}

                </span>

              </td>

              {/* Deadline */}

              <td>

                <span className="deadline">

                  <FaCalendarAlt />

                  {new Date(
                    job.deadline
                  ).toLocaleDateString()}

                </span>

                {!job.expired && (

                  <small>

                    {job.remainingDays} days left

                  </small>

                )}

              </td>

              {/* Applications */}

              <td>

                <span className="application-count">

                  {job.totalApplications}

                </span>

              </td>

              {/* Status */}

              <td>

                {job.expired ? (

                  <span className="status expired">

                    Expired

                  </span>

                ) : job.isActive ? (

                  <span className="status active">

                    Active

                  </span>

                ) : (

                  <span className="status inactive">

                    Inactive

                  </span>

                )}

              </td>

              {/* Featured */}

              <td>

                {job.featured ? (

                  <span className="featured">

                    <FaStar />

                  </span>

                ) : (

                  "-"

                )}

              </td>

              {/* Actions */}

              <td>

                <div className="action-buttons">

                  <Link
                    to={`/careers/edit/${job._id}`}
                    className="btn-action edit"
                    title="Edit"
                  >
                    <FaEdit />
                  </Link>

                  <Link
                    to={`/careers/applications?jobId=${job._id}`}
                    className="btn-action applicants"
                    title="Applications"
                  >
                    <FaUsers />
                  </Link>

                  <button
                    className="btn-action delete"
                    title="Delete"
                    onClick={() =>
                      onDelete(job._id)
                    }
                  >
                    <FaTrash />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}