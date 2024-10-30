import axiosInstance from "../utils/axiosInstance";

const TASK_API_URL = '/api/tasks'; 

export const createTask = async (taskData) => {
    const response = await axiosInstance.post(TASK_API_URL, taskData);
    return response.data;
};

export const getTasks = async (page = 1, pageSize = 10, title = '', status = '', sort = 'dsc') => {
    try {
        const response = await axiosInstance.get(TASK_API_URL, {
            params: {
                page,
                pageSize,
                title,
                status,
                sort,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error; 
    }
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
