import {
    FaEnvelope,
    FaProjectDiagram,
    FaUsers,
    FaBell,
} from "react-icons/fa";

import "./Notifications.css";

export default function Notifications({

    statistics,

    recentProjects,

    recentEmployees,

}) {

    const notifications = [

        {
            id: 1,
            icon: <FaEnvelope />,
            title: "Contact Messages",
            message: `${statistics?.totalMessages || 0} message(s) waiting for response.`,
            color: "#0D6EFD",
        },

        {
            id: 2,
            icon: <FaProjectDiagram />,
            title: "Active Projects",
            message: `${statistics?.activeProjects || 0} active mining projects.`,
            color: "#198754",
        },

        ...(recentProjects || []).slice(0, 2).map((project) => ({

            id: project._id,

            icon: <FaProjectDiagram />,

            title: "New Project",

            message: `${project.projectName} added successfully.`,

            color: "#C9A227",

        })),

        ...(recentEmployees || []).slice(0, 2).map((employee) => ({

            id: employee._id,

            icon: <FaUsers />,

            title: "New Employee",

            message: `${employee.fullName} joined as ${employee.designation}.`,

            color: "#6F42C1",

        })),

    ];

    return (

        <div className="notifications-card">

            <div className="notifications-header">

                <h3>

                    Notifications

                </h3>

                <span className="notification-count">

                    {notifications.length}

                </span>

            </div>

            <div className="notifications-list">

                {

                    notifications.length === 0 ?

                    (

                        <div className="empty-notification">

                            <FaBell />

                            <p>

                                No Notifications

                            </p>

                        </div>

                    )

                    :

                    (

                        notifications.map((notification) => (

                            <div

                                className="notification-item"

                                key={notification.id}

                            >

                                <div

                                    className="notification-icon"

                                    style={{

                                        background: notification.color,

                                    }}

                                >

                                    {notification.icon}

                                </div>

                                <div className="notification-content">

                                    <h4>

                                        {notification.title}

                                    </h4>

                                    <p>

                                        {notification.message}

                                    </p>

                                </div>

                            </div>

                        ))

                    )

                }

            </div>

        </div>

    );

}