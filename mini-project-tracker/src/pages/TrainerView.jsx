// src/pages/TrainerView.jsx

import React, { useState, useEffect } from 'react';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';

const TrainerView = () => {
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    due_date_after: '',
    due_date_before: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Filters</h2>
        <div className="flex space-x-2 items-center">
          <select name="status" value={filters.status} onChange={handleFilterChange} className="border p-2">
            <option value="">All Statuses</option>
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select name="priority" value={filters.priority} onChange={handleFilterChange} className="border p-2">
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div>
            <label className="mr-1">Due From:</label>
            <input
              type="date"
              name="due_date_after"
              value={filters.due_date_after}
              onChange={handleFilterChange}
              className="border p-2"
            />
          </div>
          <div>
            <label className="mr-1">Due To:</label>
            <input
              type="date"
              name="due_date_before"
              value={filters.due_date_before}
              onChange={handleFilterChange}
              className="border p-2"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <ProjectForm onCreated={() => { /* maybe refetch list or reset filters */ }} />
      </div>

      <ProjectList filterParams={filters} />
    </div>
  );
};

export default TrainerView;





