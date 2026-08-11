import { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrash,
  FaUpload,
  FaTimes,
  FaBriefcase,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaBuilding,
} from "react-icons/fa";

const defaultForm = {
  title: "",
  department: "",
  employmentType: "Full Time",
  location: "",
  experience: "",
  education: "",
  salary: "",
  vacancies: 1,
  deadline: "",
  description: "",

  responsibilities: [""],
  requirements: [""],
  benefits: [""],

  featured: false,
  isActive: true,

  jobImage: null,
};

export default function JobForm({
  mode = "create",
  initialData = {},
  onSubmit,
  loading = false,
}) {

  const [form, setForm] = useState(defaultForm);

  const [preview, setPreview] = useState("");

  useEffect(() => {

    if (mode === "edit" && initialData) {

      setForm({

        ...defaultForm,

        ...initialData,

        responsibilities:
          initialData.responsibilities?.length
            ? initialData.responsibilities
            : [""],

        requirements:
          initialData.requirements?.length
            ? initialData.requirements
            : [""],

        benefits:
          initialData.benefits?.length
            ? initialData.benefits
            : [""],

        deadline:
          initialData.deadline
            ? initialData.deadline.slice(0, 10)
            : "",

        jobImage: null,

      });

      setPreview(initialData.jobImage || "");

    }

  }, [mode, initialData]);

  //--------------------------------------------------
  // Input Change
  //--------------------------------------------------

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setForm((prev) => ({

      ...prev,

      [name]:

        type === "checkbox"

          ? checked

          : value,

    }));

  };

  //--------------------------------------------------
  // Image Upload
  //--------------------------------------------------

  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({

      ...prev,

      jobImage: file,

    }));

    setPreview(URL.createObjectURL(file));

  };

  const removeImage = () => {

    setPreview("");

    setForm((prev) => ({

      ...prev,

      jobImage: null,

    }));

  };

  //--------------------------------------------------
  // Dynamic Lists
  //--------------------------------------------------

  const addItem = (field) => {

    setForm((prev) => ({

      ...prev,

      [field]: [...prev[field], ""],

    }));

  };

  const removeItem = (field, index) => {

    const updated = [...form[field]];

    updated.splice(index, 1);

    if (updated.length === 0) {

      updated.push("");

    }

    setForm((prev) => ({

      ...prev,

      [field]: updated,

    }));

  };

  const updateItem = (
    field,
    index,
    value
  ) => {

    const updated = [...form[field]];

    updated[index] = value;

    setForm((prev) => ({

      ...prev,

      [field]: updated,

    }));

  };

  //--------------------------------------------------
  // Submit
  //--------------------------------------------------

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!form.title.trim()) {

      return alert("Job title is required.");

    }

    if (!form.department.trim()) {

      return alert("Department is required.");

    }

    if (!form.location.trim()) {

      return alert("Location is required.");

    }

    if (!form.deadline) {

      return alert("Deadline is required.");

    }

    if (!form.description.trim()) {

      return alert("Description is required.");

    }

    const formData = new FormData();

    formData.append("title", form.title.trim());
    formData.append("department", form.department.trim());
    formData.append("employmentType", form.employmentType);
    formData.append("location", form.location.trim());
    formData.append("experience", form.experience.trim());
    formData.append("education", form.education.trim());
    formData.append("salary", form.salary.trim());
    formData.append("vacancies", String(Number(form.vacancies || 1)));
    formData.append("deadline", form.deadline);
    formData.append("description", form.description.trim());
    formData.append("featured", String(Boolean(form.featured)));
    formData.append("isActive", String(Boolean(form.isActive)));

    form.responsibilities
      .filter((item) => item.trim())
      .forEach((item) => formData.append("responsibilities", item));

    form.requirements
      .filter((item) => item.trim())
      .forEach((item) => formData.append("requirements", item));

    form.benefits
      .filter((item) => item.trim())
      .forEach((item) => formData.append("benefits", item));

    if (form.jobImage) {
      formData.append("jobImage", form.jobImage);
    }

    onSubmit(formData);

  };

  return (

<form
className="job-form"
onSubmit={handleSubmit}
>

<div className="card shadow-sm border-0 mb-4">

<div className="card-header bg-white py-3">

<h4 className="mb-0">

<FaBriefcase className="me-2 text-warning"/>

Basic Information

</h4>

</div>

<div className="card-body">

<div className="row">

<div className="col-lg-6 mb-3">

<label className="form-label">

Job Title

</label>

<input

type="text"

name="title"

className="form-control"

value={form.title}

onChange={handleChange}

/>

</div>

<div className="col-lg-6 mb-3">

<label className="form-label">

Department

</label>

<input

type="text"

name="department"

className="form-control"

value={form.department}

onChange={handleChange}

/>

</div>

<div className="col-lg-4 mb-3">

<label className="form-label">

Employment Type

</label>

<select

name="employmentType"

className="form-select"

value={form.employmentType}

onChange={handleChange}

>

<option>Full Time</option>

<option>Part Time</option>

<option>Contract</option>

<option>Internship</option>

</select>

</div>

<div className="col-lg-4 mb-3">

<label className="form-label">

Location

</label>

<div className="input-group">

<span className="input-group-text">

<FaMapMarkerAlt/>

</span>

<input

name="location"

className="form-control"

value={form.location}

onChange={handleChange}

/>

</div>

</div>

<div className="col-lg-4 mb-3">

<label className="form-label">

Deadline

</label>

<div className="input-group">

<span className="input-group-text">

<FaCalendarAlt/>

</span>

<input

type="date"

name="deadline"

className="form-control"

value={form.deadline}

onChange={handleChange}

/>

</div>

</div>

<div className="col-lg-4 mb-3">

<label className="form-label">

Experience

</label>

<input

type="text"

name="experience"

className="form-control"

placeholder="e.g. 5+ Years"

value={form.experience}

onChange={handleChange}

/>

</div>

<div className="col-lg-4 mb-3">

<label className="form-label">

Education

</label>

<input

type="text"

name="education"

className="form-control"

placeholder="BS Mining Engineering"

value={form.education}

onChange={handleChange}

/>

</div>

<div className="col-lg-4 mb-3">

<label className="form-label">

Vacancies

</label>

<input

type="number"

min="1"

name="vacancies"

className="form-control"

value={form.vacancies}

onChange={handleChange}

/>

</div>

<div className="col-lg-6 mb-3">

<label className="form-label">

Salary

</label>

<div className="input-group">

<span className="input-group-text">

<FaMoneyBillWave/>

</span>

<input

type="text"

name="salary"

className="form-control"

placeholder="PKR 120,000 - 180,000"

value={form.salary}

onChange={handleChange}

/>

</div>

</div>

</div>

</div>

</div>

{/* ======================================= */}

{/* Banner Image */}

{/* ======================================= */}

<div className="card shadow-sm border-0 mb-4">

<div className="card-header bg-white">

<h4 className="mb-0">

<FaUpload className="me-2 text-warning"/>

Job Banner

</h4>

</div>

<div className="card-body">

<div className="upload-box">

{preview ? (

<div className="image-preview">

<img

src={preview}

alt="preview"

/>

<button

type="button"

className="remove-image"

onClick={removeImage}

>

<FaTimes/>

</button>

</div>

) : (

<label className="upload-placeholder">

<input

type="file"

hidden

accept="image/*"

onChange={handleImage}

/>

<FaUpload size={40}/>

<h5>

Click to Upload Banner

</h5>

<p>

Recommended Size

1200 x 700 px

</p>

</label>

)}

</div>

</div>

</div>

{/* ======================================= */}

{/* Description */}

{/* ======================================= */}

<div className="card shadow-sm border-0 mb-4">

<div className="card-header bg-white">

<h4 className="mb-0">

Job Description

</h4>

</div>

<div className="card-body">

<textarea

rows="8"

name="description"

className="form-control"

placeholder="Write complete job description..."

value={form.description}

onChange={handleChange}

/>

</div>

</div>

{/* ======================================= */}

{/* Responsibilities */}

{/* ======================================= */}

<div className="card shadow-sm border-0 mb-4">

<div className="card-header bg-white d-flex justify-content-between align-items-center">

<h4 className="mb-0">

Responsibilities

</h4>

<button

type="button"

className="btn btn-warning"

onClick={()=>

addItem("responsibilities")

}

>

<FaPlus/>

</button>

</div>

<div className="card-body">

{form.responsibilities.map(

(item,index)=>(

<div

className="input-group mb-3"

key={index}

>

<input

className="form-control"

value={item}

placeholder="Enter Responsibility"

onChange={(e)=>

updateItem(

"responsibilities",

index,

e.target.value

)

}

/>

<button

type="button"

className="btn btn-outline-danger"

onClick={()=>

removeItem(

"responsibilities",

index

)

}

>

<FaTrash/>

</button>

</div>

)

)}

</div>

</div>

{/* ======================================= */}

{/* Requirements */}

{/* ======================================= */}

<div className="card shadow-sm border-0 mb-4">

<div className="card-header bg-white d-flex justify-content-between align-items-center">

<h4 className="mb-0">

Requirements

</h4>

<button

type="button"

className="btn btn-warning"

onClick={()=>

addItem("requirements")

}

>

<FaPlus/>

</button>

</div>

<div className="card-body">

{form.requirements.map(

(item,index)=>(

<div

className="input-group mb-3"

key={index}

>

<input

className="form-control"

value={item}

placeholder="Enter Requirement"

onChange={(e)=>

updateItem(

"requirements",

index,

e.target.value

)

}

/>

<button

type="button"

className="btn btn-outline-danger"

onClick={()=>

removeItem(

"requirements",

index

)

}

>

<FaTrash/>

</button>

</div>

)

)}

</div>

</div>


{/* ======================================= */}
{/* Benefits */}
{/* ======================================= */}

<div className="card shadow-sm border-0 mb-4">

  <div className="card-header bg-white d-flex justify-content-between align-items-center">

    <h4 className="mb-0">

      Benefits

    </h4>

    <button
      type="button"
      className="btn btn-warning"
      onClick={() => addItem("benefits")}
    >
      <FaPlus />
    </button>

  </div>

  <div className="card-body">

    {form.benefits.map((item, index) => (

      <div
        className="input-group mb-3"
        key={index}
      >

        <input
          className="form-control"
          placeholder="Enter Benefit"
          value={item}
          onChange={(e) =>
            updateItem(
              "benefits",
              index,
              e.target.value
            )
          }
        />

        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() =>
            removeItem(
              "benefits",
              index
            )
          }
        >

          <FaTrash />

        </button>

      </div>

    ))}

  </div>

