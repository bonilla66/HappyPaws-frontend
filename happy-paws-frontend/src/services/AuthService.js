import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const login = async (credentials) => {
  return await axios.post(`${API_URL}/login`, credentials);
};


export const register = async (userData) => {
  try {
    const response = await axios.post('/api/auth/register', userData);
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
}
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};
