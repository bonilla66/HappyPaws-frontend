import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const fetchAllPets = async (status = null) => {
  try {
    let url = `${API_BASE_URL}/pets/all`;
    if (status) {
      url += `?status=${encodeURIComponent(status)}`;
    }

    const token = localStorage.getItem('token');
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener mascotas:', error);
    throw error;
  }
};

export const fetchPetById = async (id, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error al obtener la mascota:', error);
    throw error;
  }
};
