import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { toast } from "../../utils/toast";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getEvents,
  deleteEvent,
} from "../../services/eventService";

import {
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaSearch,
  FaMapMarkerAlt,
} from "react-icons/fa";

import "./Events.css";

// ============================
// Category chip helper
// ============================

const categoryClass = (cat) => {
  const map = {
    Plantation: "plantation",
    "Road Construction": "road-construction",
    Infrastructure: "infrastructure",
    "Clean Water": "clean-water",
    Seminar: "seminar",
  };
  return map[cat] || "other";
};

// ============================
// Events List Page
// ============================

export default function Events() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  // ---- Load events on filter change ----

  useEffect(() => {
    loadEvents();
  }, [page, search, category, status]);

  const loadEvents = async () => {
    try {
      setLoading(true);

      const data = await getEvents(
        page,
        search,
        category,
        status
      );

      setEvents(Array.isArray(data) ? data : data.events || []);
      setPages(data.pages || 1);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to load events."
      );
    } finally {
      setLoading(false);
    }
  };

  // ---- Delete with SweetAlert2 confirmation ----

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Event?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteEvent(id);

      toast.success("Event deleted successfully.");

      loadEvents();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Delete failed."
      );
    }
  };

  // ---- Render ----

  return (
    <AdminLayout>
      <div className="events-page">

        {/* Header */}

        <div className="events-header">

          <div>

            <h2>Sustainability Events</h2>

            <p>
              Manage community initiatives and sustainability events.
            </p>

          </div>

          <button
            className="add-btn"
            onClick={() => navigate("/sustainability/add")}
          >
            <FaPlus />
            Add Event
          </button>

        </div>

        {/* Filters */}

        <div className="event-filters">

          <div className="search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search events..."
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

            <option value="Plantation">Plantation</option>

            <option value="Road Construction">Road Construction</option>

            <option value="Infrastructure">Infrastructure</option>

            <option value="Clean Water">Clean Water</option>

            <option value="Seminar">Seminar</option>

            <option value="Other">Other</option>

          </select>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

            <option value="">All Status</option>

            <option value="Completed">Completed</option>

            <option value="Ongoing">Ongoing</option>

            <option value="Planned">Planned</option>

          </select>

        </div>

        {/* Table */}

        <div className="event-table">

          <table>

            <thead>

              <tr>

                <th>Event</th>

                <th>Category</th>

                <th>Location</th>

                <th>Date</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan="6">Loading...</td>
                </tr>

              ) : events.length === 0 ? (

                <tr>
                  <td colSpan="6">No Events Found</td>
                </tr>

              ) : (

                events.map((event) => {

                  const image = event.image || "/project.png";

                  return (

                    <tr key={event._id}>

                      {/* Event */}

                      <td>

                        <div className="event-info">

                          <img
                            src={image}
                            alt={event.title}
                            className="event-avatar"
                          />

                          <div className="event-text">

                            <h5>{event.title}</h5>

                            <span>
                              {event.date
                                ? new Date(event.date).toLocaleDateString()
                                : "—"}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* Category */}

                      <td>

                        <span
                          className={`category-chip ${categoryClass(
                            event.type
                          )}`}
                        >
                          {event.type}
                        </span>

                      </td>

                      {/* Location */}

                      <td>

                        <div className="location-cell">

                          <FaMapMarkerAlt />

                          <span>
                            {event.location || "N/A"}
                          </span>

                        </div>

                      </td>

                      {/* Date */}

                      <td>
                        {event.date
                          ? new Date(event.date).toLocaleDateString()
                          : "—"}
                      </td>

                      {/* Status */}

                      <td>

                        <span
                          className={`status-pill ${event.isActive ? "completed" : "planned"}`}
                        >
                          {event.isActive ? "Active" : "Hidden"}
                        </span>

                      </td>

                      {/* Actions */}

                      <td>

                        <div className="action-buttons">

                          <button
                            className="action-btn view-btn"
                            onClick={() =>
                              navigate(
                                `/sustainability/view/${event._id}`
                              )
                            }
                          >
                            <FaEye />
                          </button>

                          <button
                            className="action-btn edit-btn"
                            onClick={() =>
                              navigate(
                                `/sustainability/edit/${event._id}`
                              )
                            }
                          >
                            <FaEdit />
                          </button>

                          <button
                            className="action-btn delete-btn"
                            onClick={() =>
                              handleDelete(event._id)
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
