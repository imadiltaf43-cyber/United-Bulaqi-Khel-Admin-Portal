import API from "./api";

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getProfile = () =>
    API.get("/profile", authHeader());

export const updateProfile = (data) =>
    API.put("/profile", data, authHeader());

export const changePassword = (data) =>
    API.put(
        "/profile/change-password",
        data,
        authHeader()
    );

// ==========================
// Change Email
// ==========================

export const sendEmailOtp = (data) =>
    API.put(
        "/profile/send-email-otp",
        data,
        authHeader()
    );

export const verifyEmailOtp = (data) =>
    API.put(
        "/profile/verify-email-otp",
        data,
        authHeader()
    );

export const changeEmail = (data) =>
    API.put(
        "/profile/change-email",
        data,
        authHeader()
    );