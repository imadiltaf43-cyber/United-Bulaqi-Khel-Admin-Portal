import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import {
  FaSearch,
  FaUsers,
} from "react-icons/fa";

import { toast } from "react-toastify";

import ApplicationTable from "../../components/career/ApplicationTable";
import AdminLayout from "../../layouts/AdminLayout";

import {
  getApplications,
  getJobs,
} from "../../services/jobService";

import "../../styles/applications.css";

export default function Applications() {

  const [applications, setApplications] = useState([]);

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  const [jobFilter, setJobFilter] = useState("All");

  const [searchParams] = useSearchParams();

  const jobIdFromUrl = searchParams.get("jobId");

  //------------------------------------

  useEffect(() => {

    loadData();

  }, []);

  //------------------------------------

  useEffect(() => {

    if (jobIdFromUrl) {

      setJobFilter(jobIdFromUrl);

    } else {

      setJobFilter("All");

    }

  }, [jobIdFromUrl]);

  //------------------------------------

  const loadData = async () => {

    try {

      setLoading(true);

      const [appRes, jobRes] = await Promise.all([

        getApplications(),

        getJobs(),

      ]);

      setApplications(appRes.applications || []);

      setJobs(jobRes.jobs || []);

    }

    catch (err) {

      console.error(err);

      toast.error("Failed to load applications.");

    }

    finally {

      setLoading(false);

    }

  };

  //------------------------------------

  const filteredApplications = useMemo(() => {

    let list = [...applications];

    if (status !== "All") {

      list = list.filter(

        app => app.status === status

      );

    }

    if (jobFilter !== "All") {

      list = list.filter(

        app =>

          app.job?._id === jobFilter

      );

    }

    if (search.trim()) {

      list = list.filter(

        app =>

          app.fullName
            ?.toLowerCase()
            .includes(search.toLowerCase())

          ||

          app.email
            ?.toLowerCase()
            .includes(search.toLowerCase())

          ||

          app.job?.title
            ?.toLowerCase()
            .includes(search.toLowerCase())

      );

    }

    return list;

  }, [

    applications,

    search,

    status,

    jobFilter,

  ]);

  //------------------------------------

  return (

    <AdminLayout>

      <div className="applications-page">

        <div className="page-header">

          <div>

            <h2>

              <FaUsers className="me-2" />

              {jobIdFromUrl
                ? "Job Applications"
                : "All Applications"}

            </h2>

            <p>

              {jobIdFromUrl
                ? "Applications for the selected job."
                : "Manage all applicants submitted for your jobs."}

            </p>

          </div>

        </div>

        {/* Filters */}

        <div className="application-filter card shadow-sm border-0 mb-4">

          <div className="card-body">

            <div className="row g-3">

              <div className="col-lg-4">

                <div className="search-box">

                  <FaSearch />

                  <input
                    type="text"
                    placeholder="Search applicant..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />

                </div>

              </div>

              <div className="col-lg-4">

                <select
                  className="form-select"
                  value={jobFilter}
                  onChange={(e) =>
                    setJobFilter(e.target.value)
                  }
                >

                  <option value="All">

                    All Jobs

                  </option>

                  {jobs.map((job) => (

                    <option
                      key={job._id}
                      value={job._id}
                    >

                      {job.title}

                    </option>

                  ))}

                </select>

              </div>

              <div className="col-lg-4">

                <select
                  className="form-select"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value)
                  }
                >

                  <option value="All">

                    All Status

                  </option>

                  <option value="Pending">

                    Pending

                  </option>

                  <option value="Shortlisted">

                    Shortlisted

                  </option>

                  <option value="Interview">

                    Interview

                  </option>

                  <option value="Rejected">

                    Rejected

                  </option>

                  <option value="Hired">

                    Hired

                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>

        {/* Table */}

        {loading ? (

          <div className="text-center py-5">

            <div className="spinner-border text-warning" />

          </div>

        ) : (

          <ApplicationTable

            applications={filteredApplications}

            reload={loadData}

          />

        )}

      </div>

    </AdminLayout>

  );

}