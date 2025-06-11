import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const login = async (credentials) => {
  return await axios.post(`${API_URL}/login`, credentials);
};

export const register = (userData) => axios.post(`${API_URL}/register`, userData);

export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
};
