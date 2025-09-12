// src/components/ProjectForm.jsx
import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const ProjectForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    assigned_to: '',
    priority: 'medium',
    due_date: '',
  });

  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    axios.get('/api/users/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => setUsers(res.data))
    .catch(err => console.error('Failed to fetch users:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('access_token');
      const resp = await axios.post('/api/projects/', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onCreated(resp.data);
      setForm({ title: '', description: '', assigned_to: '', priority: 'medium', due_date: '' });
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError("Error creating project");
      }
    }
  };

  return (
    <div className="p-4 border mb-4">
      <h2 className="text-lg font-bold mb-2">Assign New Project</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className="border p-2 w-full" />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2 w-full"></textarea>

        <select name="assigned_to" value={form.assigned_to} onChange={handleChange} className="border p-2 w-full">
          <option value="">-- Select User --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>

        <select name="priority" value={form.priority} onChange={handleChange} className="border p-2">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input type="date" name="due_date" value={form.due_date} onChange={handleChange} className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create</button>
      </form>
    </div>
  );
};

export default ProjectForm;
