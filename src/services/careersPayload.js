export const normalizeArrayPayload = (payload, fallback = []) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.jobs)) return payload.jobs;
  if (Array.isArray(payload?.applications)) return payload.applications;
  if (Array.isArray(payload?.items)) return payload.items;

  const nestedData = payload?.data;
  if (nestedData) {
    if (Array.isArray(nestedData.jobs)) return nestedData.jobs;
    if (Array.isArray(nestedData.applications)) return nestedData.applications;
    if (Array.isArray(nestedData.items)) return nestedData.items;
  }

  return fallback;
};

export const normalizeJobPayload = (payload) => {
  const jobs = normalizeArrayPayload(payload, []);
  const page = Number(payload?.page || payload?.data?.page || 1);
  const pages = Number(payload?.pages || payload?.data?.pages || 1);
  const total = Number(payload?.total || payload?.data?.total || jobs.length);

  return {
    jobs,
    page: Number.isFinite(page) && page > 0 ? page : 1,
    pages: Number.isFinite(pages) && pages > 0 ? pages : 1,
    total,
  };
};

export const normalizeApplicationPayload = (payload) => ({
  applications: normalizeArrayPayload(payload, []),
});

export const normalizeEntityPayload = (payload, key = "data") => {
  if (payload?.[key]) return payload[key];
  if (payload?.data?.[key]) return payload.data[key];
  if (payload?.data && !Array.isArray(payload.data)) return payload.data;
  return payload;
};
