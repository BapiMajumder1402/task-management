import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
    dueDate: Yup.date().nullable().required('Required'),
    status: Yup.string().required('Required'),
});

const TaskFormModal = ({ showModal, handleClose, handleSubmit, initialValues, editing }) => {
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{editing ? 'Edit Task' : 'Create Task'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
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
                                <Field name="dueDate" type="date" className="form-control" />
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
                            <Button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Create'}</Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default TaskFormModal;
