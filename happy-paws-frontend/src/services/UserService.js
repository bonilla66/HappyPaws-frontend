import api from "./api"; 


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
