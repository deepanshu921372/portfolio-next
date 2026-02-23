'use client';

import { useState, useEffect } from 'react';
import type { StatData } from '@/types/portfolio';
import Modal from '@/components/admin/Modal';

const emptyStat: Omit<StatData, '_id'> = {
  number: 0,
  label: '',
  order: 0,
};

export default function StatsEditor() {
  const [stats, setStats] = useState<StatData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStat, setNewStat] = useState<Omit<StatData, '_id'>>(emptyStat);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/portfolio/stats');
      const result = await response.json();
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (stat: StatData) => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/portfolio/stats', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(stat),
      });
      const result = await response.json();
      if (result.success) {
        setMessage({ type: 'success', text: 'Stat updated!' });
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
    setNewStat(emptyStat);
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewStat(emptyStat);
  };

  const handleNewStatChange = (field: string, value: string | number) => {
    setNewStat(prev => ({ ...prev, [field]: field === 'number' ? Number(value) : value }));
  };

  const handleSaveNewStat = async () => {
    if (!newStat.label.trim()) {
      setMessage({ type: 'error', text: 'Label is required' });
      return;
    }
    setIsSaving(true);
    try {
      const response = await fetch('/api/portfolio/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStat),
      });
      const result = await response.json();
      if (result.success) {
        setStats([...stats, result.data]);
        setMessage({ type: 'success', text: 'Stat added!' });
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
    if (!confirm('Are you sure you want to delete this stat?')) return;

    try {
      const response = await fetch(`/api/portfolio/stats?id=${id}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result.success) {
        setStats(stats.filter((s) => s._id !== id));
        setMessage({ type: 'success', text: 'Stat deleted!' });
        await fetch('/api/portfolio', { method: 'POST' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to delete' });
    }
  };

  const handleChange = (id: string, field: string, value: string | number) => {
    setStats(stats.map((s) => {
      if (s._id !== id) return s;
      return { ...s, [field]: field === 'number' ? Number(value) : value };
    }));
  };

  if (isLoading) return <div className="editor-loading">Loading...</div>;

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h1>Stats</h1>
        <button onClick={handleOpenAddModal} className="add-btn" disabled={isSaving}>
          + Add Stat
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="cards-grid stats-grid">
        {stats.map((stat) => (
          <div key={stat._id} className={`card ${editingId === stat._id ? 'editing' : ''}`}>
            {editingId === stat._id ? (
              <>
                <div className="card-edit-form">
                  <div className="form-group">
                    <label>Number</label>
                    <input
                      type="number"
                      value={stat.number}
                      onChange={(e) => handleChange(stat._id!, 'number', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => handleChange(stat._id!, 'label', e.target.value)}
                    />
                  </div>
                </div>
                <div className="card-actions">
                  <button onClick={() => handleUpdate(stat)} className="save-btn" disabled={isSaving}>
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="card-preview stat-preview">
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
                <div className="card-actions">
                  <button onClick={() => setEditingId(stat._id!)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(stat._id!)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <Modal isOpen={showAddModal} onClose={handleCloseAddModal} title="Add New Stat">
        <div className="form-group">
          <label>Number</label>
          <input
            type="number"
            value={newStat.number}
            onChange={(e) => handleNewStatChange('number', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Label *</label>
          <input
            type="text"
            value={newStat.label}
            onChange={(e) => handleNewStatChange('label', e.target.value)}
            placeholder="Stat label"
          />
        </div>
        <div className="modal-actions">
          <button onClick={handleCloseAddModal} className="cancel-btn">
            Cancel
          </button>
          <button onClick={handleSaveNewStat} className="save-btn" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Stat'}
          </button>
        </div>
      </Modal>
    </div>
  );
}
