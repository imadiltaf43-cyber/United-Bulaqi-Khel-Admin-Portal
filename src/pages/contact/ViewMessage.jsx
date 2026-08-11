import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaEnvelope,
  FaPhone,
  FaUser,
  FaCalendarAlt,
  FaReply,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getMessage,
  updateMessageStatus,
  deleteMessage,
} from "../../services/contactService";

export default function ViewMessage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [message, setMessage] = useState(null);

  const [loading, setLoading] = useState(true);

  //--------------------------------

  useEffect(() => {

    loadMessage();

  }, []);

  //--------------------------------

  const loadMessage = async () => {

    try {

      const data = await getMessage(id);

      setMessage(data.message);

    }

    catch (err) {

      console.error(err);

      alert("Unable to load message.");

    }

    finally {

      setLoading(false);

    }

  };

  //--------------------------------

  const changeStatus = async (status) => {

    try {

      await updateMessageStatus(

        id,

        status

      );

      setMessage({

        ...message,

        status,

      });

    }

    catch (err) {

      console.error(err);

      alert("Unable to update status.");

    }

  };

  //--------------------------------

  const handleDelete = async () => {

    if (!window.confirm("Delete this message?"))

      return;

    try {

      await deleteMessage(id);

      navigate("/messages");

    }

    catch (err) {

      console.error(err);

      alert("Unable to delete message.");

    }

  };

  //--------------------------------

  if (loading) {

    return (

      <div className="text-center py-5">

        <div className="spinner-border text-warning"/>

      </div>

    );

  }

  //--------------------------------

  if (!message) {

    return (

      <div className="alert alert-danger">

        Message not found.

      </div>

    );

  }

  //--------------------------------

  return (

    <AdminLayout>

      <div className="container-fluid py-4">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>

            <h2>

              Contact Message

            </h2>

            <p className="text-muted">

              View customer inquiry

            </p>

          </div>

          <button

            className="btn btn-outline-dark"

            onClick={() => navigate(-1)}

          >

            <FaArrowLeft className="me-2"/>

            Back

          </button>

        </div>

        <div className="row">

          <div className="col-lg-8">

            <div className="card shadow-sm border-0">

              <div className="card-header bg-white">

                <h5 className="mb-0">

                  Message Details

                </h5>

              </div>

              <div className="card-body">

                <div className="row g-4">

                  <div className="col-md-6">

                    <strong>

                      <FaUser className="me-2 text-warning"/>

                      Name

                    </strong>

                    <p>{message.name}</p>

                  </div>

                  <div className="col-md-6">

                    <strong>

                      <FaEnvelope className="me-2 text-warning"/>

                      Email

                    </strong>

                    <p>{message.email}</p>

                  </div>

                  <div className="col-md-6">

                    <strong>

                      <FaPhone className="me-2 text-warning"/>

                      Phone

                    </strong>

                    <p>

                      {message.phone || "-"}

                    </p>

                  </div>

                  <div className="col-md-6">

                    <strong>

                      Subject

                    </strong>

                    <p>{message.subject}</p>

                  </div>

                </div>

                <hr/>

                <h6>

                  Message

                </h6>

                <p>

                  {message.message}

                </p>

              </div>

            </div>

          </div>

          <div className="col-lg-4">

            <div className="card shadow-sm border-0 mb-4">

              <div className="card-header bg-white">

                <h5 className="mb-0">

                  Status

                </h5>

              </div>

              <div className="card-body">

                <select

                  className="form-select"

                  value={message.status}

                  onChange={(e)=>

                    changeStatus(

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

            </div>

            <div className="card shadow-sm border-0 mb-4">

              <div className="card-header bg-white">

                <h5 className="mb-0">

                  Received

                </h5>

              </div>

              <div className="card-body">

                <FaCalendarAlt className="me-2 text-warning"/>

                {

                  new Date(

                    message.createdAt

                  ).toLocaleString()

                }

              </div>

            </div>

            <button

              className="btn btn-danger w-100"

              onClick={handleDelete}

            >

              Delete Message

            </button>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}