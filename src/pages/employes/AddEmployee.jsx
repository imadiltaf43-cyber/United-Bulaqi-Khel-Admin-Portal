import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {
  createEmployee,
  getEmployees,
} from "../../services/employeeService";

import { toast } from "../../utils/toast";

import "./Employees.css";

export default function AddEmployee() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    cnic: "",

    employeeType: "Department",
    section: "",
    department: "",
    designation: "",

    joiningDate: "",
    address: "",
    status: "Active",

    office: "Head Office",

    reportsTo: "",
    isManagingDirector: false,

    message: "",
    order: 0,

    profileImage: null,
  });

  // =====================================
  // Load Employees For "Reports To"
  // =====================================

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await getEmployees(
          1,
          "",
          "Active",
          "",
          ""
        );

        setEmployees(data.employees || []);
      } catch (err) {
        console.error("Failed to load employees:", err);
      }
    };

    loadEmployees();
  }, []);

  // =====================================
  // Handle Input
  // =====================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================
  // Handle Employee Type
  // =====================================

  const handleEmployeeType = (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,

      employeeType: value,

      section: "",
      department: "",
      reportsTo: "",

      isManagingDirector:
        value === "Management"
          ? prev.isManagingDirector
          : false,
    }));
  };

  // =====================================
  // Handle Managing Director
  // =====================================

  const handleManagingDirector = (e) => {
    const checked = e.target.checked;

    setForm((prev) => ({
      ...prev,
      isManagingDirector: checked,

      designation: checked
        ? "Managing Director"
        : prev.designation,
    }));
  };

  // =====================================
  // Handle Image
  // =====================================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      profileImage: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  // =====================================
  // Submit
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key === "profileImage") {
          if (form.profileImage) {
            formData.append(
              "profileImage",
              form.profileImage
            );
          }
        } else if (key === "isManagingDirector") {
          formData.append(
            key,
            form.isManagingDirector
          );
        } else {
          formData.append(
            key,
            form[key] ?? ""
          );
        }
      });

      await createEmployee(formData);

      toast.success(
        "Employee added successfully."
      );

      navigate("/employees");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to add employee."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Filter Possible Managers
  // =====================================

  const reportingEmployees = employees.filter(
    (employee) =>
      employee._id &&
      employee._id !== form.reportsTo
  );

  return (
    <AdminLayout>
      <div className="employee-form-page">

        <div className="employee-form-card">

          <h2>Add Employee</h2>

          <p>
            Create a new employee and assign their
            organizational position.
          </p>

          <form onSubmit={handleSubmit}>

            {/* ================================= */}
            {/* PERSONAL INFORMATION */}
            {/* ================================= */}

            <div className="employee-form-section">

              <h4>
                Personal Information
              </h4>

              <div className="row">

                <div className="col-md-6 mb-3">
                  <label>
                    Full Name
                  </label>

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
                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>
                    Phone
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <label>
                    CNIC
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="cnic"
                    value={form.cnic}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </div>

            {/* ================================= */}
            {/* ORGANIZATIONAL PLACEMENT */}
            {/* ================================= */}

            <div className="employee-form-section">

              <h4>
                Organizational Placement
              </h4>

              <div className="row">

                {/* Employee Type */}

                <div className="col-md-6 mb-3">

                  <label>
                    Where does this employee
                    belong?
                  </label>

                  <select
                    className="form-select"
                    value={form.employeeType}
                    onChange={handleEmployeeType}
                    required
                  >

                    <option value="Management">
                      Management
                    </option>

                    <option value="Department">
                      Departmental Team
                    </option>

                    <option value="Danin Chitral">
                      Danin Chitral
                    </option>

                    <option value="Dara Adam Khel">
                      Dara Adam Khel
                    </option>

                  </select>

                </div>

                {/* Section */}

                <div className="col-md-6 mb-3">

                  <label>
                    Section
                  </label>

                  {form.employeeType ===
                  "Management" ? (

                    <select
                      className="form-select"
                      name="section"
                      value={form.section}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select Section
                      </option>

                      <option value="Board of Directors">
                        Board of Directors
                      </option>

                      <option value="General Management">
                        General Management
                      </option>

                      <option value="Administration">
                        Administration
                      </option>

                    </select>

                  ) : form.employeeType ===
                    "Department" ? (

                    <select
                      className="form-select"
                      name="section"
                      value={form.section}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select Department
                      </option>

                      <option value="Mining">
                        Mining
                      </option>

                      <option value="Operations">
                        Operations
                      </option>

                      <option value="Finance">
                        Finance
                      </option>

                      <option value="HR">
                        HR
                      </option>

                      <option value="Audit">
                        Audit
                      </option>

                      <option value="Purchase">
                        Purchase
                      </option>

                      <option value="Sales">
                        Sales
                      </option>

                      <option value="Safety & Security">
                        Safety & Security
                      </option>

                      <option value="Administration">
                        Administration
                      </option>

                    </select>

                  ) : form.employeeType ===
                    "Danin Chitral" ? (

                    <select
                      className="form-select"
                      name="section"
                      value={form.section}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select Section
                      </option>

                      <option value="Project Management">
                        Project Management
                      </option>

                      <option value="Mining Operations">
                        Mining Operations
                      </option>

                      <option value="Operations">
                        Operations
                      </option>

                      <option value="Supervisors">
                        Supervisors
                      </option>

                      <option value="Camp">
                        Camp
                      </option>

                      <option value="Accounts">
                        Accounts
                      </option>

                      <option value="Geology">
                        Geology
                      </option>

                      <option value="Field Staff">
                        Field Staff
                      </option>

                    </select>

                  ) : (

                    <select
                      className="form-select"
                      name="section"
                      value={form.section}
                      onChange={handleChange}
                    >

                      <option value="">
                        Select Section
                      </option>

                      <option value="Management">
                        Management
                      </option>

                      <option value="Operations">
                        Operations
                      </option>

                      <option value="Accounts">
                        Accounts
                      </option>

                      <option value="Administration">
                        Administration
                      </option>

                      <option value="Field Staff">
                        Field Staff
                      </option>

                    </select>

                  )}

                </div>

                {/* Department */}

                <div className="col-md-6 mb-3">

                  <label>
                    Department
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="Optional"
                  />

                </div>

                {/* Designation */}

                <div className="col-md-6 mb-3">

                  <label>
                    Designation
                  </label>

                  <input
                    type="text"
                    className="form-control"
                    name="designation"
                    value={form.designation}
                    onChange={handleChange}
                    disabled={
                      form.isManagingDirector
                    }
                    required
                  />

                </div>

                {/* Managing Director */}

                {form.employeeType ===
                  "Management" && (

                  <div className="col-12 mb-3">

                    <div className="form-check">

                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="managingDirector"
                        checked={
                          form.isManagingDirector
                        }
                        onChange={
                          handleManagingDirector
                        }
                      />

                      <label
                        className="form-check-label"
                        htmlFor="managingDirector"
                      >
                        This employee is the
                        Managing Director
                      </label>

                    </div>

                  </div>

                )}

                {/* Reports To */}

                {!form.isManagingDirector && (

                  <div className="col-md-6 mb-3">

                    <label>
                      Reports To
                    </label>

                    <select
                      className="form-select"
                      name="reportsTo"
                      value={form.reportsTo}
                      onChange={handleChange}
                    >

                      <option value="">
                        None
                      </option>

                      {reportingEmployees.map(
                        (employee) => (

                          <option
                            key={employee._id}
                            value={employee._id}
                          >
                            {employee.fullName}
                            {" - "}
                            {employee.designation}
                          </option>

                        )
                      )}

                    </select>

                  </div>

                )}

                {/* Order */}

                <div className="col-md-6 mb-3">

                  <label>
                    Display Order
                  </label>

                  <input
                    type="number"
                    className="form-control"
                    name="order"
                    value={form.order}
                    onChange={handleChange}
                    min="0"
                  />

                  <small className="text-muted">
                    Lower numbers appear first.
                  </small>

                </div>

              </div>

            </div>

            {/* ================================= */}
            {/* LOCATION & EMPLOYMENT */}
            {/* ================================= */}

            <div className="employee-form-section">

              <h4>
                Employment Information
              </h4>

              <div className="row">

                <div className="col-md-6 mb-3">

                  <label>
                    Joining Date
                  </label>

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

                  <label>
                    Status
                  </label>

                  <select
                    className="form-select"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

                </div>

                <div className="col-md-6 mb-3">

                  <label>
                    Office
                  </label>

                  <select
                    className="form-select"
                    name="office"
                    value={form.office}
                    onChange={handleChange}
                  >

                    <option value="Head Office">
                      Head Office
                    </option>

                    <option value="Chitral">
                      Chitral
                    </option>

                    <option value="Darra">
                      Darra
                    </option>

                    <option value="Other">
                      Other
                    </option>

                  </select>

                </div>

                <div className="col-md-6 mb-3">

                  <label>
                    Profile Image
                  </label>

                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImage}
                  />

                </div>

                <div className="col-12 mb-3">

                  <label>
                    Address
                  </label>

                  <textarea
                    className="form-control"
                    rows="3"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                  />

                </div>

              </div>

            </div>

            {/* ================================= */}
            {/* MESSAGE / BIO */}
            {/* ================================= */}

            <div className="employee-form-section">

              <h4>
                Message / Bio
              </h4>

              <textarea
                className="form-control"
                rows="5"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={
                  form.isManagingDirector
                    ? "Director's message..."
                    : "Optional employee message or bio..."
                }
              />

            </div>

            {/* ================================= */}
            {/* IMAGE PREVIEW */}
            {/* ================================= */}

            <div className="employee-image-preview">

              {preview ? (

                <img
                  src={preview}
                  alt="Preview"
                  className="employee-preview"
                />

              ) : (

                <div className="employee-placeholder">
                  Image Preview
                </div>

              )}

            </div>

            {/* ================================= */}
            {/* ACTIONS */}
            {/* ================================= */}

            <div className="employee-form-actions">

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-warning"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : "Save Employee"}
              </button>

            </div>

          </form>

        </div>

      </div>
    </AdminLayout>
  );
}