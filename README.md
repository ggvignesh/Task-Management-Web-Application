<<<<<<< HEAD
# Task Management Web Application

## Features
- User registration and login (JWT authentication)
- Task CRUD (create, read, update, delete)
- Assign tasks to users
- Real-time updates (Socket.IO)
- Search and filter tasks
- View team members
- Responsive, simple UI (React + Tailwind CSS)

## Tech Stack
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Socket.IO
- **Frontend:** React, Axios, React Router, Socket.IO Client, Tailwind CSS

## Setup Instructions

### Backend
1. `cd backend`
2. Create a `.env` file with:
   - `PORT=5000`
   - `MONGO_URI=your_mongodb_connection_string`
   - `JWT_SECRET=your_jwt_secret`
3. `npm install`
4. `node server.js`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`

## Architecture
- **Authentication:** JWT tokens stored in localStorage, sent via Authorization header.
- **Real-time:** Socket.IO emits `taskUpdated` on create/update/delete, frontend listens and refreshes task list.
- **UI:** Minimal, clean, and responsive. All main features accessible from the navbar.

---

**This project is intentionally simple and functional, focusing on practical implementation and clarity.**
=======
# Task-Management-Web-Application
>>>>>>> cf5d1b7961ce1d412e46b2c822108f74a2669a24
