const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'Alishba', // Change this to your MySQL username
  password: 'Alishba01234', // Change this to your MySQL password
  database: 'task_management'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Routes
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database query error' });
    }
    res.json(results);
  });
});

app.post('/tasks', (req, res) => {
  const { title, description, due_date, status } = req.body;
  const formattedDueDate = new Date(due_date).toISOString().split('T')[0]; // Format to YYYY-MM-DD
  const query = 'INSERT INTO tasks (title, description, due_date, status) VALUES (?, ?, ?, ?)';
  db.query(query, [title, description, formattedDueDate, status], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error adding task' });
    }
    res.json({ id: result.insertId, title, description, due_date: formattedDueDate, status });
  });
});

app.put('/tasks/:id', (req, res) => {
  const { title, description, due_date, status } = req.body;
  const formattedDueDate = new Date(due_date).toISOString().split('T')[0]; // Format to YYYY-MM-DD
  const query = 'UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ?';
  db.query(query, [title, description, formattedDueDate, status, req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating task' });
    }
    res.json({ message: 'Task updated successfully' });
  });
});
 

app.delete('/tasks/:id', (req, res) => {
  const query = 'DELETE FROM tasks WHERE id = ?';
  db.query(query, [req.params.id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting task' });
    }
    res.json({ message: 'Task deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
