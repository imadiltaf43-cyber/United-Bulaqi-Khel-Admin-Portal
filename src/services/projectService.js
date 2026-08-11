import API from "./api";

// ============================
// Get All Projects
// ============================

export const getProjects = async (
  page = 1,
  search = "",
  status = "",
  mineral = ""
) => {

  const { data } = await API.get("/projects", {
    params: {
      page,
      search,
      status,
      mineral,
    },
  });

  return data;

};

// ============================
// Get Single Project
// ============================

export const getProject = async (id) => {

  const { data } = await API.get(`/projects/${id}`);

  return data;

};

// ============================
// Create Project
// ============================

export const createProject = async (formData) => {

  const { data } = await API.post(
    "/projects",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;

};

// ============================
// Update Project
// ============================

export const updateProject = async (
  id,
  formData
) => {

  const { data } = await API.put(
    `/projects/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;

};

// ============================
// Delete Project
// ============================

export const deleteProject = async (id) => {

  const { data } = await API.delete(
    `/projects/${id}`
  );

  return data;

};