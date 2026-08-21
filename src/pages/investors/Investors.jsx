import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaUsers,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";
import InvestorTable from "../../components/investors/InvestorTable";

import {
  getInvestors,
  deleteInvestor,
} from "../../services/investorService";

import "../../styles/Investors.css";

export default function Investors() {

  const [investors, setInvestors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [village, setVillage] = useState("All");

  //--------------------------------------------

  useEffect(() => {

    loadInvestors();

  }, []);

  //--------------------------------------------

  const loadInvestors = async () => {

    try {

      setLoading(true);

      const data = await getInvestors();

      setInvestors(data.investors || []);

    }

    catch (err) {

      console.error(err);

    }

    finally {

      setLoading(false);

    }

  };

  //--------------------------------------------

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this investor?")) {

      return;

    }

    try {

      await deleteInvestor(id);

      loadInvestors();

    }

    catch (err) {

      console.error(err);

    }

  };

  //--------------------------------------------

  const filteredInvestors = useMemo(() => {

    let list = [...investors];

    if (village !== "All") {

      list = list.filter(

        investor => investor.village === village

      );

    }

    if (search.trim()) {

      list = list.filter(

        investor =>

          investor.guardianName

            .toLowerCase()

            .includes(search.toLowerCase())

          ||

          investor.village

            .toLowerCase()

            .includes(search.toLowerCase())

      );

    }

    return list;

  }, [

    investors,

    village,

    search,

  ]);

  //--------------------------------------------

  return (

    <AdminLayout>

      <div className="investors-page">

        <div className="page-header">

          <div>

            <h2>

              <FaUsers className="me-2"/>

              Investors

            </h2>

            <p>

              Manage shareholders of both sections.

            </p>

          </div>

          <Link

            to="/investors/add"

            className="btn btn-warning"

          >

            <FaPlus className="me-2"/>

            Add Investor

          </Link>

        </div>

        {/* Filters */}

        <div className="card shadow-sm border-0 mb-4">

          <div className="card-body">

            <div className="row g-3">

              <div className="col-lg-6">

                <div className="search-box">

                  <FaSearch/>

                  <input

                    type="text"

                    placeholder="Search by Guardian Name or Section"

                    value={search}

                    onChange={(e)=>

                      setSearch(e.target.value)

                    }

                  />

                </div>

              </div>

              <div className="col-lg-3">

                <select

                  className="form-select"

                  value={village}

                  onChange={(e)=>

                    setVillage(e.target.value)

                  }

                >

                  <option value="All">

                    All Sections

                  </option>

                  <option value="Barkali">

                    Barkali

                  </option>

                  <option value="Attariwal">

                    Attariwal

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

            <InvestorTable

              investors={filteredInvestors}

              onDelete={handleDelete}

            />

          )

        }

      </div>

    </AdminLayout>

  );

}