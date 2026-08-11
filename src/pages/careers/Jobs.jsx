import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaBriefcase,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

import {
  getJobs,
  deleteJob,
} from "../../services/jobService";

import JobTable from "../../components/career/JobTable";
import AdminLayout from "../../layouts/AdminLayout";

import "../../styles/jobs.css";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("All");

  const [type, setType] = useState("All");

  const [page, setPage] = useState(1);

  const [pages, setPages] = useState(1);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const data = await getJobs({
        page,
        search,
        department:
          department === "All"
            ? undefined
            : department,
        type:
          type === "All"
            ? undefined
            : type,
      });

      setJobs(data.jobs || []);

      setPages(data.pages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [page, search, department, type]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(id);

      loadJobs();
    } catch (err) {
      console.error(err);

      alert("Failed to delete job.");
    }
  };

  const stats = useMemo(() => {
    const total = jobs.length;

    const active = jobs.filter(
      (j) => !j.expired && j.isActive
    ).length;

    const expired = jobs.filter(
      (j) => j.expired
    ).length;

    const inactive = jobs.filter(
      (j) => !j.isActive
    ).length;

    return {
      total,
      active,
      expired,
      inactive,
    };
  }, [jobs]);

  const departments = useMemo(() => {
    return [
      "All",
      ...new Set(
        jobs
          .map((job) => job.department)
          .filter(Boolean)
      ),
    ];
  }, [jobs]);

  return (
    <AdminLayout>
    <div className="jobs-page">

      {/* Header */}

      <div className="jobs-header">

        <div>

          <h1>Jobs Management</h1>

          <p>
            Create and manage career
            opportunities.
          </p>

        </div>

        <Link
          to="/careers/create"
          className="btn-primary"
        >
          <FaPlus />

          Create Job
        </Link>

      </div>

      {/* Statistics */}

      <div className="job-stats">

        <div className="stat-card">

          <FaBriefcase />

          <div>

            <h3>{stats.total}</h3>

            <span>Total Jobs</span>

          </div>

        </div>

        <div className="stat-card">

          <FaCheckCircle />

          <div>

            <h3>{stats.active}</h3>

            <span>Active Jobs</span>

          </div>

        </div>

        <div className="stat-card">

          <FaClock />

          <div>

            <h3>{stats.expired}</h3>

            <span>Expired</span>

          </div>

        </div>

        <div className="stat-card">

          <FaTimesCircle />

          <div>

            <h3>{stats.inactive}</h3>

            <span>Inactive</span>

          </div>

        </div>

      </div>

      {/* Filters */}

      <div className="jobs-toolbar">

        <div className="search-box">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Jobs..."
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
          {departments.map((dept) => (
            <option
              key={dept}
              value={dept}
            >
              {dept}
            </option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) =>
            setType(e.target.value)
          }
        >
          <option value="All">
            All Types
          </option>

          <option value="Full Time">
            Full Time
          </option>

          <option value="Part Time">
            Part Time
          </option>

          <option value="Internship">
            Internship
          </option>

          <option value="Contract">
            Contract
          </option>
        </select>

      </div>

      {/* Table */}

      {loading ? (
        <div className="loading">
          Loading Jobs...
        </div>
      ) : (
        <JobTable
          jobs={jobs}
          onDelete={handleDelete}
        />
      )}

      {/* Pagination */}

      {pages > 1 && (

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

      )}

    </div>
    </AdminLayout>
  );
}