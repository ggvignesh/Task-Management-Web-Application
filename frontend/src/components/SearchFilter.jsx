import React from 'react';

export default function SearchFilter({ filters, setFilters }) {
  return (
    <div style={{ display: 'flex', gap: 8, margin: 8 }}>
      <input
        placeholder="Search title..."
        value={filters.search || ''}
        onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
      />
      <select
        value={filters.status || ''}
        onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}
      >
        <option value="">All Status</option>
        <option value="Todo">Todo</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <select
        value={filters.priority || ''}
        onChange={e => setFilters(f => ({ ...f, priority: e.target.value }))}
      >
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
}
