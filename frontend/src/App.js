import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TeamList from './components/TeamList';
import Navbar from './components/Navbar';
import SearchFilter from './components/SearchFilter';

function App() {
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({});
  const handleLogout = () => setUser(null);
  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<AuthForm type="login" onAuth={setUser} />} />
        <Route path="/register" element={<AuthForm type="register" onAuth={() => window.location = '/login'} />} />
        <Route path="/tasks" element={user ? <><TaskForm /><SearchFilter filters={filters} setFilters={setFilters} /><TaskList filters={filters} /></> : <Navigate to="/login" />} />
        <Route path="/team" element={user ? <TeamList /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/tasks" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
