import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function TaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('pending');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // On component mount or when location.state changes, check for task to edit
  useEffect(() => {
    if (location.state && location.state.task) {
      const task = location.state.task;
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDueDate(task.due_date || '');
      setStatus(task.status || 'pending');
      setEditingTaskId(task.id || null);
    }
  }, [location.state]);

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0]; // Formats the date in yyyy-mm-dd format
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('pending');
    setEditingTaskId(null);
    setError('');
  };

  const validateForm = () => {
    if (!title.trim() || !description.trim() || !dueDate.trim()) {
      setError('All fields are required. Please fill them out.');
      return false;
    }
    return true;
  };

  const handleCreateOrUpdateTask = () => {
    if (!validateForm()) return; // If the form is invalid, don't proceed

    const formattedDueDate = formatDate(dueDate);

    if (editingTaskId) {
      // Updating existing task
      axios.put(`http://localhost:5000/tasks/${editingTaskId}`, {
        title,
        description,
        due_date: formattedDueDate,
        status,
      })
        .then(() => {
          resetForm(); // Reset the form after successful update
          navigate('/tasks'); // Redirect to task list page
        })
        .catch((error) => {
          console.error('Error updating task:', error);
          setError('Failed to update task. Please try again.');
        });
    } else {
      // Creating new task
      axios.post('http://localhost:5000/tasks', {
        title,
        description,
        due_date: formattedDueDate,
        status,
      })
        .then(() => {
          resetForm(); // Reset the form after successful creation
          navigate('/tasks'); // Redirect to task list page
        })
        .catch((error) => {
          console.error('Error creating task:', error);
          setError('Failed to create task. Please try again.');
        });
    }
  };

  return (
    <div className="taskform-container">
      <h1>{editingTaskId ? 'Edit Task' : 'Create Task'}</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="taskform-fields">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button onClick={handleCreateOrUpdateTask}>
          {editingTaskId ? 'Update Task' : 'Create Task'}
        </button>
      </div>
      <button className="view-tasks-button" onClick={() => navigate('/tasks')}>
        View Tasks
      </button>
    </div>
  );
}

export default TaskForm;
