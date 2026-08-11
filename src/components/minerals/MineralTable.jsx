import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

import StatusBadge from "./StatusBadge";
import { deleteMineral } from "../../services/mineralService";

export default function MineralTable({
  minerals,
  loading,
  refresh,
}) {

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mineral?"
    );

    if (!confirmDelete) return;

    try {

      await deleteMineral(id);

      alert("Mineral deleted successfully.");

      refresh();

    } catch (err) {

      console.error(err);

      alert("Failed to delete mineral.");

    }

  };

  if (loading) {

    return (

      <div className="text-center py-5">

        <div
          className="spinner-border text-warning"
          role="status"
        ></div>

        <p className="mt-3">
          Loading Minerals...
        </p>

      </div>

    );

  }

  if (!minerals.length) {

    return (

      <div className="text-center py-5">

        <h4>No Minerals Found</h4>

        <Link
          to="/minerals/add"
          className="btn btn-warning mt-3"
        >
          + Add Mineral
        </Link>

      </div>

    );

  }

  return (

    <div className="table-responsive">

      <table className="table table-hover align-middle">

        <thead className="table-dark">

          <tr>

            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Created</th>
            <th width="170">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {minerals.map((mineral) => (

            <tr key={mineral._id}>

              <td>

                <img
                  src={
                    mineral.image ||
                    "https://placehold.co/70x70?text=No+Image"
                  }
                  alt={mineral.name}
                  width={70}
                  height={70}
                  style={{
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

              </td>

              <td>

                <strong>
                  {mineral.name}
                </strong>

              </td>

              <td>
                {mineral.category}
              </td>

              <td>

                <StatusBadge
                  status={mineral.status}
                />

              </td>

              <td>

                {mineral.createdAt
                  ? new Date(
                      mineral.createdAt
                    ).toLocaleDateString()
                  : "-"}

              </td>

              <td>

                <div className="d-flex gap-2">

                  <Link
                    to={`/minerals/view/${mineral._id}`}
                    className="btn btn-info btn-sm"
                  >
                    <FaEye />
                  </Link>

                  <Link
                    to={`/minerals/edit/${mineral._id}`}
                    className="btn btn-warning btn-sm"
                  >
                    <FaEdit />
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDelete(mineral._id)
                    }
                  >
                    <FaTrash />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}