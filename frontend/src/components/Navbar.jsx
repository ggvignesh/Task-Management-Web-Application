import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout }) {
  return (
    <nav style={{ display: 'flex', gap: 16, padding: 8, borderBottom: '1px solid #ccc' }}>
      <Link to="/tasks">Tasks</Link>
      <Link to="/team">Team</Link>
      {user ? (
        <button onClick={() => { localStorage.removeItem('token'); onLogout(); }}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
