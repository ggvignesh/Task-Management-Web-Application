import React, { useEffect, useState } from 'react';
import API from '../utils/api';

export default function TeamList() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    API.get('/users').then(res => setUsers(res.data));
  }, []);
  return (
    <ul>
      {users.map(user => (
        <li key={user._id}>{user.username}</li>
      ))}
    </ul>
  );
}
