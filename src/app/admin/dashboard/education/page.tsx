'use client';

import { useState, useEffect } from 'react';
import type { EducationData } from '@/types/portfolio';
import Modal from '@/components/admin/Modal';

const emptyEducation: Omit<EducationData, '_id'> = {
  degree: '',
  institution: '',
  location: '',
  duration: '',
  description: '',
  order: 0,
};

export default function EducationEditor() {
  const [education, setEducation] = useState<EducationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEducation, setNewEducation] = useState<Omit<EducationData, '_id'>>(emptyEducation);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/portfolio/education');
      const result = await response.json();
      if (result.success) {
        setEducation(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (item: EducationData) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/portfolio/education', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      const result = await response.json();
      if (result.success) {
        setMessage({ type: 'success', text: 'Education updated!' });
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
    setNewEducation(emptyEducation);
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewEducation(emptyEducation);
  };

  const handleNewEducationChange = (field: string, value: string) => {
    setNewEducation(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveNewEducation = async () => {
    if (!newEducation.degree.trim()) {
      setMessage({ type: 'error', text: 'Degree is required' });
      return;
    }
    setIsSaving(true);
    try {
      const response = await fetch('/api/portfolio/education', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEducation),
      });
      const result = await response.json();
      if (result.success) {
        setEducation([...education, result.data]);
        setMessage({ type: 'success', text: 'Education added!' });
        handleCloseAddModal();
        await fetch('/api/portfolio', { method: 'POST' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to add' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return;

    try {
      const response = await fetch(`/api/portfolio/education?id=${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setEducation(education.filter((e) => e._id !== id));
        setMessage({ type: 'success', text: 'Education deleted!' });
        await fetch('/api/portfolio', { method: 'POST' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete' });
    }
  };

  const handleChange = (id: string, field: string, value: string) => {
    setEducation(education.map((e) => {
      if (e._id !== id) return e;
      return { ...e, [field]: value };
    }));
  };

  if (isLoading) return <div className="editor-loading">Loading...</div>;

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h1>Education</h1>
        <button onClick={handleOpenAddModal} className="add-btn" disabled={isSaving}>
          + Add Education
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="cards-list">
        {education.map((item) => (
          <div key={item._id} className={`card education-card ${editingId === item._id ? 'editing' : ''}`}>
            {editingId === item._id ? (
              <>
                <div className="card-edit-form">
                  <div className="form-group">
                    <label>Degree</label>
                    <input
                      type="text"
                      value={item.degree}
                      onChange={(e) => handleChange(item._id!, 'degree', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Institution</label>
                    <input
                      type="text"
                      value={item.institution}
                      onChange={(e) => handleChange(item._id!, 'institution', e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        type="text"
                        value={item.location}
                        onChange={(e) => handleChange(item._id!, 'location', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Duration</label>
                      <input
                        type="text"
                        value={item.duration}
                        onChange={(e) => handleChange(item._id!, 'duration', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => handleChange(item._id!, 'description', e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
                <div className="card-actions">
                  <button onClick={() => handleUpdate(item)} className="save-btn" disabled={isSaving}>
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="card-preview education-preview">
                  <h3>{item.degree}</h3>
                  <p className="institution">{item.institution}</p>
                  <div className="meta">
                    <span>{item.location}</span>
                    <span>{item.duration}</span>
                  </div>
                  <p className="description">{item.description.substring(0, 150)}...</p>
                </div>
                <div className="card-actions">
                  <button onClick={() => setEditingId(item._id!)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item._id!)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={showAddModal} onClose={handleCloseAddModal} title="Add Education">
        <div className="form-group">
          <label>Degree *</label>
          <input
            type="text"
            value={newEducation.degree}
            onChange={(e) => handleNewEducationChange('degree', e.target.value)}
            placeholder="e.g., Bachelor of Technology"
          />
        </div>
        <div className="form-group">
          <label>Institution</label>
          <input
            type="text"
            value={newEducation.institution}
            onChange={(e) => handleNewEducationChange('institution', e.target.value)}
            placeholder="Institution name"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={newEducation.location}
              onChange={(e) => handleNewEducationChange('location', e.target.value)}
              placeholder="City, Country"
            />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              value={newEducation.duration}
              onChange={(e) => handleNewEducationChange('duration', e.target.value)}
              placeholder="2020 - 2024"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={newEducation.description}
            onChange={(e) => handleNewEducationChange('description', e.target.value)}
            rows={3}
            placeholder="Description"
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleCloseAddModal} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleSaveNewEducation} className="save-btn" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
