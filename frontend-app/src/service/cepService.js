import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const getCepInfo = async (cep, userId) => {
  const response = await axios.get(`${API_URL}/cep/${cep}`, {
    params: { userId }
  });
  return response.data;
};

export const getHistory = async (userId) => {
  const response = await axios.get(`${API_URL}/history/${userId}`);
  return response.data;
};

export const deleteCep = async (cep, userId) => {
  const response = await axios.delete(`${API_URL}/delete/${cep}`, {
    params: { userId }
  });
  return response.data;
};