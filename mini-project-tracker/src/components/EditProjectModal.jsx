// src/components/EditProjectModal.jsx

import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const EditProjectModal = ({ project, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({ ...project });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/projects/${project.id}/`, formData);
      onUpdated(); // trigger refresh in parent
      onClose();   // close modal
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Edit Project</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 mb-2" placeholder="Title" />
          <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 mb-2" placeholder="Description" />
          <select name="status" value={formData.status} onChange={handleChange} className="w-full border p-2 mb-2">
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select name="priority" value={formData.priority} onChange={handleChange} className="w-full border p-2 mb-2">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} className="w-full border p-2 mb-2" />
          <input name="assigned_to" value={formData.assigned_to} onChange={handleChange} className="w-full border p-2 mb-2" placeholder="Assigned To (user ID)" />

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;
