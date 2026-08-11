import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import axios from "axios";

import {
    getWebsiteSettings,
    updateWebsiteSettings,
    uploadHeroVideo,
} from "../../services/websiteSettingService";

import "./WebsiteSettings.css";

export default function WebsiteSettings() {



    const [videoFile, setVideoFile] = useState(null);

    const [uploadingVideo, setUploadingVideo] = useState(false);

    const [loading, setLoading] = useState(true);

    const [settings, setSettings] = useState({

        heroStats: {
            yearsExperience: "",
            miningSites: "",
            annualOutput: "",
            skilledEmployees: "",
        },

        heroVideo: {
            url: "",
            public_id: "",
        },

        aboutStats: {
            yearsExperience: "",
            miningSites: "",
            skilledEmployees: "",
            happyClients: "",
        },

        projectStats: {
            projectsCompleted: "",
            activeProjects: "",
            annualOutput: "",
            commitment: "",
        },

        footer: {
            companyDescription: "",
            phone: "",
            email: "",
            address: "",
            facebook: "",
            linkedin: "",
            youtube: "",
            copyright: "",
        },

    });

    useEffect(() => {

        loadSettings();

    }, []);

    const loadSettings = async () => {

        try {

            const res = await getWebsiteSettings();

            if (res?.settings) {

                setSettings(res.settings);

            }

        }

        catch (err) {

            console.error(err);

        }

        finally {

            setLoading(false);

        }

    };

const saveSettings = async () => {

    try {

        await updateWebsiteSettings(settings);

        await updateHeroVideo(settings.heroVideo);

        alert("Website Settings Updated Successfully.");

    }

    catch (err) {

        console.error(err);

        alert("Something went wrong.");

    }

};

const handleVideoUpload = async () => {

    if (!videoFile) {

        alert("Please select a video.");

        return;

    }

    try {

        setUploadingVideo(true);

        const data = await uploadHeroVideo(videoFile);

        setSettings((prev) => ({

            ...prev,

            heroVideo: data.heroVideo,

        }));

        alert("Hero video uploaded successfully.");

    }

    catch (err) {

        console.error(err);

        alert("Video upload failed.");

    }

    finally {

        setUploadingVideo(false);

    }

};

    return (

        <AdminLayout>

            <div className="page-header">

                <h2>Website Settings</h2>

                <p>
                    Manage website content from one place.
                </p>

            </div>

            {

                loading

                ?

                (

                    <div className="text-center py-5">

                        Loading...

                    </div>

                )

                :

                (

                    <div>

                        <form onSubmit={(e) => e.preventDefault()}>

    {/* ================= HERO STATS ================= */}

    <div className="settings-card">

        <h3>Hero Statistics</h3>

        <div className="settings-grid">

            <div className="form-group">

                <label>Years of Excellence</label>

                <input
                    type="number"
                    value={settings.heroStats.yearsExperience}
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            heroStats: {
                                ...settings.heroStats,
                                yearsExperience: e.target.value,
                            },
                        })
                    }
                />

            </div>

            <div className="form-group">

                <label>Mining & Quarry Sites</label>

                <input
                    type="number"
                    value={settings.heroStats.miningSites}
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            heroStats: {
                                ...settings.heroStats,
                                miningSites: e.target.value,
                            },
                        })
                    }
                />

            </div>

            <div className="form-group">

                <label>Annual Output</label>

                <input
                    type="text"
                    value={settings.heroStats.annualOutput}
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            heroStats: {
                                ...settings.heroStats,
                                annualOutput: e.target.value,
                            },
                        })
                    }
                />

            </div>

            <div className="form-group">

                <label>Skilled Employees</label>

                <input
                    type="number"
                    value={settings.heroStats.skilledEmployees}
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            heroStats: {
                                ...settings.heroStats,
                                skilledEmployees: e.target.value,
                            },
                        })
                    }
                />

            </div>
        </div>
    </div>
{/* ================= HERO VIDEO ================= */}

<div className="settings-card">

    <h3>Hero Video</h3>

    <div className="form-group">

        <label>Select Hero Video</label>

        <input
            type="file"
            accept="video/mp4,video/webm,video/*"
            onChange={(e) => {

                if (e.target.files.length > 0) {

                    setVideoFile(e.target.files[0]);

                }

            }}
        />

    </div>

    {

        videoFile && (

            <div
                style={{
                    marginTop: "15px",
                }}
            >

                <strong>Selected File:</strong>

                <p>{videoFile.name}</p>

            </div>

        )

    }

    <button
        type="button"
        className="save-btn"
        onClick={handleVideoUpload}
        disabled={uploadingVideo}
        style={{
            marginTop: "20px",
        }}
    >

        {

            uploadingVideo

                ? "Uploading..."

                : "Upload Hero Video"

        }

    </button>

    {

        settings.heroVideo?.url && (

            <div
                style={{
                    marginTop: "30px",
                }}
            >

                <h4
                    style={{
                        marginBottom: "15px",
                    }}
                >
                    Current Hero Video
                </h4>

                <video
                    controls
                    width="100%"
                    style={{
                        borderRadius: "12px",
                    }}
                >

                    <source
                        src={settings.heroVideo.url}
                        type="video/mp4"
                    />

                    Your browser does not support the video tag.

                </video>

            </div>

        )

    }

</div>

{/* ================= ABOUT STATS ================= */}

