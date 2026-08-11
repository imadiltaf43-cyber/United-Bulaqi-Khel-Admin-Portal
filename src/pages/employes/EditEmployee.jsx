import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getEmployee,
  updateEmployee,
} from "../../services/employeeService";

import { toast } from "../../utils/toast";

import "./Employees.css";

export default function EditEmployee() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    cnic: "",
    department: "",
    designation: "",
    joiningDate: "",
    address: "",
    status: "Active",
    profileImage: null,
  });

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {

    try {

      const data = await getEmployee(id);

      setForm({
        fullName: data.fullName || "",
        email: data.email || "",
        phone: data.phone || "",
        cnic: data.cnic || "",
        department: data.department || "",
        designation: data.designation || "",
        joiningDate: data.joiningDate
          ? data.joiningDate.substring(0, 10)
          : "",
        address: data.address || "",
        status: data.status || "Active",
        profileImage: null,
      });

      setPreview(data.profileImage);

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Failed to load employee."
      );

    }

  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      profileImage: file,
    }));

    setPreview(URL.createObjectURL(file));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {

        if (
          key !== "profileImage" ||
          form.profileImage
        ) {
          formData.append(key, form[key]);
        }

      });

      await updateEmployee(id, formData);

      toast.success("Employee updated successfully.");

      navigate("/employees");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Failed to update employee."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <AdminLayout>

      <div className="employee-form-page">

        <div className="employee-form-card">

          <h2>Edit Employee</h2>

          <p>Update employee information.</p>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label>Full Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>Email</label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>Phone</label>

                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>CNIC</label>

                <input
                  type="text"
                  className="form-control"
                  name="cnic"
                  value={form.cnic}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>Department</label>

                <select
                  className="form-select"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  required
                >

                  <option value="">Select</option>
                  <option>Mining</option>
                  <option>HR</option>
                  <option>Finance</option>
                  <option>Operations</option>
                  <option>Safety</option>
                  <option>Administration</option>

                </select>

              </div>

              <div className="col-md-6 mb-3">

                <label>Designation</label>

                <input
                  type="text"
                  className="form-control"
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>Joining Date</label>

                <input
                  type="date"
                  className="form-control"
                  name="joiningDate"
                  value={form.joiningDate}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>Status</label>

                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >

                  <option>Active</option>
                  <option>Inactive</option>

                </select>

              </div>

              <div className="col-12 mb-3">

                <label>Address</label>

                <textarea
                  rows="3"
                  className="form-control"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-6 mb-4">

                <label>Profile Image</label>

                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImage}
                />

              </div>

              <div className="col-md-6 mb-4 d-flex justify-content-center align-items-center">

                {preview ? (

                  <img
                    src={preview}
                    alt=""
                    className="employee-preview"
                  />

                ) : (

                  <div className="employee-placeholder">

                    No Image

                  </div>

                )}

              </div>

            </div>

            <div className="employee-form-actions">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >

                Cancel

              </button>

              <button
                className="btn btn-warning"
                disabled={loading}
              >

                {loading
                  ? "Updating..."
                  : "Update Employee"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </AdminLayout>

  );

}