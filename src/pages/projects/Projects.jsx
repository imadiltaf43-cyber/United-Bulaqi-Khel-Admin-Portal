import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { toast } from "../../utils/toast";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getProjects,
  deleteProject,
} from "../../services/projectService";

import {
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./Projects.css";

export default function Projects() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    loadProjects();
  }, [page, search, status, category]);

  const loadProjects = async () => {
    try {
      setLoading(true);

      // Map UI status labels to backend values
      let statusForApi = status;
      if (status === "Ongoing") statusForApi = "Active";
      if (status === "Stopped") statusForApi = "Completed";

      const data = await getProjects(
        page,
        search,
        statusForApi,
        category
      );

      setProjects(data.projects || []);
      setPages(data.pages || 1);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Project?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteProject(id);

      toast.success("Project deleted successfully.");

      loadProjects();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Delete failed."
      );
    }
  };

  return (
    <AdminLayout>
      <div className="projects-page">

        {/* Header */}

        <div className="projects-header">

          <div>

            <h2>Projects</h2>

            <p>
              Manage all mining projects from one place.
            </p>

          </div>

          <button
            className="add-btn"
            onClick={() => navigate("/projects/add")}
          >
            <FaPlus />
            Add Project
          </button>

        </div>

        {/* Filters */}

        <div className="project-filters">

          <div className="search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search project..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            <option value="">All Categories</option>

            <option value="Coal">Coal</option>

            <option value="Marble">Marble</option>

            <option value="Limestone">Limestone</option>

            <option value="Silica Sand">Silica Sand</option>

          </select>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

            <option value="">All Status</option>

            <option value="Ongoing">Ongoing</option>

            <option value="Stopped">Stopped</option>

            <option value="Planned">Planned</option>

            <option value="Inactive">Inactive</option>

          </select>

        </div>

        {/* Table */}

        <div className="project-table">

          <table>

            <thead>

              <tr>

                <th>Project</th>

                <th>Category</th>

                <th>Location</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

  <tr>
    <td colSpan="5">Loading...</td>
  </tr>

) : projects.length === 0 ? (

  <tr>
    <td colSpan="5">No Projects Found</td>
  </tr>

) : (

  projects.map((project) => {

    const image =
      project.gallery?.length > 0
        ? project.gallery[0].url
        : "/project.png";

    return (

      <tr key={project._id}>

        {/* Project */}

        <td>

          <div className="project-info">

            <img
              src={image}
              alt={project.projectName}
              className="project-avatar"
            />

            <div className="project-text">

              <h5>{project.projectName}</h5>

              <span>{project.projectType}</span>

            </div>

          </div>

        </td>

        {/* Category */}

        <td>

          <span className="category-chip">

            {project.category}

          </span>

        </td>

        {/* Location */}

        <td>

          <div className="location-cell">

            <FaMapMarkerAlt />

            <span>

              {project.location || "N/A"}

            </span>

          </div>

        </td>

        {/* Status */}

        <td>

          <span
            className={`status-pill ${(
              project.status === "Completed"
                ? "Stopped"
                : project.status === "Active"
                ? "Ongoing"
                : project.status
            )
              .toLowerCase()
              .replace(/\s/g, "-")}`}
          >

            {project.status === "Completed"
              ? "Stopped"
              : project.status === "Active"
              ? "Ongoing"
              : project.status}

          </span>

        </td>

        {/* Actions */}

        <td>

          <div className="action-buttons">

            <button
              className="action-btn view-btn"
              onClick={() =>
                navigate(`/projects/view/${project._id}`)
              }
            >
              <FaEye />
            </button>

            <button
              className="action-btn edit-btn"
              onClick={() =>
                navigate(`/projects/edit/${project._id}`)
              }
            >
              <FaEdit />
            </button>

            <button
              className="action-btn delete-btn"
              onClick={() =>
                handleDelete(project._id)
              }
            >
              <FaTrash />
            </button>

          </div>

        </td>

      </tr>

    );

  })

)}

            </tbody>

          </table>

        </div>

        {/* Pagination */}

        <div className="pagination">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ← Previous
          </button>

          <span>

            Page <strong>{page}</strong> of{" "}
            <strong>{pages}</strong>

          </span>

          <button
            disabled={page === pages}
            onClick={() => setPage(page + 1)}
          >
            Next →
          </button>

        </div>

      </div>

    </AdminLayout>

  );

}