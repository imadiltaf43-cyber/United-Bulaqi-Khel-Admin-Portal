import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";
import DashboardCards from "./components/DashboardCards";
import DashboardCharts from "./components/DashboardCharts";
import RecentActivities from "./components/RecentActivities";
import Notifications from "./components/Notifications";

import { getDashboard } from "../../services/dashboardService";

import "./Dashboard.css";

export default function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const data = await getDashboard();

            setDashboard(data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading)

        return <div className="loading">Loading Dashboard...</div>;

    return (

        <AdminLayout>

            <div className="dashboard-page">

                <DashboardCards

                    statistics={dashboard.statistics}

                />

                <DashboardCharts

                    analytics={dashboard.analytics || dashboard.statistics}

                />

                <div className="dashboard-bottom">

                    <RecentActivities

                        recentProjects={dashboard.recentProjects}

                        recentEmployees={dashboard.recentEmployees}

                    />

                    <Notifications

                        statistics={dashboard.statistics}
                        recentProjects={dashboard.recentProjects}
                        recentEmployees={dashboard.recentEmployees}

                    />

                </div>

            </div>

        </AdminLayout>

    );

}