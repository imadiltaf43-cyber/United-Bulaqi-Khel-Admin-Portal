import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import {
  getInvestor,
  updateInvestor,
} from "../../services/investorService";

export default function EditInvestor() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({

    guardianName: "",

    village: "Barkali",

    shares: "",

    remarks: "",

  });

  //-------------------------------------------------

  useEffect(() => {

    loadInvestor();

  }, []);

  //-------------------------------------------------

  const loadInvestor = async () => {

    try {

      const data = await getInvestor(id);

      setForm({

        guardianName: data.investor.guardianName,

        village: data.investor.village,

        shares: data.investor.shares,

        remarks: data.investor.remarks || "",

      });

    }

    catch (err) {

      console.error(err);

    }

    finally {

      setLoading(false);

    }

  };

  //-------------------------------------------------

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  //-------------------------------------------------

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      await updateInvestor(

        id,

        {

          ...form,

          shares: Number(form.shares),

        }

      );

      navigate("/investors");

    }

    catch (err) {

      console.error(err);

      alert(

        err.response?.data?.message ||

        "Unable to update investor."

      );

    }

    finally {

      setSaving(false);

    }

  };

  //-------------------------------------------------

  if (loading) {

    return (

      <AdminLayout>

        <div className="text-center py-5">

          <div className="spinner-border text-warning"/>

        </div>

      </AdminLayout>

    );

  }

  //-------------------------------------------------

  return (

    <AdminLayout>

      <div className="container py-4">

        <div className="card shadow-sm border-0">

          <div className="card-header bg-white">

            <h3>

              Edit Investor

            </h3>

          </div>

          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row g-4">

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

                <div className="col-md-6">

                  <label className="form-label">

                    Shares

                  </label>

                  <input

                    type="number"

                    className="form-control"

                    min="1"

                    name="shares"

                    value={form.shares}

                    onChange={handleChange}

                    required

                  />

                </div>

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

                  disabled={saving}

                >

                  {

                    saving

                    ?

                    "Updating..."

                    :

                    "Update Investor"

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