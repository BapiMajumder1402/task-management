import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { createTask, getTasks, updateTask, deleteTask } from '../../services/tasksApi';
import { toast } from 'react-hot-toast';
import { Container, Modal, Button } from 'react-bootstrap';
import TaskCard from '../../components/taskCard/TaskCard';

const TasksManagePage = () => {
    const [tasks, setTasks] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [initialValues, setInitialValues] = useState({
        title: '',
        description: '',
        dueDate: '',
        status: 'Pending',
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (error) {
            toast.error('Error fetching tasks');
        }
    };

    const handleDelete = async (taskId) => {
        try {
            await deleteTask(taskId);
            fetchTasks(); 
            toast.success('Task deleted successfully');
        } catch (error) {
            toast.error('Error deleting task');
        }
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Required'),
        description: Yup.string().required('Required'),
        dueDate: Yup.date().nullable().required('Required'),
        status: Yup.string().required('Required'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            if (editing) {
                await updateTask(currentTaskId, values);
                toast.success('Task updated successfully');
            } else {
                await createTask(values);
                toast.success('Task created successfully');
            }
            resetForm(); 
            setEditing(false);
            setCurrentTaskId(null);
            fetchTasks();
            setShowModal(false);
        } catch (error) {
            toast.error('Error saving task');
        }
    };

    const handleEdit = (taskToEdit) => {
        setEditing(true);
        setCurrentTaskId(taskToEdit._id);
        setInitialValues({
            title: taskToEdit.title,
            description: taskToEdit.description,
            dueDate: new Date(taskToEdit.dueDate).toISOString().slice(0, 10), // Format the date for input
            status: taskToEdit.status,
        });
        setShowModal(true);
    };

    const handleCreate = () => {
        setEditing(false);
        setCurrentTaskId(null);
        setInitialValues({
            title: '',
            description: '',
            dueDate: '',
            status: 'Pending',
        });
        setShowModal(true);
    };

    return (
        <Container>
          <div className="page">

            <h2 className='text-center'>Task Management</h2>
            <Button onClick={handleCreate} className="mb-3 ">Create Task</Button>

            <h3 className="mt-4">Task List</h3>
            <ul className="list-group">
                {tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editing ? 'Edit Task' : 'Create Task'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ setFieldValue }) => (
                            <Form>
                                <div className="mb-3">
                                    <label htmlFor="title">Task Title</label>
                                    <Field name="title" type="text" className="form-control" />
                                    <ErrorMessage name="title" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description">Task Description</label>
                                    <Field name="description" component="textarea" className="form-control" />
                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dueDate">Due Date</label>
                                    <Field name="dueDate">
                                        {({ field }) => (
                                            <input
                                                type="date"
                                                {...field}
                                                className="form-control"
                                                onChange={(e) => setFieldValue('dueDate', e.target.value)}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="dueDate" component="div" className="text-danger" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="status">Status</label>
                                    <Field as="select" name="status" className="form-control">
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Completed">Completed</option>
                                    </Field>
                                    <ErrorMessage name="status" component="div" className="text-danger" />
                                </div>
                                <Button type="submit" className="btn btn-primary">
                                    {editing ? 'Update Task' : 'Create Task'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
          </div>
        </Container>
    );
};

export default TasksManagePage;
