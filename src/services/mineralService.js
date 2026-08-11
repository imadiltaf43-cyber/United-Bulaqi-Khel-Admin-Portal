import api from "./api";

export const getMinerals = async () => {
  const res = await api.get("/minerals");
  return res.data;
};

export const getMineral = async (id) => {
  const res = await api.get(`/minerals/${id}`);
  return res.data;
};

export const createMineral = async (data) => {
  const res = await api.post("/minerals", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const updateMineral = async (id, data) => {
  const res = await api.put(`/minerals/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const deleteMineral = async (id) => {
  return await api.delete(`/minerals/${id}`);
};