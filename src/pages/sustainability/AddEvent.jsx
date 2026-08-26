import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import { createEvent } from "../../services/eventService";
import { toast } from "../../utils/toast";

import "./Events.css";

export default function AddEvent() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  // Revoke object URLs on unmount to avoid memory leaks
  useEffect(() => {

    return () => {

      if (preview) URL.revokeObjectURL(preview);

    };

  }, [preview]);

  const [form, setForm] = useState({
    title: "",
    type: "Event",
    date: "",
    location: "",
    shortDescription: "",
    description: "",
    order: 0,
    isActive: true,
    image: null,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleGallery = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({ ...prev, image: file }));

    setPreview(URL.createObjectURL(file));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Please enter an event title.");
      return;
    }

    if (!form.image) {
      toast.error("Please select an image.");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("type", form.type);
      formData.append("date", form.date);
      formData.append("location", form.location);
      formData.append("shortDescription", form.shortDescription);
      formData.append("description", form.description);
      formData.append("order", form.order);
      formData.append("isActive", form.isActive);
      formData.append("image", form.image);

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
              <label>Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                required
              >
                <option>Event</option>
                <option>Social Campaign</option>
                <option>Community Initiative</option>
                <option>Environmental Project</option>
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
              <label>Display Order</label>
              <input
                type="number"
                min="0"
                name="order"
                value={form.order}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-group">
            <label>Short Description</label>
            <textarea
              rows="3"
              name="shortDescription"
              value={form.shortDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Full Description</label>
            <textarea
              rows="5"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleGallery}
              required
            />
          </div>

          {preview && (
            <div className="gallery-preview">
              <img src={preview} alt="Preview" className="preview-image" />
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
