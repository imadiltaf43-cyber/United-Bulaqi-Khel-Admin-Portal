import { useEffect, useMemo, useState } from "react";
import { FaEnvelopeOpenText, FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import AdminLayout from "../../layouts/AdminLayout";
import MessageTable from "../../components/contact/MessageTable";

import {
  getMessages,
} from "../../services/contactService";

import "../../styles/messages.css";

export default function Messages() {

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");

  //--------------------------------

  useEffect(() => {

    loadMessages();

  }, []);

  //--------------------------------

  const loadMessages = async () => {

    try {

      const data = await getMessages();

      setMessages(data.messages || []);

    }

    catch (err) {

      console.error(err);

      toast.error("Failed to load messages.");

    }

    finally {

      setLoading(false);

    }

  };

  //--------------------------------

  const filteredMessages = useMemo(() => {

    let list = [...messages];

    if (status !== "All") {

      list = list.filter(

        msg => msg.status === status

      );

    }

    if (search.trim()) {

      list = list.filter(

        msg =>

          msg.name.toLowerCase().includes(search.toLowerCase())

          ||

          msg.email.toLowerCase().includes(search.toLowerCase())

          ||

          msg.subject.toLowerCase().includes(search.toLowerCase())

      );

    }

    return list;

  }, [

    messages,

    search,

    status,

  ]);

  //--------------------------------

  return (

    <AdminLayout>

      <div className="messages-page">

        <div className="page-header">

          <div>

            <h2>

              <FaEnvelopeOpenText className="me-2"/>

              Contact Messages

            </h2>

            <p>

              Manage customer inquiries.

            </p>

          </div>

        </div>

        {/* Filters */}

        <div className="card shadow-sm border-0 mb-4">

          <div className="card-body">

            <div className="row g-3">

              <div className="col-lg-8">

                <div className="search-box">

                  <FaSearch/>

                  <input

                    type="text"

                    placeholder="Search..."

                    value={search}

                    onChange={(e)=>

                      setSearch(e.target.value)

                    }

                  />

                </div>

              </div>

              <div className="col-lg-4">

                <select

                  className="form-select"

                  value={status}

                  onChange={(e)=>

                    setStatus(e.target.value)

                  }

                >

                  <option value="All">

                    All Status

                  </option>

                  <option value="New">

                    New

                  </option>

                  <option value="Read">

                    Read

                  </option>

                  <option value="Replied">

                    Replied

                  </option>

                  <option value="Closed">

                    Closed

                  </option>

                </select>

              </div>

            </div>

          </div>

        </div>

        {

          loading

          ?

          (

            <div className="text-center py-5">

              <div className="spinner-border text-warning"/>

            </div>

          )

          :

          (

            <MessageTable

              messages={filteredMessages}

              reload={loadMessages}

            />

          )

        }

      </div>

    </AdminLayout>

  );

}