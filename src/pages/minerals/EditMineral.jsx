import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import MineralForm from "../../components/minerals/MineralForm";

import {
  getMineral,
  updateMineral,
} from "../../services/mineralService";

export default function EditMineral() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [mineral, setMineral] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadMineral();

  }, []);

  const loadMineral = async () => {

    try {

      const data = await getMineral(id);

      setMineral(data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const handleSubmit = async (formData) => {

    try {

      await updateMineral(id, formData);

      alert("Mineral Updated");

      navigate("/minerals");

    } catch (err) {

      console.log(err);

      alert("Update Failed");

    }

  };

  return (

    <AdminLayout>

      <h2 className="mb-4">

        Edit Mineral

      </h2>

      {loading ? (

        <h4>Loading...</h4>

      ) : (

        <MineralForm

          initialData={mineral}

          onSubmit={handleSubmit}

        />

      )}

    </AdminLayout>

  );

}