import axios from "axios";

export const submitApplication = async (data, token) => {
  return await axios.post("http://localhost:8080/aplication/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const updateAplicationState = (id, newState) => {
  return api.put(`/aplication/${id}`, { aplicationStatus: newState });
};

export const deleteAplication = (id) => {
  return api.delete(`/aplication/${id}`);
};
