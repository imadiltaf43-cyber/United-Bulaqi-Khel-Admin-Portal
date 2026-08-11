import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaMapMarkerAlt,
    FaLayerGroup,
    FaMountain,
    FaCalendarAlt,
    FaRulerCombined,
    FaChartLine,
    FaMapMarkedAlt
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";

import { getProject } from "../../services/projectService";

import { toast } from "../../utils/toast";

import "./Projects.css";

export default function ViewProject() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [project, setProject] = useState(null);

    useEffect(() => {

        loadProject();

    }, []);

    const loadProject = async () => {

        try {

            const data = await getProject(id);

            setProject(data);

        }

        catch {

            toast.error("Failed to load project.");

        }

    };

    if (!project) {

        const coverImage =
    project?.gallery?.length > 0
        ? project.gallery[0].url
        : "/project.png";

        

        return (
            <AdminLayout>
                <div className="loading-page">
                    Loading...
                </div>
            </AdminLayout>
        );

    }

    return (

        <AdminLayout>

            <div className="project-view-page">

                <div className="page-top">

                    <div>

                        <h2>{project.projectName}</h2>

                        <p>Project Details</p>

                    </div>

                    <button
                        className="secondary-btn"
                        onClick={() => navigate("/projects")}
                    >
                        Back
                    </button>

                </div>

                <div className="project-gallery-card">

                        <h3>Gallery</h3>

                        <div className="gallery-grid">

                        {project.gallery && project.gallery.length > 0 ? (

                        project.gallery.map((image, index) => (

                    <img
                         key={index}
                         src={image.url}
                         alt={`${project.projectName}-${index}`}
                         className="gallery-image"
                    />

            ))

        ) : (

            <p>No images uploaded.</p>

        )}

    </div>

</div>

                <div className="details-grid">

                    <div className="detail-card">

                        <h3>Project Information</h3>

                        <div className="detail-item">

                            <FaLayerGroup />

                            <span>

                                <strong>Category:</strong>

                                {project.category}

                            </span>

                        </div>

                        <div className="detail-item">

                            <FaMountain />

                            <span>

                                <strong>Project Type:</strong>

                                {project.projectType}

                            </span>

                        </div>

                        <div className="detail-item">

                            <FaMapMarkerAlt />

                            <span>

                                <strong>Location:</strong>

                                {project.location}

                            </span>

                        </div>

                        <div className="detail-item">

                            <FaMapMarkedAlt />

                            <span>

                                <strong>Coordinates:</strong>

                                {project.coordinates}

                            </span>

                        </div>

                    </div>

                    <div className="detail-card">

                        <h3>Production Details</h3>

                        <div className="detail-item">

                            <FaChartLine />

                            <span>

                                <strong>Annual Output:</strong>

                                {project.annualOutput}

                            </span>

                        </div>

                        <div className="detail-item">

                            <FaRulerCombined />

                            <span>

                                <strong>Area:</strong>

                                {project.area}

                            </span>

                        </div>

                        <div className="detail-item">

                            <FaCalendarAlt />

                            <span>

                                <strong>Timeline:</strong>

                                {project.timeline}

                            </span>

                        </div>

                        <div className="detail-item">

                            <span>

                                <strong>Status:</strong>

                            </span>

                            <span className={`badge ${project.status.toLowerCase().replace(" ","-")}`}>

                                {project.status}

                            </span>

                        </div>

                    </div>

                </div>

                <div className="detail-card remarks-card">

                    <h3>Description</h3>

                    <p>{project.description}</p>

                </div>

            </div>

        </AdminLayout>

    );

}