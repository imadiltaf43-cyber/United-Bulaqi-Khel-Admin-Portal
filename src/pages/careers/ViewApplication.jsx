import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaDownload,
  FaUserTie,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCalendarAlt,
} from "react-icons/fa";

import {
  getApplication,
  updateApplicationStatus,
} from "../../services/jobService";

import AdminLayout from "../../layouts/AdminLayout";
import "../../styles/applications.css";

export default function ViewApplication() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [application, setApplication] = useState(null);

  const [loading, setLoading] = useState(true);

  //--------------------------------------------

  useEffect(() => {
    loadApplication();
  }, []);

  //--------------------------------------------

  const loadApplication = async () => {
    try {
      const data = await getApplication(id);

      setApplication(data);
    } catch (err) {
      console.error(err);

      alert("Unable to load application.");
    } finally {
      setLoading(false);
    }
  };

  //--------------------------------------------

  const changeStatus = async (status) => {
    try {
      await updateApplicationStatus(id, status);

      setApplication({
        ...application,
        status,
      });
    } catch (err) {
      console.error(err);

      alert("Unable to update status.");
    }
  };

  //--------------------------------------------

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-warning" />
      </div>
    );
  }

  //--------------------------------------------

  if (!application) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Application not found.
        </div>
      </div>
    );
  }

  //--------------------------------------------

  return (
    <AdminLayout>
    <div className="applications-page">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2>

            Applicant Details

          </h2>

          <p className="text-muted mb-0">

            Review application

          </p>

        </div>

        <button
          className="btn btn-outline-dark"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="me-2" />
          Back
        </button>

      </div>

      <div className="row">

        {/* Applicant */}

        <div className="col-lg-8">

          <div className="card shadow-sm border-0 mb-4">

            <div className="card-header bg-white">

              <h5 className="mb-0">

                Applicant Information

              </h5>

            </div>

            <div className="card-body">

              <div className="row g-4">

                <div className="col-md-6">

                  <strong>

                    <FaUserTie className="me-2 text-warning" />

                    Full Name

                  </strong>

                  <p>{application.fullName}</p>

                </div>

                <div className="col-md-6">

                  <strong>

                    <FaEnvelope className="me-2 text-warning" />

                    Email

                  </strong>

                  <p>{application.email}</p>

                </div>

                <div className="col-md-6">

                  <strong>

                    <FaPhone className="me-2 text-warning" />

                    Phone

                  </strong>

                  <p>{application.phone}</p>

                </div>

                <div className="col-md-6">

                  <strong>

                    <FaMapMarkerAlt className="me-2 text-warning" />

                    Address

                  </strong>

                  <p>

                    {application.address || "-"}

                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Cover Letter */}

          <div className="card shadow-sm border-0">

            <div className="card-header bg-white">

              <h5 className="mb-0">

                Cover Letter

              </h5>

            </div>

            <div className="card-body">

              <p className="mb-0">

                {application.coverLetter ||

                  "No cover letter provided."}

              </p>

            </div>

          </div>

        </div>

        {/* Sidebar */}

        <div className="col-lg-4">

          <div className="card shadow-sm border-0 mb-4">

            <div className="card-header bg-white">

              <h5 className="mb-0">

                Job Information

              </h5>

            </div>

            <div className="card-body">

              <p>

                <FaBriefcase className="me-2 text-warning" />

                <strong>

                  Job

                </strong>

              </p>

              <p>

                {application.job?.title}

              </p>

              <hr />

              <p>

                <FaCalendarAlt className="me-2 text-warning" />

                <strong>

                  Applied

                </strong>

              </p>

              <p>

                {new Date(
                  application.createdAt
                ).toLocaleDateString()}

              </p>

            </div>

          </div>

          {/* Status */}

          <div className="card shadow-sm border-0 mb-4">

            <div className="card-header bg-white">

              <h5 className="mb-0">

                Status

              </h5>

            </div>

            <div className="card-body">

              <select
                className="form-select"
                value={application.status}
                onChange={(e) =>
                  changeStatus(
                    e.target.value
                  )
                }
              >

                <option>

                  Pending

                </option>

                <option>

                  Shortlisted

                </option>

                <option>

                  Interview

                </option>

                <option>

                  Hired

                </option>

                <option>

                  Rejected

                </option>

              </select>

            </div>

          </div>

          {/* CV */}

          <div className="card shadow-sm border-0">

            <div className="card-header bg-white">

              <h5 className="mb-0">

                Resume

              </h5>

            </div>

            <div className="card-body text-center">

              {application.cv ? (

                <a
                  href={application.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-success"
                >
                  <FaDownload className="me-2" />

                  Download CV

                </a>

              ) : (

                <p>

                  No Resume Uploaded

                </p>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
    </AdminLayout>
  );
}