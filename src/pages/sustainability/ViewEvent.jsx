import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaMapMarkerAlt,
    FaLayerGroup,
    FaCalendarAlt,
    FaInfoCircle,
} from "react-icons/fa";

import AdminLayout from "../../layouts/AdminLayout";

import { getEvent } from "../../services/eventService";

import { toast } from "../../utils/toast";

import "./Events.css";

export default function ViewEvent() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [event, setEvent] = useState(null);

    useEffect(() => {

        loadEvent();

    }, []);

    const loadEvent = async () => {

        try {

            const data = await getEvent(id);

            setEvent(data);

        }

        catch {

            toast.error("Failed to load event.");

        }

    };

    // ---- Loading state ----

    if (!event) {

        return (
            <AdminLayout>
                <div className="loading-page">
                    Loading...
                </div>
            </AdminLayout>
        );

    }

    // ---- Render ----

    return (

        <AdminLayout>

            <div className="event-view-page">

                <div className="page-top">

                    <div>

                        <h2>{event.title}</h2>

                        <p>Event Details</p>

                    </div>

                    <button
                        className="secondary-btn"
                        onClick={() => navigate("/sustainability")}
                    >
                        Back
                    </button>

                </div>

                {/* Gallery */}

                <div className="event-gallery-card">

                    <h3>Gallery</h3>

                    <div className="event-gallery-grid">

                        {event.gallery && event.gallery.length > 0 ? (

                            event.gallery.map((image, index) => (

                                <img
                                    key={index}
                                    src={image.url}
                                    alt={`${event.title}-${index}`}
                                />

                            ))

                        ) : (

                            <p>No images uploaded.</p>

                        )}

                    </div>

                </div>

                {/* Details */}

                <div className="event-details-grid">

                    <div className="event-detail-card">

                        <h3>Event Information</h3>

                        <div className="event-detail-item">

                            <FaLayerGroup />

                            <span>

                                <strong>Category: </strong>

                                {event.category}

                            </span>

                        </div>

                        <div className="event-detail-item">

                            <FaMapMarkerAlt />

                            <span>

                                <strong>Location: </strong>

                                {event.location || "N/A"}

                            </span>

                        </div>

                        <div className="event-detail-item">

                            <FaCalendarAlt />

                            <span>

                                <strong>Date: </strong>

                                {event.date
                                    ? new Date(event.date).toLocaleDateString()
                                    : "—"}

                            </span>

                        </div>

                        <div className="event-detail-item">

                            <FaInfoCircle />

                            <span>

                                <strong>Status: </strong>

                            </span>

                            <span className={`status-pill ${event.status.toLowerCase().replace(" ", "-")}`}>

                                {event.status}

                            </span>

                        </div>

                    </div>

                </div>

                {/* Description */}

                <div className="event-remarks-card">

                    <h3>Description</h3>

                    <p>{event.description}</p>

                </div>

            </div>

        </AdminLayout>

    );

}
