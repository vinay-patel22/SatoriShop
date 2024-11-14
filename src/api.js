import axios from "axios";

const API_URL = "http://localhost:3001/api"; // Replace with your backend URL

export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/users/signup`, userData);
  localStorage.setItem("token", response.data.token); // Store JWT
  return response;
};

// Save token to localStorage after login/signup
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/users/login`, userData);
  localStorage.setItem("token", response.data.token); // Store JWT
  return response;
};

export const getAllUsers = (token) =>
  axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getUserById = (id, token) =>
  axios.get(`${API_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateUser = (id, userData, token) =>
  axios.put(`${API_URL}/users/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const deleteUser = (id, token) =>
  axios.delete(`${API_URL}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
