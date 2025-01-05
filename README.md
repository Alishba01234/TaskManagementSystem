# TaskManagementSystem

**Overview**
The Task Management Application is a full-stack web application designed to help users manage their tasks efficiently. It features a backend built with Node.js and Express, which interacts with a MySQL database, and a frontend developed using React. Users can create, read, update, and delete tasks, as well as filter and search through their tasks.

**Project Explanation**
The Task Management Application is structured to provide a seamless experience for users looking to organize their tasks. The application is divided into two main components: the backend and the frontend.

**Backend**
1. Node.js and Express: The backend is built using Node.js, a JavaScript runtime that allows for server-side scripting. Express is a web framework for Node.js that simplifies the process of building web applications and APIs. The backend handles all the business logic and database interactions.

2. MySQL Database: The application uses MySQL as its database management system. It stores task data, including the title, description, due date, and status of each task. The database schema is designed to allow for efficient querying and management of tasks.

3. API Endpoints: The backend exposes several RESTful API endpoints that the frontend can interact with. These endpoints allow users to perform CRUD (Create, Read, Update, Delete) operations on tasks.

**Frontend**
1. React: The frontend is developed using React, a popular JavaScript library for building user interfaces. React allows for the creation of reusable components, making the application modular and easy to maintain.

2. User Authentication: The application includes a simple login mechanism that restricts access to the task management features. Users must log in with their own credentials to access the application.

3. Task Management Features: The frontend provides a user-friendly interface for managing tasks. Users can add new tasks, view existing tasks, edit task details, and delete tasks. The application also includes filtering and searching capabilities to help users find specific tasks quickly.

4. Responsive Design: The application is designed to be responsive, ensuring that it works well on both desktop and mobile devices. This enhances the user experience and accessibility.

**Features**
User Authentication: Secure login to access the application.
Task Management: Create, read, update, and delete tasks.
Task Filtering: Filter tasks based on their status (Pending, In Progress, Completed).
Task Search: Search for tasks by title.
Progress Tracking: Visual representation of task completion percentage.
Responsive Design: Mobile-friendly interface for better accessibility.

**Technologies Used**
**a. Backend**
Node.js: JavaScript runtime for building the server.
Express: Web framework for Node.js to handle routing and middleware.
MySQL: Relational database management system for storing task data.
Body-parser: Middleware to parse incoming request bodies.
CORS: Middleware to enable Cross-Origin Resource Sharing.
**b. Frontend**
React: JavaScript library for building user interfaces.
Axios: Promise-based HTTP client for making API requests.
React Router: Library for routing in React applications.

**Installation**
Node.js: Ensure you have Node.js installed (v12 or higher).
MySQL Server: Install and set up MySQL on your machine.
**Backend Setup**
1. Clone the Repository:
git clone https://github.com/yourusername/task-management-backend.git
cd task-management-backend

2. Install Dependencies:
npm install

3. Set Up MySQL Database:
Create a database named task_management.
Create a table named tasks with the following structure:
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE,
  status ENUM('pending', 'in progress', 'completed') DEFAULT 'pending'
);

4. Configure Database Connection:
Create a .env file in the root of the project with the following content:
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=task_management

Open server.js and update the database connection details to use environment variables:
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

5. Start the Server:
node server.js

**Frontend Setup**
1. Clone the Frontend Repository:
git clone https://github.com/yourusername/task-management-frontend.git
cd task-management-frontend

2. Install Dependencies:
npm install

3. Start the Frontend:
npm start

**Usage**
Open your browser and navigate to http://localhost:3000 to access the application.
Log in using your own credentials that you set up in the backend.
After logging in, you can manage your tasks through the provided interface.

**Contributing**
Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

**License**
This project is licensed under the ISC License (URL : https://opensource.org/license/isc-license-txt).
