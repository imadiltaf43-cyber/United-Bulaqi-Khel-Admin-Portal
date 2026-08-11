import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import { getEmployee } from "../../services/employeeService";

import { toast } from "../../utils/toast";

import {
  FaArrowLeft,
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaBuilding,
  FaBriefcase,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./Employees.css";

export default function ViewEmployee() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {

    loadEmployee();

  }, []);

  const loadEmployee = async () => {

    try {

      const data = await getEmployee(id);

      setEmployee(data);

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Failed to load employee."
      );

    }

  };

  if (!employee) {

    return (

      <AdminLayout>

        <div className="text-center py-5">

          Loading...

        </div>

      </AdminLayout>

    );

  }

  return (

    <AdminLayout>

      <div className="employee-profile">

        <div className="employee-profile-card">

          <div className="employee-profile-top">

            <img

              src={
                employee.profileImage ||
                "/avatar.png"
              }

              alt={employee.fullName}

              className="employee-profile-image"

            />

            <div>

              <h2>{employee.fullName}</h2>

              <h5>{employee.designation}</h5>

              <span
                className={
                  employee.status === "Active"
                    ? "badge active"
                    : "badge inactive"
                }
              >

                {employee.status}

              </span>

            </div>

          </div>

          <div className="employee-details-grid">

            <div className="detail-item">

              <FaIdCard />

              <div>

                <label>Employee ID</label>

                <p>{employee.employeeId}</p>

              </div>

            </div>

            <div className="detail-item">

              <FaEnvelope />

              <div>

                <label>Email</label>

                <p>{employee.email || "-"}</p>

              </div>

            </div>

            <div className="detail-item">

              <FaPhone />

              <div>

                <label>Phone</label>

                <p>{employee.phone || "-"}</p>

              </div>

            </div>

            <div className="detail-item">

              <FaIdCard />

              <div>

                <label>CNIC</label>

                <p>{employee.cnic || "-"}</p>

              </div>

            </div>

            <div className="detail-item">

              <FaBuilding />

              <div>

                <label>Department</label>

                <p>{employee.department}</p>

              </div>

            </div>

            <div className="detail-item">

              <FaBriefcase />

              <div>

                <label>Designation</label>

                <p>{employee.designation}</p>

              </div>

            </div>

            <div className="detail-item">

              <FaCalendarAlt />

              <div>

                <label>Joining Date</label>

                <p>

                  {new Date(
                    employee.joiningDate
                  ).toLocaleDateString()}

                </p>

              </div>

            </div>

            <div className="detail-item">

              <FaMapMarkerAlt />

              <div>

                <label>Address</label>

                <p>{employee.address || "-"}</p>

              </div>

            </div>

          </div>

          <div className="employee-profile-actions">

            <button
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >

              <FaArrowLeft />

              Back

            </button>

            <button
              className="btn btn-warning"
              onClick={() =>
                navigate(`/employees/edit/${employee._id}`)
              }
            >

              <FaEdit />

              Edit Employee

            </button>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}