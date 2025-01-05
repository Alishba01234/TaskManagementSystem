import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/'); // Redirect to login if not logged in
    } else {
      fetchTasks();
    }
  }, [navigate]);

  const fetchTasks = () => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('There was an error fetching tasks:', error));
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEditTask = (task) => {
    // Navigate to the TaskForm page with task details
    navigate('/taskform', { state: { task } });
  };

  const handleDeleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); // Remove login state
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="task-list-container">
      <h1>Task List</h1>

      {/* Progress Bar Section */}
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
        <p className="progress-text">
          {`Completed: ${completedTasks} / ${totalTasks} (${completionPercentage.toFixed(2)}%)`}
        </p>
      </div>

      {/* Filters Section */}
      <div className="task-filters">
        <input
          type="text"
          placeholder="Search tasks by title"
          value={search}
          onChange={handleSearchChange}
        />
        <select value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Task List Section */}
      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {formatDate(task.due_date)}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => handleEditTask(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default TaskList;
