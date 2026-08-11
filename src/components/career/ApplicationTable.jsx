import { Link } from "react-router-dom";
import {
  FaEye,
  FaDownload,
  FaTrash,
} from "react-icons/fa";

import ApplicationStatusBadge from "./ApplicationStatusBadge";


import {
  updateApplicationStatus,
  deleteApplication,
} from "../../services/jobService";

export default function ApplicationTable({

  applications,

  reload,

}) {

  //------------------------------------------------

  const handleStatus = async (

    id,

    status

  ) => {

    try {

      await updateApplicationStatus(

        id,

        status

      );

      reload();

    }

    catch (err) {

      console.error(err);

      alert("Unable to update status.");

    }

  };

  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this application?"
  );

  if (!confirmDelete) return;

  try {

    await deleteApplication(id);

    reload();

  } catch (err) {

    console.error(err);

    alert("Unable to delete application.");

  }

};

  //------------------------------------------------

  
  //------------------------------------------------

  if (applications.length === 0) {

    return (

      <div className="card shadow-sm border-0">

        <div className="card-body text-center py-5">

          <h5>

            No Applications Found

          </h5>

        </div>

      </div>

    );

  }

  //------------------------------------------------

  return (

    <div className="card shadow-sm border-0">

      <div className="table-responsive">

        <table className="table table-hover align-middle mb-0">

          <thead>

            <tr>

              <th>Applicant</th>

              <th>Job</th>

              <th>Email</th>

              <th>Phone</th>

              <th>Applied</th>

              <th>Status</th>

              <th width="220">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {

              applications.map(

                (application) => (

                  <tr key={application._id}>

                    {/* Applicant */}

                    <td>

                      <div>

                        <strong>

                          {application.fullName}

                        </strong>

                      </div>

                    </td>

                    {/* Job */}

                    <td>

                      {

                        application.job?.title ||

                        "Deleted Job"

                      }

                    </td>

                    {/* Email */}

                    <td>

                      {application.email}

                    </td>

                    {/* Phone */}

                    <td>

                      {application.phone}

                    </td>

                    {/* Date */}

                    <td>

                      {

                        new Date(

                          application.createdAt

                        ).toLocaleDateString()

                      }

                    </td>

                    {/* Badge */}

                   <td>
                         <ApplicationStatusBadge
                        status={application.status}
                            />
                    </td>

                    {/* Actions */}

                    <td>

                      <div className="d-flex gap-2 align-items-center">

                        <Link

                          to={`/careers/applications/${application._id}`}

                          className="btn btn-sm btn-dark"

                        >

                          <FaEye />

                        </Link>

                        {

                          application.cv && (

                            <a

                              href={application.cv}

                              target="_blank"

                              rel="noreferrer"

                              className="btn btn-sm btn-success"

                            >

                              <FaDownload />

                            </a>

                          )

                        }
                        <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(application._id)}
                            title="Delete Application"
                            >
                          <FaTrash />
                        </button>

                        <select

                          className="form-select form-select-sm"

                          value={application.status}

                          onChange={(e)=>

                            handleStatus(

                              application._id,

                              e.target.value

                            )

                          }

                        >

                          <option>

                            Pending

                          </option>

                          <option>

                            Shortlisted

                          </option>

                          <option>

                            Interview

                          </option>

                          <option>

                            Hired

                          </option>

                          <option>

                            Rejected

                          </option>

                        </select>

                      </div>

                    </td>

                  </tr>

                )

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}