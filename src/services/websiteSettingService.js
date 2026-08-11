import api from "./api";

// ======================================
// Get Website Settings
// ======================================

export const getWebsiteSettings = async () => {

    const response = await api.get(
        "/website-settings"
    );

    return response.data;

};

// ======================================
// Update Website Settings
// ======================================

export const updateWebsiteSettings = async (settings) => {

    const response = await api.put(
        "/website-settings",
        settings
    );

    return response.data;

};

// ======================================
// Update Hero Video
// ======================================

export const uploadHeroVideo = async (videoFile) => {

    const formData = new FormData();

    formData.append("heroVideo", videoFile);

    const response = await api.put(
        "/website-settings/hero-video",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};