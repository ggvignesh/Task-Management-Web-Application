import React, { useState } from 'react';
import API from '../utils/api';

export default function AuthForm({ type, onAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/users/${type}`, { username, password });
      if (type === 'login') {
        localStorage.setItem('token', res.data.token);
        onAuth(res.data.user);
      } else {
        onAuth();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error');
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 300, margin: 'auto' }}>
      <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">{type === 'login' ? 'Login' : 'Register'}</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}
