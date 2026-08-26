import { useEffect, useState } from "react";

const emptyEvent = {
  title: "",
  type: "Event",
  date: "",
  location: "",
  shortDescription: "",
  description: "",
  order: 0,
  isActive: true,
  image: null,
};

export default function SustainabilityEventForm({ initialData, onSubmit, loading }) {
  const [form, setForm] = useState(emptyEvent);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!initialData) return;
    setForm({ ...emptyEvent, ...initialData, date: initialData.date?.slice(0, 10) || "", image: null });
    setPreview(initialData.image || "");
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value, files, checked, type } = event.target;
    if (type === "file") {
      setForm((current) => ({ ...current, image: files[0] || null }));
      setPreview(files[0] ? URL.createObjectURL(files[0]) : preview);
      return;
    }
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "image" && value !== undefined && value !== null) data.append(key, value);
    });
    if (form.image) data.append("image", form.image);
    onSubmit(data);
  };

  return (
    <form onSubmit={submit}>
      <div className="row g-3">
        <div className="col-md-8">
          <label className="form-label">Title</label>
          <input className="form-control" name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="col-md-4">
          <label className="form-label">Type</label>
          <select className="form-select" name="type" value={form.type} onChange={handleChange}>
            <option>Event</option><option>Social Campaign</option><option>Community Initiative</option><option>Environmental Project</option>
          </select>
        </div>
        <div className="col-md-4">
          <label className="form-label">Date</label>
          <input className="form-control" type="date" name="date" value={form.date} onChange={handleChange} required />
        </div>
        <div className="col-md-8">
          <label className="form-label">Location</label>
          <input className="form-control" name="location" value={form.location} onChange={handleChange} />
        </div>
        <div className="col-12">
          <label className="form-label">Short Description</label>
          <textarea className="form-control" rows="3" name="shortDescription" value={form.shortDescription} onChange={handleChange} required />
        </div>
        <div className="col-12">
          <label className="form-label">Full Description</label>
          <textarea className="form-control" rows="6" name="description" value={form.description} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Display Order</label>
          <input className="form-control" type="number" name="order" value={form.order} onChange={handleChange} />
        </div>
        <div className="col-md-4">
          <label className="form-label">Image</label>
          <input className="form-control" type="file" name="image" accept="image/*" onChange={handleChange} />
        </div>
        <div className="col-md-4 d-flex align-items-end">
          <label className="form-check">
            <input className="form-check-input" type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} />
            <span className="form-check-label">Show on public website</span>
          </label>
        </div>
        {preview && <div className="col-12"><img src={preview} alt="Event preview" style={{ maxWidth: 280, maxHeight: 180, objectFit: "cover" }} /></div>}
        <div className="col-12"><button className="btn btn-warning" disabled={loading}>{loading ? "Saving..." : "Save Event"}</button></div>
      </div>
    </form>
  );
}
