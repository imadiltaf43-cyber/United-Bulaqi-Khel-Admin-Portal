import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import { createInvestor } from "../../services/investorService";

export default function AddInvestor() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    guardianName: "",

    village: "Barkali",

    shares: "",

    remarks: "",

  });

  //--------------------------------------------

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  //--------------------------------------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await createInvestor({

        ...form,

        shares: Number(form.shares),

      });

      navigate("/investors");

    }

    catch (err) {

      console.error(err);

      alert(

        err.response?.data?.message ||

        "Unable to create investor."

      );

    }

    finally {

      setLoading(false);

    }

  };

  //--------------------------------------------

  return (

    <AdminLayout>

      <div className="container py-4">

        <div className="card shadow-sm border-0">

          <div className="card-header bg-white">

            <h3>

              Add Investor

            </h3>

          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row g-4">

                {/* Guardian Name */}

                <div className="col-md-6">

                  <label className="form-label">

                    Guardian Name

                  </label>

                  <input

                    type="text"

                    className="form-control"

                    name="guardianName"

                    value={form.guardianName}

                    onChange={handleChange}

                    required

                  />

                </div>

                {/* Village */}

                <div className="col-md-6">

                  <label className="form-label">

                    Section

                  </label>

                  <select

                    className="form-select"

                    name="village"

                    value={form.village}

                    onChange={handleChange}

                  >

                    <option value="Barkali">

                      Barkali

                    </option>

                    <option value="Attariwal">

                      Attariwal

                    </option>

                  </select>

                </div>

                {/* Shares */}

                <div className="col-md-6">

                  <label className="form-label">

                    Shares

                  </label>

                  <input

                    type="number"

                    className="form-control"

                    name="shares"

                    min="1"

                    value={form.shares}

                    onChange={handleChange}

                    required

                  />

                </div>

                {/* Remarks */}

                <div className="col-12">

                  <label className="form-label">

                    Remarks

                  </label>

                  <textarea

                    rows="4"

                    className="form-control"

                    name="remarks"

                    value={form.remarks}

                    onChange={handleChange}

                  />

                </div>

              </div>

              <div className="mt-4">

                <button

                  className="btn btn-warning"

                  disabled={loading}

                >

                  {

                    loading

                    ?

                    "Saving..."

                    :

                    "Add Investor"

                  }

                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}