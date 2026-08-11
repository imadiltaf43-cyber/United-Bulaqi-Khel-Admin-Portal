import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "../../utils/toast";

import AdminLayout from "../../layouts/AdminLayout";

import Swal from "sweetalert2";

import {
  getEmployees,
  deleteEmployee,
} from "../../services/employeeService";

import {
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import "./Employees.css";

export default function Employees() {

  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const [pages, setPages] = useState(1);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [department, setDepartment] = useState("");

  useEffect(() => {
    loadEmployees();
  }, [page, search, status, department]);

  const loadEmployees = async () => {

    try {

      setLoading(true);

      const data = await getEmployees(
        page,
        search,
        status,
        department
      );

      setEmployees(data.employees);

      setPages(data.pages);

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Failed to load employees."
      );

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    const result = await Swal.fire({

      title: "Delete Employee?",

      text: "This action cannot be undone.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#d33",

      cancelButtonColor: "#6c757d",

      confirmButtonText: "Delete",

    });

    if (!result.isConfirmed) return;

    try {

      await deleteEmployee(id);

      toast.success("Employee deleted successfully.");

      loadEmployees();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Delete failed."
      );

    }

  };

  return (

    <AdminLayout>

      <div className="employees-page">

        <div className="employees-header">

          <div>

            <h2>Employees</h2>

            <p>
              Manage company employees.
            </p>

          </div>

          <button
            className="add-btn"
            onClick={() =>
              navigate("/employees/add")
            }
          >

            <FaPlus />

            Add Employee

          </button>

        </div>

        <div className="employee-filters">

          <div className="search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search employee..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <select
            value={department}
            onChange={(e) =>
              setDepartment(e.target.value)
            }
          >

            <option value="">
              All Departments
            </option>

            <option value="Mining">
              Mining
            </option>

            <option value="HR">
              HR
            </option>

            <option value="Finance">
              Finance
            </option>

            <option value="Operations">
              Operations
            </option>

          </select>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

            <option value="">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </select>

        </div>

        <div className="employee-table">

          <table>

            <thead>

              <tr>

                <th>Photo</th>

                <th>ID</th>

                <th>Name</th>

                <th>Department</th>

                <th>Designation</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td colSpan="7">

                    Loading...

                  </td>

                </tr>

              ) : employees.length === 0 ? (

                <tr>

                  <td colSpan="7">

                    No Employees Found

                  </td>

                </tr>

              ) : (

                employees.map((emp) => (

                  <tr key={emp._id}>

                    <td>

                      <img
                        src={
                          emp.profileImage ||
                          "/avatar.png"
                        }
                        alt=""
                        className="employee-avatar"
                      />

                    </td>

                    <td>{emp.employeeId}</td>

                    <td>{emp.fullName}</td>

                    <td>{emp.department}</td>

                    <td>{emp.designation}</td>

                    <td>

                      <span
                        className={
                          emp.status === "Active"
                            ? "badge active"
                            : "badge inactive"
                        }
                      >

                        {emp.status}

                      </span>

                    </td>

                    <td>

                      <button
                        className="view-btn"
                        onClick={() =>
                          navigate(
                            `/employees/view/${emp._id}`
                          )
                        }
                      >

                        <FaEye />

                      </button>

                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(
                            `/employees/edit/${emp._id}`
                          )
                        }
                      >

                        <FaEdit />

                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(emp._id)
                        }
                      >

                        <FaTrash />

                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        <div className="pagination">

          <button
            disabled={page === 1}
            onClick={() =>
              setPage(page - 1)
            }
          >

            Previous

          </button>

          <span>

            Page {page} of {pages}

          </span>

          <button
            disabled={page === pages}
            onClick={() =>
              setPage(page + 1)
            }
          >

            Next

          </button>

        </div>

      </div>

    </AdminLayout>

  );

}