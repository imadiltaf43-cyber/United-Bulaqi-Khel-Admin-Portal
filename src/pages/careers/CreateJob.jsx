import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import JobForm from "../../components/career/JobForm";
import { createJob } from "../../services/jobService";
import AdminLayout from "../../layouts/AdminLayout";

export default function CreateJob() {

  const navigate = useNavigate();

  const handleSubmit = async (formData) => {

    try {

      await createJob(formData);

      toast.success("Job created successfully.");

      navigate("/careers");

    }

    catch (err) {

      console.error(err);

      toast.error(
        err.response?.data?.message ||
        "Failed to create job."
      );

    }

  };

  return (

    <AdminLayout>
    <div className="job-form-page">

      <div className="page-header">

        <div>

          <h1>Create New Job</h1>

          <p>
            Publish a new career opportunity for applicants.
          </p>

        </div>

      </div>

      <JobForm

        mode="create"

        onSubmit={handleSubmit}

      />

    </div>
    </AdminLayout>

  );

}