const Task = require('../models/Task');
const { io } = require('../server');

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, assignee } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });
    const task = new Task({
      title,
      description,
      status,
      priority,
      creator: req.user.userId,
      assignee
    });
    await task.save();
    const populatedTask = await Task.findById(task._id).populate('creator', 'username').populate('assignee', 'username');
    io.emit('taskUpdated', { action: 'create', task: populatedTask });
    res.status(201).json(populatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tasks (with optional filters)
exports.getTasks = async (req, res) => {
  try {
    const { status, priority, assignee, search } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignee) filter.assignee = assignee;
    if (search) filter.title = { $regex: search, $options: 'i' };
    const tasks = await Task.find(filter).populate('creator', 'username').populate('assignee', 'username');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single task
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('creator', 'username').populate('assignee', 'username');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    // Only creator or assignee can update
    if (task.creator.toString() !== req.user.userId && (!task.assignee || task.assignee.toString() !== req.user.userId)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    Object.assign(task, req.body);
    await task.save();
    const populatedTask = await Task.findById(task._id).populate('creator', 'username').populate('assignee', 'username');
    io.emit('taskUpdated', { action: 'update', task: populatedTask });
    res.json(populatedTask);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    // Only creator can delete
    if (task.creator.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await task.remove();
    io.emit('taskUpdated', { action: 'delete', taskId: req.params.id });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
