import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import LoginPage from './LoginPage'; // Assuming this is the login page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/taskform" element={<TaskForm />} />
      </Routes>
    </Router>
  );
}

export default App;
