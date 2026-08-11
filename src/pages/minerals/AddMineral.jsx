import { useNavigate } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import MineralForm from "../../components/minerals/MineralForm";

import { createMineral } from "../../services/mineralService";

export default function AddMineral() {

    const navigate = useNavigate();

    const handleSubmit = async (data) => {

        try {

            await createMineral(data);

            alert("Mineral Created");

            navigate("/minerals");

        } catch (err) {
                console.error(err);

                console.log("Response:", err.response);
                console.log("Data:", err.response?.data);

                alert(err.response?.data?.message || "Something went wrong");
            }

    };

    return (

        <AdminLayout>

            <h2 className="mb-4">

                Add Mineral

            </h2>

            <MineralForm
                onSubmit={handleSubmit}
            />

        </AdminLayout>

    );

}