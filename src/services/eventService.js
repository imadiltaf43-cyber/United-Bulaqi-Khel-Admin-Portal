import API from "./api";

// ============================
// Get All Events (paginated)
// ============================

export const getEvents = async (
  page = 1,
  search = "",
  category = "",
  status = ""
) => {

  const { data } = await API.get("/sustainability-events/admin", {
    params: {
      page,
      search,
      category,
      status,
    },
  });

  return data;

};

// ============================
// Get Single Event
// ============================

export const getEvent = async (id) => {

  const { data } = await API.get(`/sustainability-events/${id}`);

  return data;

};

// ============================
// Create Event
// ============================

export const createEvent = async (formData) => {

  const { data } = await API.post(
    "/sustainability-events",
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
// Update Event
// ============================

export const updateEvent = async (
  id,
  formData
) => {

  const { data } = await API.put(
    `/sustainability-events/${id}`,
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
// Delete Event
// ============================

export const deleteEvent = async (id) => {

  const { data } = await API.delete(
    `/sustainability-events/${id}`
  );

  return data;

};
