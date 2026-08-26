import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import {
  getEvent,
  updateEvent,
} from "../../services/eventService";
import { toast } from "../../utils/toast";

import "./Events.css";

export default function EditEvent() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState([]);

  const [form, setForm] = useState({
    title: "",
    category: "",
    date: "",
    location: "",
    status: "Planned",
    description: "",
    gallery: [],
  });

  // ---- Load existing event on mount ----

  useEffect(() => {
    loadEvent();
  }, []);

  const loadEvent = async () => {

    try {

      const event = await getEvent(id);

      setForm({
        title: event.title || "",
        category: event.category || "",
        date: event.date
          ? event.date.substring(0, 10)
          : "",
        location: event.location || "",
        status: event.status || "Planned",
        description: event.description || "",
        gallery: [],
      });

      // Show existing gallery images as preview
      setPreview(event.gallery || []);

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Failed to load event."
      );

    }

  };

  // ---- Handlers ----

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  const handleGallery = (e) => {

    const files = Array.from(e.target.files);

    setForm((prev) => ({
      ...prev,
      gallery: files,
    }));

    setPreview(
      files.map((file) => ({
        preview: URL.createObjectURL(file),
        file,
      }))
    );

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("date", form.date);
      formData.append("location", form.location);
      formData.append("status", form.status);
      formData.append("description", form.description);

      form.gallery.forEach((img) => {
        formData.append("gallery", img);
      });

      await updateEvent(id, formData);

      toast.success("Event updated successfully.");

      navigate("/sustainability");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Failed to update event."
      );

    } finally {

      setLoading(false);

    }

  };

  // ---- Render ----

  return (

    <AdminLayout>

      <div className="event-form-page">

        <div className="page-header">
          <h2>Edit Event</h2>
          <p>Update sustainability event information.</p>
        </div>

        <form
          className="modern-form"
          onSubmit={handleSubmit}
        >

          <div className="form-grid">

            <div className="form-group">
              <label>Event Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option>Plantation</option>
                <option>Road Construction</option>
                <option>Infrastructure</option>
                <option>Clean Water</option>
                <option>Seminar</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Event Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option>Planned</option>
                <option>Ongoing</option>
                <option>Completed</option>
              </select>
            </div>

          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              rows="5"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Gallery</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleGallery}
            />
          </div>

          {preview.length > 0 && (

            <div className="gallery-preview">

              {preview.map((img, index) => {

                const imageUrl =
                  img.preview ||
                  img.url ||
                  "/project.png";

                return (

                  <img
                    key={index}
                    src={imageUrl}
                    alt="Preview"
                    className="preview-image"
                  />

                );

              })}

            </div>

          )}

          <div className="form-actions">
            <button
              type="button"
              className="secondary-btn"
              onClick={() => navigate("/sustainability")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Event"}
            </button>
          </div>

        </form>

      </div>

    </AdminLayout>

  );

}
