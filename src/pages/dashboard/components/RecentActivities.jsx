import {

    FaUserPlus,
    FaProjectDiagram,

} from "react-icons/fa";

import "./RecentActivities.css";

export default function RecentActivities({

    recentProjects,

    recentEmployees,

}) {

    const activities = [

        ...(recentProjects || []).map(project => ({

            id: project._id,

            icon: <FaProjectDiagram />,

            title: "New Project Added",

            description: project.projectName,

            time: new Date(

                project.createdAt

            ).toLocaleDateString(),

            color: "#198754",

        })),

        ...(recentEmployees || []).map(employee => ({

            id: employee._id,

            icon: <FaUserPlus />,

            title: "New Employee Joined",

            description: `${employee.fullName} • ${employee.designation}`,

            time: new Date(

                employee.createdAt

            ).toLocaleDateString(),

            color: "#0D6EFD",

        })),

    ];

    activities.sort(

        (a, b) =>

            new Date(b.time) -

            new Date(a.time)

    );

    return (

        <div className="activities-card">

            <div className="activities-header">

                <h3>

                    Recent Activities

                </h3>

            </div>

            <div className="activities-list">

                {

                    activities.length === 0 ?

                    (

                        <div className="empty-activity">

                            No Recent Activity

                        </div>

                    )

                    :

                    (

                        activities.map(activity => (

                            <div

                                className="activity-item"

                                key={activity.id}

                            >

                                <div

                                    className="activity-icon"

                                    style={{

                                        background:

                                            activity.color,

                                    }}

                                >

                                    {activity.icon}

                                </div>

                                <div className="activity-content">

                                    <h4>

                                        {activity.title}

                                    </h4>

                                    <p>

                                        {activity.description}

                                    </p>

                                </div>

                                <span className="activity-time">

                                    {activity.time}

                                </span>

                            </div>

                        ))

                    )

                }

            </div>

        </div>

    );

}