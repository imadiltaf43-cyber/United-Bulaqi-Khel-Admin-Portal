import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import JobForm from "../../components/career/JobForm";
import AdminLayout from "../../layouts/AdminLayout";

import {
  getJob,
  updateJob,
} from "../../services/jobService";

import "../../styles/jobForm.css";

export default function EditJob() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  //---------------------------------------
  // Load Job
  //---------------------------------------

  useEffect(() => {

    fetchJob();

  }, []);

  const fetchJob = async () => {

    try {

      const data = await getJob(id);

      setJob(data);

    }

    catch (err) {

      console.error(err);

      toast.error("Unable to load job.");

    }

    finally {

      setLoading(false);

    }

  };

  //---------------------------------------
  // Update Job
  //---------------------------------------

  const handleUpdate = async (formData) => {

    try {

      setSaving(true);

      await updateJob(id, formData);

      toast.success("Job updated successfully.");

      navigate("/careers");

    }

    catch (err) {

      console.error(err);

      toast.error(

        err.response?.data?.message ||

        "Failed to update job."

      );

    }

    finally {

      setSaving(false);

    }

  };

  //---------------------------------------

  if (loading) {

    return (

      <div className="container py-5">

        <div className="text-center">

          <div className="spinner-border text-warning" />

          <p className="mt-3">

            Loading Job...

          </p>

        </div>

      </div>

    );

  }

  //---------------------------------------

  if (!job) {

    return (

      <div className="container py-5">

        <div className="alert alert-danger">

          Job not found.

        </div>

      </div>

    );

  }

  //---------------------------------------

  return (

    <AdminLayout>
    <div className="container-fluid py-4">

      <div className="mb-4">

        <h2 className="fw-bold">

          Edit Job

        </h2>

        <p className="text-muted mb-0">

          Update this career opportunity.

        </p>

      </div>

      <JobForm

        mode="edit"

        initialData={job}

        loading={saving}

        onSubmit={handleUpdate}

      />

    </div>
    </AdminLayout>

  );

}