</div>

{/* ======================================= */}
{/* Publish Settings */}
{/* ======================================= */}

<div className="card shadow-sm border-0 mb-4">

  <div className="card-header bg-white">

    <h4 className="mb-0">

      Publish Settings

    </h4>

  </div>

  <div className="card-body">

    <div className="row">

      <div className="col-lg-6">

        <div className="form-check form-switch">

          <input
            type="checkbox"
            className="form-check-input"
            id="featured"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />

          <label
            className="form-check-label"
            htmlFor="featured"
          >

            Featured Job

          </label>

        </div>

      </div>

      <div className="col-lg-6">

        <div className="form-check form-switch">

          <input
            type="checkbox"
            className="form-check-input"
            id="active"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />

          <label
            className="form-check-label"
            htmlFor="active"
          >

            Active Job

          </label>

        </div>

      </div>

    </div>

  </div>

</div>

{/* ======================================= */}
{/* Footer Buttons */}
{/* ======================================= */}

<div className="card border-0 shadow-sm">

  <div className="card-body">

    <div className="d-flex justify-content-end gap-3">

      <button
        type="button"
        className="btn btn-light px-4"
        onClick={() => window.history.back()}
      >

        Cancel

      </button>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-warning px-5 fw-semibold"
      >

        {loading
          ? "Saving..."
          : mode === "edit"
          ? "Update Job"
          : "Publish Job"}

      </button>

    </div>

  </div>

</div>

</form>

);
}