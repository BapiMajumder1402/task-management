import { Task } from "../models/task.model.js";
import { ApiResponse } from "../utils/apiResponse.js"; 
import { ApiError } from "../utils/apiErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const createTask = asyncHandler(async (req, res) => {
    const { title, description, status, dueDate } = req.body;

    if (!title) {
        throw new ApiError(400, "Title is required");
    }
    if (!description) {
        throw new ApiError(400, "Description is required");
    }

    const task = new Task({
        title,
        description,
        status,
        dueDate,
        owner: req.user._id, 
    });

    await task.save();

    res.status(201).json(new ApiResponse(201, task, "Task created successfully"));
});

export const getTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find({ owner: req.user._id });

    res.status(200).json(new ApiResponse(200, tasks, "Tasks retrieved successfully"));
});


export const getTaskById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, owner: req.user._id });

    if (!task) {
        throw new ApiError(404, "Task not found or unauthorized");
    }

    res.status(200).json(new ApiResponse(200, task, "Task retrieved successfully"));
});


export const updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const task = await Task.findOne({ _id: id, owner: req.user._id });

    if (!task) {
        throw new ApiError(404, "Task not found or unauthorized");
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;

    await task.save();

    res.status(200).json(new ApiResponse(200, task, "Task updated successfully"));
});


export const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id, owner: req.user._id });

    if (!task) {
        throw new ApiError(404, "Task not found or unauthorized");
    }

    res.status(200).json(new ApiResponse(200, null, "Task deleted successfully"));
});
