# Task Manager

A simple task manager built with the MERN stack. Users can sign up, log in, and manage their own tasks — nothing fancy, just clean and functional.

## Features

- **User Authentication** — Register and login with email/password
- **Add Tasks** — Quickly add new tasks
- **Edit Tasks** — Click edit to change a task title (or double-click it)
- **Delete Tasks** — Remove tasks you no longer need
- **Mark Complete** — Check off tasks as you finish them
- **Filter Tasks** — View all, pending, or completed tasks
- **Per-User Data** — Every user only sees their own tasks

## Tech Stack

- **Frontend** — React (Vite), React Router, Axios
- **Backend** — Node.js, Express
- **Database** — MongoDB with Mongoose
- **Auth** — JWT (JSON Web Tokens), bcrypt for password hashing

## Project Structure

```
├── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Route handlers (auth, tasks)
│   ├── middleware/      # JWT auth check
│   ├── models/         # Mongoose schemas (User, Task)
│   ├── routes/         # API route definitions
│   ├── app.js          # Express app setup
│   └── server.js       # Entry point
│
├── frontend/
│   └── src/
│       ├── api/        # Axios instance
│       ├── components/ # TaskForm, TaskList, TaskItem, FilterBar
│       ├── context/    # AuthContext for login state
│       ├── pages/      # Login, Register, Dashboard
│       ├── App.jsx     # Router setup
│       └── main.jsx    # Entry point
```

## Getting Started

### What you need

- Node.js (v16 or higher)
- MongoDB (running locally or a cloud URI like MongoDB Atlas)

### 1. Clone the project

```bash
git clone https://github.com/dipubadatya/task-Manager-fullstack
cd task-manager
```

### 2. Setup the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder (or update the existing one):

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=pick_something_secret_here
```

Start the server:

```bash
npm run dev
```

### 3. Setup the frontend

```bash
cd frontend
npm install
npm run dev
```

Open your browser at **http://localhost:5173** and you're good to go.

## API Endpoints

| Method | Route               | Description          | Auth Required |
|--------|---------------------|----------------------|---------------|
| POST   | /api/auth/register  | Create new account   | No            |
| POST   | /api/auth/login     | Login                | No            |
| GET    | /api/tasks          | Get user's tasks     | Yes           |
| POST   | /api/tasks          | Create a task        | Yes           |
| PUT    | /api/tasks/:id      | Update a task        | Yes           |
| DELETE | /api/tasks/:id      | Delete a task        | Yes           |
