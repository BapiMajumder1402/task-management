import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Container, Spinner } from 'react-bootstrap';
import { FaPenAlt } from "react-icons/fa";
import { createTask, getTasks, updateTask, deleteTask } from '../../services/tasksApi';
import TaskFormModal from '../../components/taskManagementComponents/TaskFormModal';
import TaskFilters from '../../components/taskManagementComponents/TaskFilters';
import PaginationControls from '../../components/taskManagementComponents/PaginationControls';
import TaskCard from '../../components/taskCard/TaskCard';
import './taskManagement.css'

const TasksManagePage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
  });

  const [searchTitle, setSearchTitle] = useState('');
  const [debouncedSearchTitle, setDebouncedSearchTitle] = useState(searchTitle);

  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const pageSizes = [5, 10, 20, 50];

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTitle(searchTitle);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTitle]);

  useEffect(() => {
    fetchTasks();
  }, [debouncedSearchTitle, selectedStatus, sortOrder, currentPage, pageSize]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await getTasks(currentPage, pageSize, debouncedSearchTitle, selectedStatus, sortOrder);
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      toast.error('Error fetching tasks');
    } finally {
      setLoading(false);
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
      dueDate: new Date(taskToEdit.dueDate).toISOString().slice(0, 10),
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
        <h2 className='text-center mt-5'>Task Management</h2>
        <div className="d-flex justify-content-center justify-content-md-end align-items-center">
            <button className='addTaskBtn' onClick={handleCreate}>
                <FaPenAlt className="mr-2" /> Add Task
            </button>
        </div>

        <TaskFilters
          searchTitle={searchTitle}
          selectedStatus={selectedStatus}
          sortOrder={sortOrder}
          pageSize={pageSize}
          handleSearchChange={(e) => setSearchTitle(e.target.value)}
          handleStatusChange={(e) => setSelectedStatus(e.target.value)}
          handleSortOrderChange={(e) => setSortOrder(e.target.value)}
          handlePageSizeChange={(e) => setPageSize(Number(e.target.value))}
          pageSizes={pageSizes}
        />

        <h3 className="mt-4">Task List</h3>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <>
            {tasks && tasks.length > 0 ? (
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
            ) : (
              <div className="text-center">
                <h4 className='mt-5 text-center'>No Task Found !</h4>
              </div>
            )}
          </>
        )}

      {tasks && tasks.length > 0 &&
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />}

        <TaskFormModal
          showModal={showModal}
          handleClose={() => setShowModal(false)}
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          editing={editing}
        />
      </div>
    </Container>
  );
};

export default TasksManagePage;
