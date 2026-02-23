'use client';

import { useState, useEffect } from 'react';
import type { PersonalData } from '@/types/portfolio';

export default function PersonalEditor() {
  const [data, setData] = useState<PersonalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/portfolio/personal');
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    if (!data) return;

    if (field.startsWith('socialLinks.')) {
      const socialField = field.split('.')[1];
      setData({
        ...data,
        socialLinks: {
          ...data.socialLinks,
          [socialField]: value,
        },
      });
    } else {
      setData({ ...data, [field]: value });
    }
  };

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/portfolio/personal', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setMessage({ type: 'success', text: 'Personal data saved successfully!' });
        // Trigger revalidation
        await fetch('/api/portfolio', { method: 'POST' });
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to save' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="editor-loading">Loading...</div>;
  }

  if (!data) {
    return <div className="editor-error">Failed to load data</div>;
  }

  return (
    <div className="editor-container">
      <div className="editor-header">
        <h1>Personal Data</h1>
        <button onClick={handleSave} className="save-btn" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}

      <div className="editor-form">
        <div className="form-row">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>First Name (Hero)</label>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Last Name (Hero)</label>
            <input
              type="text"
              value={data.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>About</label>
          <textarea
            value={data.about}
            onChange={(e) => handleChange('about', e.target.value)}
            rows={8}
            placeholder="Use double line breaks for paragraphs"
          />
        </div>

        <div className="form-group">
          <label>Resume URL</label>
          <input
            type="url"
            value={data.resumeUrl}
            onChange={(e) => handleChange('resumeUrl', e.target.value)}
          />
        </div>

        <h3>Social Links</h3>
        <div className="form-row">
          <div className="form-group">
            <label>GitHub</label>
            <input
              type="url"
              value={data.socialLinks.github}
              onChange={(e) => handleChange('socialLinks.github', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="url"
              value={data.socialLinks.linkedin}
              onChange={(e) => handleChange('socialLinks.linkedin', e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Twitter</label>
          <input
            type="url"
            value={data.socialLinks.twitter}
            onChange={(e) => handleChange('socialLinks.twitter', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
