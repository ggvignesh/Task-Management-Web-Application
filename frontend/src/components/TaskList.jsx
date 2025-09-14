import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { socket } from '../utils/socket';

export default function TaskList({ filters }) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchTasks();
    socket.on('taskUpdated', fetchTasks);
    return () => socket.off('taskUpdated', fetchTasks);
    // eslint-disable-next-line
  }, [filters]);
  const fetchTasks = async () => {
    const params = {};
    if (filters) {
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (filters.search) params.search = filters.search;
    }
    const res = await API.get('/tasks', { params });
    setTasks(res.data);
  };
  return (
    <ul>
      {tasks.map(task => (
        <li key={task._id}>{task.title} - {task.status} - {task.priority}</li>
      ))}
    </ul>
  );
}
