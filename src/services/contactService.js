import API from "./api";

// ======================================
// Submit Contact Form
// ======================================

export const submitContact = async (payload) => {

    const { data } = await API.post(

        "/contact",

        payload

    );

    return data;

};

// ======================================
// Get All Messages
// ======================================

export const getMessages = async () => {

    const { data } = await API.get(

        "/contact"

    );

    return data;

};

// ======================================
// Get Single Message
// ======================================

export const getMessage = async (id) => {

    const { data } = await API.get(

        `/contact/${id}`

    );

    return data;

};

// ======================================
// Update Status
// ======================================

export const updateMessageStatus = async (

    id,

    status

) => {

    const { data } = await API.patch(

        `/contact/${id}/status`,

        {

            status,

        }

    );

    return data;

};

// ======================================
// Delete Message
// ======================================

export const deleteMessage = async (id) => {

    const { data } = await API.delete(

        `/contact/${id}`

    );

    return data;

};