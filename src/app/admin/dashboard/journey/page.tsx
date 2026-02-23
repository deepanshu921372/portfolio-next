'use client';

import { useState, useEffect } from 'react';
import type { JourneyData } from '@/types/portfolio';
import Modal from '@/components/admin/Modal';

const emptyJourney: Omit<JourneyData, '_id'> = {
  icon: '🎯',
  title: '',
  description: '',
};

export default function JourneyEditor() {
  const [journey, setJourney] = useState<JourneyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newJourney, setNewJourney] = useState<Omit<JourneyData, '_id'>>(emptyJourney);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/portfolio/journey');
      const result = await response.json();
      if (result.success) {
        setJourney(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (item: JourneyData) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/portfolio/journey', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      const result = await response.json();
      if (result.success) {
        setMessage({ type: 'success', text: 'Journey item updated!' });
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
    setNewJourney(emptyJourney);
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewJourney(emptyJourney);
  };

  const handleNewJourneyChange = (field: string, value: string) => {
    setNewJourney(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveNewJourney = async () => {
    if (!newJourney.title.trim()) {
      setMessage({ type: 'error', text: 'Title is required' });
      return;
    }
    setIsSaving(true);
    try {
      const response = await fetch('/api/portfolio/journey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJourney),
      });
      const result = await response.json();
      if (result.success) {
        setJourney([...journey, result.data]);
        setMessage({ type: 'success', text: 'Journey item added!' });
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
    if (!confirm('Are you sure you want to delete this journey item?')) return;

    try {
      const response = await fetch(`/api/portfolio/journey?id=${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setJourney(journey.filter((j) => j._id !== id));
        setMessage({ type: 'success', text: 'Journey item deleted!' });
        await fetch('/api/portfolio', { method: 'POST' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete' });
    }
  };

  const handleChange = (id: string, field: string, value: string) => {
    setJourney(journey.map((j) => {
      if (j._id !== id) return j;
      return { ...j, [field]: value };
    }));
  };

  if (isLoading) return <div className="editor-loading">Loading...</div>;

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h1>Journey</h1>
        <button onClick={handleOpenAddModal} className="add-btn" disabled={isSaving}>
          + Add Journey Item
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="cards-grid">
        {journey.map((item) => (
          <div key={item._id} className={`card ${editingId === item._id ? 'editing' : ''}`}>
            {editingId === item._id ? (
              <>
                <div className="card-edit-form">
                  <div className="form-group">
                    <label>Icon (emoji)</label>
                    <input
                      type="text"
                      value={item.icon}
                      onChange={(e) => handleChange(item._id!, 'icon', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleChange(item._id!, 'title', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      value={item.description}
                      onChange={(e) => handleChange(item._id!, 'description', e.target.value)}
                      rows={3}
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
                <div className="card-preview">
                  <span className="card-icon">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
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

      <Modal isOpen={showAddModal} onClose={handleCloseAddModal} title="Add Journey Item">
        <div className="form-group">
          <label>Icon (emoji)</label>
          <input
            type="text"
            value={newJourney.icon}
            onChange={(e) => handleNewJourneyChange('icon', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Title *</label>
          <input
            type="text"
            value={newJourney.title}
            onChange={(e) => handleNewJourneyChange('title', e.target.value)}
            placeholder="Journey item title"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={newJourney.description}
            onChange={(e) => handleNewJourneyChange('description', e.target.value)}
            rows={3}
            placeholder="Description"
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleCloseAddModal} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleSaveNewJourney} className="save-btn" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
