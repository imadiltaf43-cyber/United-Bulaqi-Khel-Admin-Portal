import API from "./api";

export const getSustainabilityEvents = async () => {
  const { data } = await API.get("/sustainability-events/admin");
  return data;
};

export const getSustainabilityEvent = async (id) => {
  const { data } = await API.get(`/sustainability-events/${id}`);
  return data;
};

export const createSustainabilityEvent = async (formData) => {
  const { data } = await API.post("/sustainability-events", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateSustainabilityEvent = async (id, formData) => {
  const { data } = await API.put(`/sustainability-events/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteSustainabilityEvent = async (id) => {
  const { data } = await API.delete(`/sustainability-events/${id}`);
  return data;
};
