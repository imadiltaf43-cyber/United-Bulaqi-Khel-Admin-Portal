import api from "./api";

// ========================================
// Get All Investors
// ========================================

export const getInvestors = async (params = {}) => {
  const { data } = await api.get("/investors", {
    params,
  });

  return data;
};

// ========================================
// Get Single Investor
// ========================================

export const getInvestor = async (id) => {
  const { data } = await api.get(`/investors/${id}`);

  return data;
};

// ========================================
// Create Investor
// ========================================

export const createInvestor = async (investor) => {
  const { data } = await api.post(
    "/investors",
    investor
  );

  return data;
};

// ========================================
// Update Investor
// ========================================

export const updateInvestor = async (
  id,
  investor
) => {
  const { data } = await api.put(
    `/investors/${id}`,
    investor
  );

  return data;
};

// ========================================
// Delete Investor
// ========================================

export const deleteInvestor = async (id) => {
  const { data } = await api.delete(
    `/investors/${id}`
  );

  return data;
};