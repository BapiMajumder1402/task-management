import React from 'react';
import { Button } from 'react-bootstrap';

const TaskCard = ({ task, onEdit, onDelete }) => {
    return (
        <li className="list-group-item">
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Status: {task.status}</p>
            <Button onClick={() => onEdit(task)} className="btn btn-secondary me-2">Edit</Button>
            <Button onClick={() => onDelete(task._id)} className="btn btn-danger">Delete</Button>
        </li>
    );
};

export default TaskCard;
