import api from "./api";
import {
  normalizeApplicationPayload,
  normalizeEntityPayload,
  normalizeJobPayload,
} from "./careersPayload";

// =========================================
// Get All Jobs
// =========================================

export const getJobs = async (params = {}) => {
  const response = await api.get("/jobs", {
    params,
  });

  return normalizeJobPayload(response.data);
};

// =========================================
// Get Single Job
// =========================================

export const getJob = async (id) => {
  const response = await api.get(`/jobs/${id}`);

  return normalizeEntityPayload(response.data, "job");
};

// =========================================
// Create Job
// =========================================

export const createJob = async (payload) => {
  const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;

  const response = await api.post("/jobs", payload, {
    headers: isFormData
      ? {
          "Content-Type": "multipart/form-data",
        }
      : {
          "Content-Type": "application/json",
        },
  });

  return response.data;
};

// =========================================
// Update Job
// =========================================

export const updateJob = async (id, payload) => {
  const isFormData = typeof FormData !== "undefined" && payload instanceof FormData;

  const response = await api.put(`/jobs/${id}`, payload, {
    headers: isFormData
      ? {
          "Content-Type": "multipart/form-data",
        }
      : {
          "Content-Type": "application/json",
        },
  });

  return response.data;
};

// =========================================
// Delete Job
// =========================================

export const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/${id}`);

  return response.data;
};

// =========================================
// Applications
// =========================================

export const getApplications = async () => {
  const response = await api.get("/job-applications");

  return normalizeApplicationPayload(response.data);
};

export const getApplication = async (id) => {
  const response = await api.get(`/job-applications/${id}`);

  return normalizeEntityPayload(response.data, "application");
};

export const updateApplicationStatus = async (id, status) => {
  const response = await api.put(`/job-applications/${id}`, {
    status,
  });

  return response.data;
};


export const getApplicationsByJob = async (jobId) => {
  const response = await api.get(
    `/job-applications/job/${jobId}`
  );

  return normalizeApplicationPayload(response.data);
};

export const deleteApplication = async (id) => {

  const response = await api.delete(`/job-applications/${id}`);

  return response.data;

};