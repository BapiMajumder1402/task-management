import { Task } from "../modals/tasks.model.js";
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
    const { page = 1, pageSize = 10, title, status, sort = 'asc' } = req.query;

    const query = { owner: req.user._id };

    if (title) {
        query.title = { $regex: title, $options: 'i' };
    }

    if (status) {
        query.status = status;
    }

    const skip = (page - 1) * pageSize;
    const sortOrder = sort === 'asc' ? 1 : -1; 
    const sortBy = { createdAt: sortOrder }; 

    const tasks = await Task.find(query)
        .sort(sortBy)
        .skip(skip)
        .limit(Number(pageSize));

    const totalCount = await Task.countDocuments(query);
    const totalPages = Math.ceil(totalCount / pageSize);
    res.status(200).json(new ApiResponse(200, {
        tasks,
        totalCount,
        totalPages,
        page: Number(page),
        pageSize: Number(pageSize),
    }, "Tasks retrieved successfully"));
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
