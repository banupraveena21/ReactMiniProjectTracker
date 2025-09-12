// src/components/ProjectItem.jsx

import React, { useContext, useState } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';

const ProjectItem = ({ project }) => {
  const { user } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState({ status: project.status, due_date: project.due_date });

  const handleUpdate = async () => {
    try {
      const resp = await axios.put(`/projects/${project.id}/`, fields);
      // update local UI: maybe emit event or refetch
      setEditing(false);
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`/projects/${project.id}/`);
      // remove from UI or refetch
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="border p-4 mb-2">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p>{project.description}</p>
      <p>Priority: {project.priority}</p>
      <p>Status: {project.status}</p>
      <p>Due: {project.due_date}</p>

      {editing ? (
        <div className="space-y-2 mt-2">
          <select
            value={fields.status}
            onChange={e => setFields(f => ({...f, status: e.target.value}))}
            className="border p-1"
          >
            <option value="not_started">Not Started</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <input
            type="date"
            value={fields.due_date}
            onChange={e => setFields(f => ({...f, due_date: e.target.value}))}
            className="border p-1"
          />
          <button onClick={handleUpdate} className="bg-green-500 text-white p-1 rounded">Save</button>
          <button onClick={() => setEditing(false)} className="bg-gray-500 text-white p-1 rounded">Cancel</button>
        </div>
      ) : null}

      {user && user.role === 'trainee' && project.assigned_to === user.id && (
        <button onClick={() => setEditing(true)} className="bg-yellow-500 text-white p-1 rounded mr-2 mt-2">Edit</button>
      )}

      {user && user.role === 'trainer' && (
        <>
          <button onClick={() => setEditing(true)} className="bg-yellow-500 text-white p-1 rounded mr-2 mt-2">Edit</button>
          <button onClick={handleDelete} className="bg-red-500 text-white p-1 rounded mt-2">Delete</button>
        </>
      )}
    </div>
  );
};

export default ProjectItem;
