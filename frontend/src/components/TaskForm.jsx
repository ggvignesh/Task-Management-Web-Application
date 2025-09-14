import React, { useState } from 'react';
import API from '../utils/api';

export default function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/tasks', { title, description, priority });
      setTitle(''); setDescription(''); setPriority('Medium');
      setError('');
      if (onTaskCreated) onTaskCreated();
    } catch (err) {
      setError(err.response?.data?.message || 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300, margin: 'auto' }}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required />
      <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Description" />
      <select value={priority} onChange={e=>setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <button type="submit">Create Task</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}
