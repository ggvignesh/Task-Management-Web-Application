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

## Local Development Setup

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

## Deployment to Render

### Prerequisites
- GitHub repository with your code
- Render account (free tier available)

### Step-by-Step Deployment

1. **Prepare your repository:**
   - Ensure all files are committed and pushed to GitHub
   - The repository should include the `render.yaml` configuration file

2. **Create a new Web Service on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure the service:**
   - **Name:** `task-management-app` (or your preferred name)
   - **Environment:** `Node`
   - **Build Command:** 
     ```bash
     cd backend && npm install && cd ../frontend && npm install && npm run build && cd ../backend
     ```
   - **Start Command:** `npm start`
   - **Node Version:** `18` (or latest)

4. **Set Environment Variables:**
   - `NODE_ENV` = `production`
   - `JWT_SECRET` = Generate a strong secret key
   - `MONGO_URI` = Your MongoDB connection string (see MongoDB setup below)

5. **Create MongoDB Database:**
   - In Render Dashboard, click "New +" → "PostgreSQL" (or use MongoDB Atlas)
   - For MongoDB Atlas (recommended):
     - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
     - Create a free cluster
     - Get your connection string
     - Use it as `MONGO_URI` in your environment variables

6. **Deploy:**
   - Click "Create Web Service"
   - Render will automatically build and deploy your application
   - Your app will be available at `https://your-app-name.onrender.com`

### Alternative: Using render.yaml (Blueprints)

If you prefer using the `render.yaml` file:
1. Push your code with `render.yaml` to GitHub
2. In Render Dashboard, click "New +" → "Blueprint"
3. Connect your repository
4. Render will automatically detect and use the `render.yaml` configuration

### Environment Variables Reference

```env
NODE_ENV=production
PORT=10000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement
JWT_SECRET=your_super_secret_jwt_key_here
```

### Troubleshooting

1. **Build fails:** Check that all dependencies are in `package.json`
2. **App crashes:** Check logs in Render dashboard for error details
3. **Database connection issues:** Verify MongoDB URI and network access
4. **CORS errors:** Ensure frontend URL is correctly configured

### Post-Deployment

After successful deployment:
1. Test all features (registration, login, task creation)
2. Verify real-time updates work
3. Check that the app is accessible from different devices
4. Monitor logs for any issues

## Architecture
- **Authentication:** JWT tokens stored in localStorage, sent via Authorization header.
- **Real-time:** Socket.IO emits `taskUpdated` on create/update/delete, frontend listens and refreshes task list.
- **UI:** Minimal, clean, and responsive. All main features accessible from the navbar.

---

**This project is intentionally simple and functional, focusing on practical implementation and clarity.**
