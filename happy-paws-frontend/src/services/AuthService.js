import api from "./api";

const AUTH_URL = "/auth";

export const login = async (credentials) => {
   await api.post(`${AUTH_URL}/login`, credentials);
   const response = await api.get(`${AUTH_URL}/me`);
  return response.data;
};

export const register = async (userData) => {
  try {
    const response = await api.post(`${AUTH_URL}/register`, userData);
    return response.data;

  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 400) {
        if (data.errors) {
          throw {
            type: 'validation',
            message: data.message || 'Validation errors',
            errors: data.errors
          };
        } else {
          // Otro tipo de error 400
          throw {
            type: 'api',
            message: data.message || 'Bad request'
          };
        }
      }
    }
    // Error de red o servidor no disponible
    throw {
      type: 'network',
      message: 'Network error. Please check your connection.'
    };
  }
};



export const logout = async () => {
  return await api.post(`${AUTH_URL}/logout`);
};

