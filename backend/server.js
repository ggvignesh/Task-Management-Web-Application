const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { 
  cors: { 
    origin: process.env.NODE_ENV === 'production' 
      ? process.env.FRONTEND_URL || 'https://your-app-name.onrender.com'
      : '*' 
  } 
});

app.use(cors());
app.use(express.json());

// Serve static files from the React app (only in production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));
  
  // The "catchall" handler: for any request that doesn't match API, send back React's index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

// In-memory storage (resets on server restart)
let users = [];
let tasks = [];
let nextUserId = 1;
let nextTaskId = 1;

// Simple authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// User routes
app.post('/api/users/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (users.find(u => u.username === username)) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: nextUserId++, username, password: hashedPassword };
    users.push(user);

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Task routes
app.get('/api/tasks', authenticateToken, (req, res) => {
  const userTasks = tasks.filter(task => 
    task.creator === req.user.id || task.assignee === req.user.id
  );
  res.json(userTasks);
});

app.post('/api/tasks', authenticateToken, (req, res) => {
  const { title, description, status, priority, assignee } = req.body;
  const task = {
    id: nextTaskId++,
    title,
    description,
    status: status || 'Todo',
    priority: priority || 'Medium',
    creator: req.user.id,
    assignee: assignee || null,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  tasks.push(task);
  io.emit('taskUpdated');
  res.json(task);
});

app.put('/api/tasks/:id', authenticateToken, (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);
  
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  if (task.creator !== req.user.id && task.assignee !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  Object.assign(task, req.body, { updatedAt: new Date() });
  io.emit('taskUpdated');
  res.json(task);
});

app.delete('/api/tasks/:id', authenticateToken, (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  const task = tasks[taskIndex];
  if (task.creator !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  tasks.splice(taskIndex, 1);
  io.emit('taskUpdated');
  res.json({ message: 'Task deleted' });
});

// Get all users for team list
app.get('/api/users', authenticateToken, (req, res) => {
  const userList = users.map(u => ({ id: u.id, username: u.username }));
  res.json(userList);
});

// Real-time connection
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
  // You can add more event listeners here for real-time updates
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Using in-memory storage (data resets on server restart)');
});

module.exports = { app, server, io };
