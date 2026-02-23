'use client';

import { useState, useEffect, useRef } from 'react';
import type { ProjectData } from '@/types/portfolio';
import Modal from '@/components/admin/Modal';

const emptyProject: Omit<ProjectData, '_id'> = {
  number: '',
  emoji: '🚀',
  title: '',
  description: '',
  technologies: [],
  image: '',
  githubLink: '',
  liveLink: '',
  order: 0,
};

export default function ProjectsEditor() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState<string | null>(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProject, setNewProject] = useState<Omit<ProjectData, '_id'>>(emptyProject);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const newFileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/portfolio/projects');
      const result = await response.json();
      if (result.success) {
        setProjects(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (project: ProjectData) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/portfolio/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      const result = await response.json();
      if (result.success) {
        setMessage({ type: 'success', text: 'Project updated!' });
        setEditingId(null);
        await fetch('/api/portfolio', { method: 'POST' });
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to update' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenAddModal = () => {
    const projectNumber = String(projects.length + 1).padStart(2, '0');
    setNewProject({ ...emptyProject, number: projectNumber });
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewProject(emptyProject);
  };

  const handleNewProjectChange = (field: string, value: string | string[]) => {
    setNewProject(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveNewProject = async () => {
    if (!newProject.title.trim()) {
      setMessage({ type: 'error', text: 'Title is required' });
      return;
    }
    setIsSaving(true);
    try {
      const response = await fetch('/api/portfolio/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
      const result = await response.json();
      if (result.success) {
        setProjects([...projects, result.data]);
        setMessage({ type: 'success', text: 'Project added!' });
        handleCloseAddModal();
        await fetch('/api/portfolio', { method: 'POST' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to add' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleNewImageUpload = async (file: File) => {
    setIsUploading('new');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        handleNewProjectChange('image', result.url);
      } else {
        setMessage({ type: 'error', text: result.error || 'Upload failed' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to upload image' });
    } finally {
      setIsUploading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/portfolio/projects?id=${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setProjects(projects.filter((p) => p._id !== id));
        setMessage({ type: 'success', text: 'Project deleted!' });
        await fetch('/api/portfolio', { method: 'POST' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete' });
    }
  };

  const handleChange = (id: string, field: string, value: string | string[]) => {
    setProjects(projects.map((p) => {
      if (p._id !== id) return p;
      return { ...p, [field]: value };
    }));
  };

  const handleImageUpload = async (id: string, file: File) => {
    setIsUploading(id);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        handleChange(id, 'image', result.url);
        setMessage({ type: 'success', text: 'Image uploaded!' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Upload failed' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to upload image' });
    } finally {
      setIsUploading(null);
    }
  };

  if (isLoading) return <div className="editor-loading">Loading...</div>;

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h1>Projects</h1>
        <button onClick={handleOpenAddModal} className="add-btn" disabled={isSaving}>
          + Add Project
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="cards-list">
        {projects.map((project) => (
          <div key={project._id} className={`card project-card ${editingId === project._id ? 'editing' : ''}`}>
            {editingId === project._id ? (
              <>
                <div className="card-edit-form">
                  <div className="form-row">
                    <div className="form-group small">
                      <label>Number</label>
                      <input
                        type="text"
                        value={project.number}
                        onChange={(e) => handleChange(project._id!, 'number', e.target.value)}
                      />
                    </div>
                    <div className="form-group small">
                      <label>Emoji</label>
                      <input
                        type="text"
                        value={project.emoji}
                        onChange={(e) => handleChange(project._id!, 'emoji', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Title</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => handleChange(project._id!, 'title', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={project.description}
                      onChange={(e) => handleChange(project._id!, 'description', e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="form-group">
                    <label>Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={project.technologies.join(', ')}
                      onChange={(e) => handleChange(project._id!, 'technologies', e.target.value.split(',').map(t => t.trim()))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <div className="image-upload-row">
                      <input
                        type="text"
                        value={project.image}
                        onChange={(e) => handleChange(project._id!, 'image', e.target.value)}
                        placeholder="Enter URL or upload image"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        ref={(el) => { fileInputRefs.current[project._id!] = el; }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(project._id!, file);
                        }}
                        style={{ display: 'none' }}
                      />
                      <button
                        type="button"
                        className="upload-btn"
                        onClick={() => fileInputRefs.current[project._id!]?.click()}
                        disabled={isUploading === project._id}
                      >
                        {isUploading === project._id ? 'Uploading...' : 'Upload'}
                      </button>
                    </div>
                    {project.image && (
                      <div className="image-preview">
                        <img src={project.image} alt="Preview" />
                      </div>
                    )}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>GitHub Link</label>
                      <input
                        type="url"
                        value={project.githubLink}
                        onChange={(e) => handleChange(project._id!, 'githubLink', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Live Demo Link</label>
                      <input
                        type="url"
                        value={project.liveLink}
                        onChange={(e) => handleChange(project._id!, 'liveLink', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-actions">
                  <button onClick={() => handleUpdate(project)} className="save-btn" disabled={isSaving}>
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="project-row">
                {project.image && (
                  <div className="project-thumb-square">
                    <img src={project.image} alt={project.title} />
                  </div>
                )}
                <div className="project-content">
                  <h3 className="project-title">
                    <span className="project-emoji">{project.emoji}</span>
                    {project.title}
                  </h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                  <div className="card-actions-inline">
                    <button onClick={() => setEditingId(project._id!)} className="edit-btn">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(project._id!)} className="delete-btn">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={showAddModal} onClose={handleCloseAddModal} title="Add New Project">
        <div className="form-row">
          <div className="form-group small">
            <label>Number</label>
            <input
              type="text"
              value={newProject.number}
              onChange={(e) => handleNewProjectChange('number', e.target.value)}
            />
          </div>
          <div className="form-group small">
            <label>Emoji</label>
            <input
              type="text"
              value={newProject.emoji}
              onChange={(e) => handleNewProjectChange('emoji', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              value={newProject.title}
              onChange={(e) => handleNewProjectChange('title', e.target.value)}
              placeholder="Project title"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={newProject.description}
            onChange={(e) => handleNewProjectChange('description', e.target.value)}
            rows={4}
            placeholder="Project description"
          />
        </div>
        <div className="form-group">
          <label>Technologies (comma-separated)</label>
          <input
            type="text"
            value={newProject.technologies.join(', ')}
            onChange={(e) => handleNewProjectChange('technologies', e.target.value.split(',').map(t => t.trim()))}
            placeholder="React, Node.js, MongoDB"
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <div className="image-upload-row">
            <input
              type="text"
              value={newProject.image}
              onChange={(e) => handleNewProjectChange('image', e.target.value)}
              placeholder="Enter URL or upload image"
            />
            <input
              type="file"
              accept="image/*"
              ref={newFileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleNewImageUpload(file);
              }}
              style={{ display: 'none' }}
            />
            <button
              type="button"
              className="upload-btn"
              onClick={() => newFileInputRef.current?.click()}
              disabled={isUploading === 'new'}
            >
              {isUploading === 'new' ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          {newProject.image && (
            <div className="image-preview">
              <img src={newProject.image} alt="Preview" />
            </div>
          )}
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>GitHub Link</label>
            <input
              type="url"
              value={newProject.githubLink}
              onChange={(e) => handleNewProjectChange('githubLink', e.target.value)}
              placeholder="https://github.com/..."
            />
          </div>
          <div className="form-group">
            <label>Live Demo Link</label>
            <input
              type="url"
              value={newProject.liveLink}
              onChange={(e) => handleNewProjectChange('liveLink', e.target.value)}
              placeholder="https://..."
            />
          </div>
        </div>
        <div className="modal-actions">
          <button onClick={handleCloseAddModal} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleSaveNewProject} className="save-btn" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
