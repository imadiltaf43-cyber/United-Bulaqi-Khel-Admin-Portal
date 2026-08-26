import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import { createEvent } from "../../services/eventService";
import { toast } from "../../utils/toast";

import "./Events.css";

export default function AddEvent() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState([]);

  // Revoke object URLs on unmount to avoid memory leaks
  useEffect(() => {

    return () => {

      preview.forEach((url) => URL.revokeObjectURL(url));

    };

  }, [preview]);

  const [form, setForm] = useState({
    title: "",
    category: "",
    date: "",
    location: "",
    status: "Planned",
    description: "",
    gallery: [],
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleGallery = (e) => {

    const files = Array.from(e.target.files);

    if (!files.length) return;

    // Revoke previous previews
    preview.forEach((url) => URL.revokeObjectURL(url));

    setForm((prev) => ({
      ...prev,
      gallery: files,
    }));

    setPreview(
      files.map((file) => URL.createObjectURL(file))
    );

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Please enter an event title.");
      return;
    }

    if (!form.gallery.length) {
      toast.error("Please select at least one image.");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("date", form.date);
      formData.append("location", form.location);
      formData.append("status", form.status);
      formData.append("description", form.description);

      form.gallery.forEach((file) => {
        formData.append("gallery", file);
      });

      await createEvent(formData);

      toast.success("Event created successfully.");

      navigate("/sustainability");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Failed to create event."
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <AdminLayout>

      <div className="event-form-page">

        <div className="page-header">
          <h2>Add Event</h2>
          <p>Create a new sustainability event.</p>
        </div>

        <form className="modern-form" onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">
              <label>Event Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Community Clean Water Initiative"
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
                placeholder="e.g. Danin Chitral"
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
              placeholder="Describe the event, its impact, and outcomes..."
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
              {preview.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Preview"
                  className="preview-image"
                />
              ))}
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
              {loading ? "Saving..." : "Create Event"}
            </button>
          </div>

        </form>

      </div>

    </AdminLayout>
  );
}