<div className="settings-card">

    <h3>About Statistics</h3>

    <div className="settings-grid">

        <div className="form-group">

            <label>Years of Experience</label>

            <input
                type="number"
                value={settings.aboutStats.yearsExperience}
                onChange={(e) =>
                    setSettings({
                        ...settings,
                        aboutStats: {
                            ...settings.aboutStats,
                            yearsExperience: e.target.value,
                        },
                    })
                }
            />

        </div>

        <div className="form-group">

            <label>Mining Sites</label>

            <input
                type="number"
                value={settings.aboutStats.miningSites}
                onChange={(e) =>
                    setSettings({
                        ...settings,
                        aboutStats: {
                            ...settings.aboutStats,
                            miningSites: e.target.value,
                        },
                    })
                }
            />

        </div>

        <div className="form-group">

            <label>Skilled Employees</label>

            <input
                type="number"
                value={settings.aboutStats.skilledEmployees}
                onChange={(e) =>
                    setSettings({
                        ...settings,
                        aboutStats: {
                            ...settings.aboutStats,
                            skilledEmployees: e.target.value,
                        },
                    })
                }
            />

        </div>

        <div className="form-group">

            <label>Happy Clients</label>

            <input
                type="number"
                value={settings.aboutStats.happyClients}
                onChange={(e) =>
                    setSettings({
                        ...settings,
                        aboutStats: {
                            ...settings.aboutStats,
                            happyClients: e.target.value,
                        },
                    })
                }
            />

        </div>

    </div>

</div>

{/* ================= PROJECT STATS ================= */}

<div className="settings-card">

    <h3>Project Statistics</h3>

    <div className="settings-grid">

        <div className="form-group">

            <label>Projects Completed</label>

            <input
                type="text"
                value={settings.projectStats.projectsCompleted}
                onChange={(e) =>
                    setSettings({
                        ...settings,
                        projectStats: {
                            ...settings.projectStats,
                            projectsCompleted: e.target.value,
                        },
                    })
                }
            />

        </div>

        <div className="form-group">

            <label>Active Projects</label>

            <input
                type="text"
                value={settings.projectStats.activeProjects}
                onChange={(e) =>
                    setSettings({
                        ...settings,
                        projectStats: {
                            ...settings.projectStats,
                            activeProjects: e.target.value,
                        },
                    })
                }
            />

        </div>

        <div className="form-group">

            <label>Tons Output / Year</label>

            <input
                type="text"
                value={settings.projectStats.annualOutput}
                onChange={(e) =>
                    setSettings({
                        ...settings,
                        projectStats: {
                            ...settings.projectStats,
                            annualOutput: e.target.value,
                        },
                    })
                }
            />

        </div>

        <div className="form-group">

            <label>Commitment</label>

            <input
                type="text"
                value={settings.projectStats.commitment}
                onChange={(e) =>
                    setSettings({
                        ...settings,
                        projectStats: {
                            ...settings.projectStats,
                            commitment: e.target.value,
                        },
                    })
                }
            />

        </div>

    </div>

</div>

{/* ================= FOOTER SETTINGS ================= */}

<div className="settings-card">

    <h3>Footer Settings</h3>

    <div className="settings-grid">

        <div className="form-group">

            <label>Company Description</label>

            <textarea
                rows="4"
                value={settings.footer.companyDescription}
                onChange={(e) =>
                    setSettings({
                        ...settings,
                        footer: {
                            ...settings.footer,
                            companyDescription: e.target.value,
                        },
                    })
                }
            />

        </div>

        <div className="form-group">

            <label>Phone</label>

            <input
                type="text"
                value={settings.footer.phone}
                onChange={(e) =>
                    setSettings({
                        ...settings,
                        footer: {
                            ...settings.footer,
                            phone: e.target.value,
                        },
                    })
                }
            />

        </div>

        <div className="form-group">

            <label>Email</label>

            <input
                type="email"
                value={settings.footer.email}
                onChange={(e) =>
                    setSettings({
                        ...settings,
                        footer: {
                            ...settings.footer,
                            email: e.target.value,
                        },
                    })
                }
            />

        </div>

        <div className="form-group">

            <label>Address</label>

            <input
                type="text"
                value={settings.footer.address}
                onChange={(e) =>
                    setSettings({
                        ...settings,
                        footer: {
                            ...settings.footer,
                            address: e.target.value,
                        },
                    })
                }
            />

        </div>

        <div className="form-group">

            <label>Facebook</label>

            <input
                type="text"
                value={settings.footer.facebook}
                onChange={(e) =>
                    setSettings({
                        ...settings,
                        footer: {
                            ...settings.footer,
                            facebook: e.target.value,
                        },
                    })
                }
            />

        </div>

        <div className="form-group">

            <label>LinkedIn</label>

            <input
                type="text"
                value={settings.footer.linkedin}
                onChange={(e) =>
                    setSettings({
                        ...settings,
                        footer: {
                            ...settings.footer,
                            linkedin: e.target.value,
                        },
                    })
                }
            />

        </div>

        <div className="form-group">

            <label>YouTube</label>

            <input
                type="text"
                value={settings.footer.youtube}
                onChange={(e) =>
                    setSettings({
                        ...settings,
                        footer: {
                            ...settings.footer,
                            youtube: e.target.value,
                        },
                    })
                }
            />

        </div>

        <div className="form-group">

            <label>Copyright</label>

            <input
                type="text"
                value={settings.footer.copyright}
                onChange={(e) =>
                    setSettings({
                        ...settings,
                        footer: {
                            ...settings.footer,
                            copyright: e.target.value,
                        },
                    })
                }
            />

        </div>

    </div>

    <div className="text-end mt-4">

        <button
            type="button"
            className="save-btn"
            onClick={saveSettings}
        >
            Save Website Settings
        </button>

    </div>

</div>





    <div className="text-end">

    <button
        type="button"
        className="save-btn"
        onClick={saveSettings}
    >
        Save Changes
    </button>

</div>

</form>


                    </div>

                )

            }

        </AdminLayout>

    );

}