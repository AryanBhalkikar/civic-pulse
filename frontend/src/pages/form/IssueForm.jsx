import { useState, useEffect } from 'react';
import axios from 'axios';
import fetchData from '../map/fetchData';
import { getApiUrl } from '../../config/api';
import './IssueForm.css';

const ISSUE_TYPES = [
  'Pothole',
  'Open manhole',
  'Broken streetlight',
  'Blocked footpath',
  'Garbage pile',
  'Blocked road',
  'Damaged road divider',
  'Waterlogging',
  'Fallen tree',
  'Other',
];

function IssueForm({ onClose, lat, lng, setIssuesList, setLoading }) {
  const [formData, setFormData] = useState({
    title:       '',
    address:     '',
    lat:         lat,
    lng:         lng,
    description: '',
  });

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      lat: lat,
      lng: lng,
    }));
  }, [lat, lng]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    try{
        const response = await axios.post(
            getApiUrl('/api/reportIssue'),
            formData,
            { withCredentials: true }
        );

        if (response.status === 200){
            alert('Submission successful!');
            fetchData(setIssuesList, setLoading);
        }
    }
    catch(err){
        alert(err.response?.data?.message || "Submission failed");
    }

    onClose();
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="form-overlay" onClick={handleOverlayClick}>
      <div className="form-card">

        <div className="form-header">
          <div className="form-header-left">
            <div className="form-header-dot"></div>
            <h2 className="form-title">Report an issue here</h2>
          </div>
          <button className="form-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-body">

          <div className="field">
            <label htmlFor="title">Issue type</label>
            <select
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select an issue type...</option>
              {ISSUE_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="e.g. 80 Ft Rd, Koramangala 5th Block"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="lat">Latitude</label>
              <input
                id="lat"
                name="lat"
                type="number"
                step="any"
                placeholder="12.9352"
                value={formData.lat}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="lng">Longitude</label>
              <input
                id="lng"
                name="lng"
                type="number"
                step="any"
                placeholder="77.6245"
                value={formData.lng}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Describe the hazard."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit-form">
              Submit report
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default IssueForm;