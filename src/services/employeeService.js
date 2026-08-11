import API from "./api";

export const getEmployees = async () => {
    const res = await API.get("/employees");
    return res.data;
};

export const getEmployee = async (id) => {
    const res = await API.get(`/employees/${id}`);
    return res.data;
};

export const createEmployee = async (data) => {
    const res = await API.post("/employees", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};

export const updateEmployee = async (id, data) => {
    const res = await API.put(`/employees/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};

export const deleteEmployee = async (id) => {
    const res = await API.delete(`/employees/${id}`);
    return res.data;
};