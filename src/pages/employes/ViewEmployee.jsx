import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import { getEmployee } from "../../services/employeeService";

import { toast } from "../../utils/toast";

import {
  FaArrowLeft,
  FaEdit,
  FaUser,
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSitemap,
  FaEnvelope,
  FaPhone,
  FaIdCard,
} from "react-icons/fa";

import "./Employees.css";

export default function ViewEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEmployee();
  }, [id]);

  const loadEmployee = async () => {
    try {
      setLoading(true);

      const data = await getEmployee(id);

      setEmployee(data);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to load employee."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="employee-view-page">
          <div className="employee-view-card">
            <div className="employee-loading">
              Loading employee...
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!employee) {
    return (
      <AdminLayout>
        <div className="employee-view-page">
          <div className="employee-view-card">
            <h2>Employee Not Found</h2>

            <button
              className="btn btn-secondary"
              onClick={() => navigate("/employees")}
            >
              <FaArrowLeft />
              Back to Employees
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const isManagingDirector =
    employee.isManagingDirector ||
    employee.designation
      ?.toLowerCase()
      .includes("managing director");

  return (
    <AdminLayout>
      <div className="employee-view-page">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div className="employee-view-header">

          <div>
            <button
              className="employee-back-btn"
              onClick={() => navigate("/employees")}
            >
              <FaArrowLeft />
              Back to Employees
            </button>

            <h2>
              Employee Details
            </h2>

            <p>
              View employee information and
              organizational placement.
            </p>
          </div>

          <button
            className="employee-edit-btn"
            onClick={() =>
              navigate(
                `/employees/edit/${employee._id}`
              )
            }
          >
            <FaEdit />
            Edit Employee
          </button>

        </div>

        {/* ================================= */}
        {/* PROFILE */}
        {/* ================================= */}

        <div className="employee-profile-card">

          <div className="employee-profile-left">

            <div className="employee-large-avatar">

              {employee.profileImage ? (

                <img
                  src={employee.profileImage}
                  alt={employee.fullName}
                />

              ) : (

                <FaUser />

              )}

            </div>

            <h2>
              {employee.fullName}
            </h2>

            <span className="employee-designation">
              {employee.designation}
            </span>

            <span
              className={
                employee.status === "Active"
                  ? "badge active"
                  : "badge inactive"
              }
            >
              {employee.status}
            </span>

            <div className="employee-id">
              {employee.employeeId}
            </div>

          </div>

          {/* ================================= */}
          {/* BASIC INFORMATION */}
          {/* ================================= */}

          <div className="employee-profile-right">

            <div className="employee-info-grid">

              <InfoItem
                icon={<FaEnvelope />}
                label="Email"
                value={
                  employee.email || "Not provided"
                }
              />

              <InfoItem
                icon={<FaPhone />}
                label="Phone"
                value={
                  employee.phone || "Not provided"
                }
              />

              <InfoItem
                icon={<FaIdCard />}
                label="CNIC"
                value={
                  employee.cnic || "Not provided"
                }
              />

              <InfoItem
                icon={<FaBuilding />}
                label="Office"
                value={
                  employee.office || "Not provided"
                }
              />

              <InfoItem
                icon={<FaBriefcase />}
                label="Department"
                value={
                  employee.department ||
                  "Not assigned"
                }
              />

              <InfoItem
                icon={<FaSitemap />}
                label="Section"
                value={
                  employee.section ||
                  "Not assigned"
                }
              />

              <InfoItem
                icon={<FaCalendarAlt />}
                label="Joining Date"
                value={
                  employee.joiningDate
                    ? new Date(
                        employee.joiningDate
                      ).toLocaleDateString()
                    : "Not provided"
                }
              />

              <InfoItem
                icon={<FaMapMarkerAlt />}
                label="Address"
                value={
                  employee.address ||
                  "Not provided"
                }
              />

            </div>

          </div>

        </div>

        {/* ================================= */}
        {/* ORGANIZATIONAL POSITION */}
        {/* ================================= */}

        <div className="employee-details-section">

          <div className="employee-section-title">

            <FaSitemap />

            <h3>
              Organizational Position
            </h3>

          </div>

          <div className="employee-hierarchy-info">

            <div className="hierarchy-item">

              <span>
                Category
              </span>

              <strong>
                {employee.employeeType ||
                  "Department"}
              </strong>

            </div>

            <div className="hierarchy-item">

              <span>
                Section
              </span>

              <strong>
                {employee.section ||
                  employee.department ||
                  "Not assigned"}
              </strong>

            </div>

            <div className="hierarchy-item">

              <span>
                Designation
              </span>

              <strong>
                {employee.designation}
              </strong>

            </div>

            <div className="hierarchy-item">

              <span>
                Display Order
              </span>

              <strong>
                {employee.order ?? 0}
              </strong>

            </div>

          </div>

        </div>

        {/* ================================= */}
        {/* REPORTING RELATIONSHIP */}
        {/* ================================= */}

        <div className="employee-details-section">

          <div className="employee-section-title">

            <FaSitemap />

            <h3>
              Reporting Relationship
            </h3>

          </div>

          {isManagingDirector ? (

            <div className="director-root-message">

              <div className="hierarchy-root-icon">
                <FaSitemap />
              </div>

              <div>
                <strong>
                  Managing Director
                </strong>

                <p>
                  This employee is at the top
                  of the organizational hierarchy.
                </p>
              </div>

            </div>

          ) : employee.reportsTo ? (

            <div className="reports-to-card">

              <div className="reports-to-avatar">

                {employee.reportsTo.profileImage ? (

                  <img
                    src={
                      employee.reportsTo.profileImage
                    }
                    alt={
                      employee.reportsTo.fullName
                    }
                  />

                ) : (

                  <FaUser />

                )}

              </div>

              <div>

                <span>
                  Reports To
                </span>

                <strong>
                  {employee.reportsTo.fullName}
                </strong>

                <p>
                  {employee.reportsTo.designation}
                </p>

              </div>

            </div>

          ) : (

            <div className="no-reporting">

              <FaSitemap />

              <span>
                No reporting relationship
                assigned.
              </span>

            </div>

          )}

        </div>

        {/* ================================= */}
        {/* MESSAGE / BIO */}
        {/* ================================= */}

        <div className="employee-details-section">

          <div className="employee-section-title">

            <FaUser />

            <h3>
              Message / Bio
            </h3>

          </div>

          {employee.message ? (

            <div className="employee-message">

              <p>
                {employee.message}
              </p>

            </div>

          ) : (

            <div className="empty-message">
              No message or bio has been
              provided.
            </div>

          )}

        </div>

        {/* ================================= */}
        {/* ADDRESS */}
        {/* ================================= */}

        {employee.address && (

          <div className="employee-details-section">

            <div className="employee-section-title">

              <FaMapMarkerAlt />

              <h3>
                Address
              </h3>

            </div>

            <div className="employee-address">

              {employee.address}

            </div>

          </div>

        )}

      </div>
    </AdminLayout>
  );
}


/* =====================================
   Reusable Information Item
===================================== */

function InfoItem({
  icon,
  label,
  value,
}) {
  return (
    <div className="employee-info-item">

      <div className="employee-info-icon">
        {icon}
      </div>

      <div className="employee-info-content">

        <span>
          {label}
        </span>

        <strong>
          {value}
        </strong>

      </div>

    </div>
  );
}