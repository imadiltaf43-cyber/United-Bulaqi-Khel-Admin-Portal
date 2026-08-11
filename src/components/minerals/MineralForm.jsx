import { useEffect, useState } from "react";

export default function MineralForm({
  initialData = {},
  onSubmit,
  loading = false,
}) {
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    category: "",
    status: "Published",
    image: null,
  });

  const [preview, setPreview] = useState("");

useEffect(() => {
  if (!initialData || !initialData._id) return;

  setFormData({
    name: initialData.name || "",
    shortDescription: initialData.shortDescription || "",
    description: initialData.description || "",
    category: initialData.category || "",
    status: initialData.status || "Published",
    image: null,
  });

  setPreview(initialData.image || "");

}, [initialData?._id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));

      setPreview(URL.createObjectURL(files[0]));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("shortDescription", formData.shortDescription);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("status", formData.status);

    if (formData.image) {
      data.append("image", formData.image);
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={submit}>

      <div className="row">

        <div className="col-md-8">

          <div className="mb-3">
            <label className="form-label">Mineral Name</label>

            <input
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Short Description
            </label>

            <textarea
              className="form-control"
              rows="3"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Description
            </label>

            <textarea
              className="form-control"
              rows="8"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="col-md-4">

          <div className="card">

            <div className="card-body">

              <div className="mb-3">

                <label className="form-label">
                  Category
                </label>

                <select
                  className="form-select"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option>Coal</option>
                  <option>Copper</option>
                  <option>Gypsum</option>
                  <option>Marble</option>
                  <option>Limestone</option>
                </select>

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Status
                </label>

                <select
                  className="form-select"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option>Published</option>
                  <option>Draft</option>
                </select>

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Featured Image
                </label>

                <input
                  type="file"
                  className="form-control"
                  onChange={handleChange}
                />

              </div>

              {preview && (

                <img
                  src={preview}
                  alt=""
                  className="img-fluid rounded shadow-sm mb-3"
                />

              )}

              <button
                className="btn btn-warning w-100"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : "Save Mineral"}
              </button>

            </div>

          </div>

        </div>

      </div>

    </form>
  );
}