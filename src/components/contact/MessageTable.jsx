import { Link } from "react-router-dom";
import {
  FaEye,
  FaTrash,
} from "react-icons/fa";

import {
  updateMessageStatus,
  deleteMessage,
} from "../../services/contactService";

export default function MessageTable({

  messages,

  reload,

}) {

  //--------------------------------

  const handleStatus = async (

    id,

    status

  ) => {

    try {

      await updateMessageStatus(

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

  //--------------------------------

  const handleDelete = async (

    id

  ) => {

    const confirmDelete = window.confirm(

      "Delete this message?"

    );

    if (!confirmDelete) return;

    try {

      await deleteMessage(id);

      reload();

    }

    catch (err) {

      console.error(err);

      alert("Unable to delete message.");

    }

  };

  //--------------------------------

  if (!messages.length) {

    return (

      <div className="card shadow-sm border-0">

        <div className="card-body text-center py-5">

          <h5>

            No Messages Found

          </h5>

        </div>

      </div>

    );

  }

  //--------------------------------

  return (

    <div className="card shadow-sm border-0">

      <div className="table-responsive">

        <table className="table table-hover align-middle mb-0">

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Subject</th>

              <th>Date</th>

              <th>Status</th>

              <th width="220">

                Actions

              </th>

            </tr>

          </thead>

          <tbody>

            {

              messages.map((message)=>(

                <tr key={message._id}>

                  <td>

                    <strong>

                      {message.name}

                    </strong>

                  </td>

                  <td>

                    {message.email}

                  </td>

                  <td>

                    {message.subject}

                  </td>

                  <td>

                    {

                      new Date(

                        message.createdAt

                      ).toLocaleDateString()

                    }

                  </td>

                  <td>

                    <span

                      className={`badge ${
                        message.status === "New"
                          ? "bg-primary"
                          : message.status === "Read"
                          ? "bg-warning text-dark"
                          : message.status === "Replied"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >

                      {message.status}

                    </span>

                  </td>

                  <td>

                    <div className="d-flex gap-2 align-items-center">

                      <Link

                        to={`/messages/${message._id}`}

                        className="btn btn-sm btn-dark"

                      >

                        <FaEye/>

                      </Link>

                      <button

                        className="btn btn-sm btn-danger"

                        onClick={()=>handleDelete(message._id)}

                      >

                        <FaTrash/>

                      </button>

                      <select

                        className="form-select form-select-sm"

                        value={message.status}

                        onChange={(e)=>

                          handleStatus(

                            message._id,

                            e.target.value

                          )

                        }

                      >

                        <option>

                          New

                        </option>

                        <option>

                          Read

                        </option>

                        <option>

                          Replied

                        </option>

                        <option>

                          Closed

                        </option>

                      </select>

                    </div>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}