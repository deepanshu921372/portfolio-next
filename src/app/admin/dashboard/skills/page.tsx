'use client';

import { useState, useEffect } from 'react';
import type { SkillData } from '@/types/portfolio';
import Modal from '@/components/admin/Modal';

const emptySkill: Omit<SkillData, '_id'> = {
  icon: '✨',
  title: '',
  description: '',
  span: { col: 1, row: 1 },
};

export default function SkillsEditor() {
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSkill, setNewSkill] = useState<Omit<SkillData, '_id'>>(emptySkill);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/portfolio/skills');
      const result = await response.json();
      if (result.success) {
        setSkills(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (skill: SkillData) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/portfolio/skills', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill),
      });
      const result = await response.json();
      if (result.success) {
        setMessage({ type: 'success', text: 'Skill updated!' });
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
    setNewSkill(emptySkill);
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewSkill(emptySkill);
  };

  const handleNewSkillChange = (field: string, value: string | number) => {
    if (field === 'span.col' || field === 'span.row') {
      const spanField = field.split('.')[1] as 'col' | 'row';
      setNewSkill(prev => ({
        ...prev,
        span: { ...prev.span, [spanField]: value ? Number(value) : 1 },
      }));
    } else {
      setNewSkill(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSaveNewSkill = async () => {
    if (!newSkill.title.trim()) {
      setMessage({ type: 'error', text: 'Title is required' });
      return;
    }
    setIsSaving(true);
    try {
      const response = await fetch('/api/portfolio/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSkill),
      });
      const result = await response.json();
      if (result.success) {
        setSkills([...skills, result.data]);
        setMessage({ type: 'success', text: 'Skill added!' });
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
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const response = await fetch(`/api/portfolio/skills?id=${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setSkills(skills.filter((s) => s._id !== id));
        setMessage({ type: 'success', text: 'Skill deleted!' });
        await fetch('/api/portfolio', { method: 'POST' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete' });
    }
  };

  const handleChange = (id: string, field: string, value: string | number) => {
    setSkills(skills.map((s) => {
      if (s._id !== id) return s;

      if (field === 'span.col' || field === 'span.row') {
        const spanField = field.split('.')[1] as 'col' | 'row';
        return {
          ...s,
          span: {
            ...s.span,
            [spanField]: value ? Number(value) : undefined,
          },
        };
      }
      return { ...s, [field]: value };
    }));
  };

  if (isLoading) return <div className="editor-loading">Loading...</div>;

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h1>Skills</h1>
        <button onClick={handleOpenAddModal} className="add-btn" disabled={isSaving}>
          + Add Skill
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="cards-grid">
        {skills.map((skill) => (
          <div key={skill._id} className={`card ${editingId === skill._id ? 'editing' : ''}`}>
            {editingId === skill._id ? (
              <>
                <div className="card-edit-form">
                  <div className="form-group">
                    <label>Icon (emoji)</label>
                    <input
                      type="text"
                      value={skill.icon}
                      onChange={(e) => handleChange(skill._id!, 'icon', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={skill.title}
                      onChange={(e) => handleChange(skill._id!, 'title', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={skill.description}
                      onChange={(e) => handleChange(skill._id!, 'description', e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Span Columns (optional)</label>
                      <select
                        value={skill.span?.col || ''}
                        onChange={(e) => handleChange(skill._id!, 'span.col', e.target.value)}
                      >
                        <option value="">1 (default)</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Span Rows (optional)</label>
                      <select
                        value={skill.span?.row || ''}
                        onChange={(e) => handleChange(skill._id!, 'span.row', e.target.value)}
                      >
                        <option value="">1 (default)</option>
                        <option value="2">2</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="card-actions">
                  <button onClick={() => handleUpdate(skill)} className="save-btn" disabled={isSaving}>
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="card-preview">
                  <span className="card-icon">{skill.icon}</span>
                  <h3>{skill.title}</h3>
                  <p>{skill.description}</p>
                  {skill.span && (
                    <small className="card-meta">
                      Span: {skill.span.col || 1} col, {skill.span.row || 1} row
                    </small>
                  )}
                </div>
                <div className="card-actions">
                  <button onClick={() => setEditingId(skill._id!)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(skill._id!)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={showAddModal} onClose={handleCloseAddModal} title="Add New Skill">
        <div className="form-group">
          <label>Icon (emoji)</label>
          <input
            type="text"
            value={newSkill.icon}
            onChange={(e) => handleNewSkillChange('icon', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            value={newSkill.title}
            onChange={(e) => handleNewSkillChange('title', e.target.value)}
            placeholder="Skill title"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={newSkill.description}
            onChange={(e) => handleNewSkillChange('description', e.target.value)}
            rows={3}
            placeholder="Skill description"
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Span Columns</label>
            <select
              value={newSkill.span?.col || 1}
              onChange={(e) => handleNewSkillChange('span.col', e.target.value)}
            >
              <option value="1">1 (default)</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="form-group">
            <label>Span Rows</label>
            <select
              value={newSkill.span?.row || 1}
              onChange={(e) => handleNewSkillChange('span.row', e.target.value)}
            >
              <option value="1">1 (default)</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
        <div className="modal-actions">
          <button onClick={handleCloseAddModal} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleSaveNewSkill} className="save-btn" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Skill'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
