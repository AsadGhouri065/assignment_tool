import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/users/login`, { username, password });
    return response.data;
};

export const getNextEvent = async () => {
    const response = await axios.get(`${API_URL}/events/next`);
    return response.data;
};

export const submitAnnotation = async (data) => {
    const response = await axios.post(`${API_URL}/annotations`, data);
    return response.data;
};

export const lookupPlate = async (plateNumber) => {
    const response = await axios.post(`${API_URL}/dmv/lookup`, { plateNumber });
    return response.data;
};
