import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({

    children,

}) {

    const {

        user,

        loading,

    } = useAuth();

    if (loading) {

        return (

            <div
                style={{
                    display: "grid",
                    placeItems: "center",
                    height: "100vh",
                    fontSize: 20,
                }}
            >

                Loading...

            </div>

        );

    }

    if (!user) {

        return <Navigate to="/login" replace />;

    }

    return children;

}