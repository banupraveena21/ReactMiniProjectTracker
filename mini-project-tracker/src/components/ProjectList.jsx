import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import EditProjectModal from './EditProjectModal';
import { AuthContext } from '../contexts/AuthContext';

const ProjectList = ({ filterParams }) => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects/', {
        params: {
          assigned_to: user?.id,
          ...filterParams
        },
      });
      console.log("Fetched projects:", response.data);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchProjects();
    }
  }, [user]);

  const handleDelete = async (projectId) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axios.delete(`/api/projects/${projectId}/`);
      setProjects(prev => prev.filter(p => p.id !== projectId));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
  };

  const closeModal = () => {
    setEditingProject(null);
  };

  const filteredProjects = projects.filter(project => {
    if (!user) return false;
    if (project.assigned_to && typeof project.assigned_to === 'object') {
      return project.assigned_to.id === user.id;
    }
    return String(project.assigned_to) === String(user.id);
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      {filteredProjects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        filteredProjects.map(project => (
          <div key={project.id} className="border p-4 mb-4">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p>{project.description}</p>
            <p>Status: {project.status}</p>
            <p>Priority: {project.priority}</p>
            <p>Due: {project.due_date}</p>
            <p>Assigned To: {
              typeof project.assigned_to === 'object' 
                ? project.assigned_to.username 
                : project.assigned_to || 'Unassigned'
            }</p>

            <div className="mt-2">
              <button
                onClick={() => handleEdit(project)}
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onClose={closeModal}
          onUpdated={fetchProjects}
        />
      )}
    </div>
  );
};

export default ProjectList;
