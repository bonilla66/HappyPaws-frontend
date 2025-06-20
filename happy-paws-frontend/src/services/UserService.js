import api from "./api"; 
import axios from "axios";


export const updateUserProfile = async (id, data) => {
  try {
    const response = await api.patch(`/user/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error en UserService:", error.response?.data || error.message);
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al actualizar el perfil");
  }
};
export const getUserApplications = async () => {
  const res = await api.get("/aplication/by-user"); 
  return res.data;
};

export const getAcceptedApplications = async () => {
  const response = await api.get(`/aplication/accepted`);
  return response.data;
};
