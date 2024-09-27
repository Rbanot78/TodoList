import axios from 'axios';

// Set your backend API URL here
const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getTask = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createTask = async (newTask) => {
    const response = await axios.post(API_URL, newTask);
    return response.data;
};

export const updateTask = async (id, updatedTask) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedTask);
    return response.data;
};

export const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
