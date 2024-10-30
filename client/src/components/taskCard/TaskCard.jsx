import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './testCard.css';

const TaskCard = ({ task, onEdit, onDelete }) => {
    const [timeRemaining, setTimeRemaining] = useState({});

    useEffect(() => {
        const calculateTimeRemaining = () => {
            const now = new Date();
            const dueDate = new Date(task.dueDate);
            const timeDiff = dueDate - now;

            if (timeDiff > 0) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
                setTimeRemaining({ days, hours, minutes, seconds });
            } else {
                setTimeRemaining({ expired: true });
            }
        };
        calculateTimeRemaining();
        const interval = setInterval(calculateTimeRemaining, 1000);
        return () => clearInterval(interval);
    }, [task.dueDate]);

    const renderTimer = () => {
        if (timeRemaining.expired) {
            return <span className="text-danger">Expired!</span>;
        } else {
            return (
                <span className="text-primary ">
                    {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
                </span>
            );
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'Pending':
                return 'status-pending';
            case 'In Progress':
                return 'status-in-progress';
            case 'Completed':
                return 'status-completed';
            default:
                return '';
        }
    };

    return (
        <li className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="title">{task.title}</h4>
                <p className='time-remains'>{renderTimer()}</p>
            </div>

            <h5 className="description">{task.description}</h5>
            <p className='dueDateAndStatus'>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p className='dueDateAndStatus'>
                Status: <span className={getStatusClass(task.status)}>{task.status}</span>
            </p>
            <Button onClick={() => onEdit(task)} className="btn btn-secondary me-2">Edit</Button>
            <Button onClick={() => onDelete(task._id)} className="btn btn-danger">Delete</Button>
        </li>
    );
};

export default TaskCard;
