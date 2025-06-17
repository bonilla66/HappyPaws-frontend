import api from "./api"; 

export const updateUserProfile = async (userId, data) => {
  try {
    const response = await api.patch(`/user/${userId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error en UserService:", error.response?.data || error.message);
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al actualizar el perfil");
  }
};
