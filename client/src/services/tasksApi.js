import axiosInstance from "../utils/axiosInstance";

const TASK_API_URL = '/api/tasks'; 

export const createTask = async (taskData) => {
    const response = await axiosInstance.post(TASK_API_URL, taskData);
    return response.data;
};

export const getTasks = async () => {
    const response = await axiosInstance.get(TASK_API_URL);
    return response.data;
};

export const getTaskById = async (taskId) => {
    const response = await axiosInstance.get(`${TASK_API_URL}/${taskId}`);
    return response.data;
};

export const updateTask = async (taskId, taskData) => {
    const response = await axiosInstance.put(`${TASK_API_URL}/${taskId}`, taskData);
    return response.data;
};

export const deleteTask = async (taskId) => {
    const response = await axiosInstance.delete(`${TASK_API_URL}/${taskId}`);
    return response.data;
};
