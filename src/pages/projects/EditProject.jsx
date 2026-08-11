import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import {
  getProject,
  updateProject,
} from "../../services/projectService";
import { toast } from "../../utils/toast";

import "./Projects.css";

export default function EditProject() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState([]);

  const [form, setForm] = useState({
    projectName: "",
    category: "",
    projectType: "",
    location: "",
    coordinates: "",
    annualOutput: "",
    area: "",
    timeline: "",
    status: "Planned",
    description: "",
    gallery: [],
  });

  useEffect(() => {
    loadProject();
  }, []);

  const loadProject = async () => {

    try {

      const project = await getProject(id);

      setForm({
  projectName: project.projectName || "",
  category: project.category || "",
  projectType: project.projectType || "",
  location: project.location || "",
  coordinates: project.coordinates || "",
  annualOutput: project.annualOutput || "",
  area: project.area || "",
  timeline: project.timeline || "",
  status: project.status || "Planned",
  description: project.description || "",
  gallery: [],
});

setPreview(project.gallery || []);

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Failed to load project."
      );

    }

  };

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

      formData.append("projectName", form.projectName);
      formData.append("category", form.category);
      formData.append("projectType", form.projectType);
      formData.append("location", form.location);
      formData.append("coordinates", form.coordinates);
      formData.append("annualOutput", form.annualOutput);
      formData.append("area", form.area);
      formData.append("timeline", form.timeline);
      formData.append("status", form.status);
      formData.append("description", form.description);

      form.gallery.forEach((img) => {
        formData.append("gallery", img);
      });

      await updateProject(id, formData);

      toast.success("Project updated successfully.");

      navigate("/projects");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Failed to update project."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <AdminLayout>

      <div className="form-page">

        <div className="page-header">
          <h2>Edit Project</h2>
          <p>Update project information.</p>
        </div>

        <form
          className="modern-form"
          onSubmit={handleSubmit}
        >

          <div className="form-grid">

            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                name="projectName"
                value={form.projectName}
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
                <option>Coal</option>
                <option>Marble</option>
                <option>Limestone</option>
                <option>Silica Sand</option>
                <option>Gypsum</option>
              </select>
            </div>

            <div className="form-group">
              <label>Project Type</label>
              <select
                name="projectType"
                value={form.projectType}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Underground Mine</option>
                <option>Open Pit Mine</option>
                <option>Quarry</option>
                <option>Processing Plant</option>
                <option>Exploration Site</option>
              </select>
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
              <label>Coordinates</label>
              <input
                type="text"
                name="coordinates"
                value={form.coordinates}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Annual Output</label>
              <input
                type="number"
                name="annualOutput"
                value={form.annualOutput}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Area</label>
              <input
                type="number"
                name="area"
                value={form.area}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Timeline</label>
              <input
                type="text"
                name="timeline"
                value={form.timeline}
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
                <option>Active</option>
                <option>Completed</option>
                <option>Inactive</option>
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
              onClick={() => navigate("/projects")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-btn"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Project"}
            </button>
          </div>

        </form>

      </div>

    </AdminLayout>

  );

}