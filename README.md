Task Management MERN Application
This project is a Task Management web application built using the MERN stack (MongoDB, Express, React, Node.js). It offers features such as user authentication, task creation and management, protected routes, and real-time task tracking with an intuitive, responsive UI.

Project Structure
Client (Frontend): Built with React using Vite for fast build times and development. It includes Redux for global state management and React Hot Toast for notifications.
Server (Backend): Built with Node.js and Express, utilizing MongoDB as the database to store task and user information. JWT-based authentication is implemented to secure API routes.
Core Functionalities
User Authentication: Login and Registration with JWT for secure sessions.
Task Management: Create, Read, Update, and Delete (CRUD) tasks, with additional features such as:
Search: Search tasks by title.
Sorting: Sort tasks by creation time.
Filtering: Filter tasks by status (e.g., completed, pending).
Due Time Timer: Countdown timer for tasks with due dates.
Protected Routes: Routes are secured with JWT tokens, allowing only authorized users to access task-related features.
Form Validations: Ensures valid input in the login, register, and task creation forms.
Toast Notifications: Visual feedback for user actions like login, logout, task creation, etc.
Debouncing: Implemented on the search input field to optimize search performance.
Custom Hooks: Reusable logic for login and register functionality.
Redux State Management: Global state management for tasks, authentication, and notifications.
Responsive Design: Optimized for all screen sizes.
Project Setup
Prerequisites
Node.js and npm (or yarn)
MongoDB account or locally running MongoDB instance
Clone the Repository
 
 
git clone https://github.com/BapiMajumder1402/task-management.git
cd task-management
Install Dependencies
Client (React)
 
 
cd client
npm install
Server (Node.js)
 
 
cd server
npm install
Environment Variables
Create .env files in both the client and server directories:

Client (.env)
 
 
VITE_API_BASE_URL = "http://localhost:8000"
Server (.env)
 
 
PORT = 8000
MONGO_DB = "YOUR MONGODB URI"
CORS = "*"
ACCESS_TOKEN_EXPIRY = "1d"
ACCESS_TOKEN_SECRET = "7ae2d60d49c8b97f072098762aed45c08e9795d0677b097d6e8f6496e40f1b8a3f5b9e37a6e4d7f92412ab3fce2d60c08e921c42ba02b9577b097d6e8f8d76fd7"
Run the Project
Start the Client
 
 
cd client
npm run dev
Start the Server
 
 
cd server
npm run dev
By default, the client will be running on http://localhost:5173, and the server will be running on http://localhost:8000.

API Endpoints
Authentication:
POST /api/register: Register a new user.
POST /api/login: Login a user.
Tasks:
GET /api/tasks: Get all tasks (authenticated).
POST /api/tasks: Create a new task (authenticated).
PUT /api/tasks/:id: Update a task (authenticated).
DELETE /api/tasks/:id: Delete a task (authenticated).
Tech Stack
Frontend: React, Vite, Redux, React Hot Toast, Axios
Backend: Node.js, Express, MongoDB, Mongoose
Authentication: JWT
UI/UX: Custom CSS for responsive design
