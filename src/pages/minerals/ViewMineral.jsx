import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";

import { getMineral } from "../../services/mineralService";

export default function ViewMineral() {

    const { id } = useParams();

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

    if (loading) {

        return (

            <AdminLayout>

                <h3>Loading...</h3>

            </AdminLayout>

        );

    }

    return (

        <AdminLayout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Mineral Details</h2>

                <Link
                    className="btn btn-warning"
                    to={`/minerals/edit/${mineral._id}`}
                >
                    Edit Mineral
                </Link>

            </div>

            <div className="card shadow-sm">

                <div className="card-body">

                    {mineral.image && (

                        <img
                            src={mineral.image}
                            className="img-fluid rounded mb-4"
                            style={{ maxHeight: "350px" }}
                        />

                    )}

                    <table className="table">

                        <tbody>

                            <tr>

                                <th width="200">

                                    Name

                                </th>

                                <td>

                                    {mineral.name}

                                </td>

                            </tr>

                            <tr>

                                <th>

                                    Category

                                </th>

                                <td>

                                    {mineral.category}

                                </td>

                            </tr>

                            <tr>

                                <th>

                                    Status

                                </th>

                                <td>

                                    {mineral.status}

                                </td>

                            </tr>

                            <tr>

                                <th>

                                    Short Description

                                </th>

                                <td>

                                    {mineral.shortDescription}

                                </td>

                            </tr>

                            <tr>

                                <th>

                                    Description

                                </th>

                                <td>

                                    {mineral.description}

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </AdminLayout>

    );

}