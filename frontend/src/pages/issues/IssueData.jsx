import { useState, useEffect } from 'react';
import axios from 'axios';
import './IssueData.css';

const STATUS_LABELS = {
  crisis:    'Crisis',
  open:      'Open',
  verifying: 'Verifying',
  resolved:  'Resolved',
};

function formatDate(dateStr) {
  if (!dateStr) return 'Unknown date';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function IssueItem({ item }) {
  return (
    <div className="idata-item">
      <div className="idata-item-header">
        <span className="idata-item-title">{item.title}</span>
        <span className={`idata-badge status-${item.status}`}>
          {STATUS_LABELS[item.status] || item.status}
        </span>
      </div>

      <div className="idata-fields">
        <div className="idata-field">
          <span className="idata-field-label">Address</span>
          <span className="idata-field-value">{item.address}</span>
        </div>
        <div className="idata-field">
          <span className="idata-field-label">Reported</span>
          <span className="idata-field-value">{formatDate(item.reported_date)}</span>
        </div>
        <div className="idata-field">
          <span className="idata-field-label">Coordinates</span>
          <span className="idata-field-value">
            {item.lat?.toFixed(5)}, {item.lng?.toFixed(5)}
          </span>
        </div>
      </div>

      {item.description && (
        <div className="idata-desc-block">
          <span className="idata-field-label">Description</span>
          <p className="idata-item-desc">{item.description}</p>
        </div>
      )}
    </div>
  );
}

function IssueData({ issue, onClose }) {
  const [clubbedIssuesList, setClubbedIssuesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          'http://localhost:5001/api/clubbedIssuesDisplay',
          { 
            params: { issue_id: issue.issue_id },
            withCredentials: true 
          }
        );
        setClubbedIssuesList(response.data);
      } catch (err) {
        alert(err.response?.data?.message || 'Fetch failed');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [issue]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div className="idata-overlay" onClick={handleOverlayClick}>
      <div className="idata-panel">

        {/* ── Header ── */}
        <div className="idata-header">
          <div className="idata-header-left">
            <span className="idata-header-title">Issues at this location</span>
            {!loading && (
              <span className="idata-count">{clubbedIssuesList.length}</span>
            )}
          </div>
          <button className="idata-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* ── List ── */}
        <div className="idata-list">
          {loading && (
            <p className="idata-empty">Loading...</p>
          )}

          {!loading && clubbedIssuesList.length === 0 && (
            <p className="idata-empty">No issues found at this location.</p>
          )}

          {!loading && clubbedIssuesList.map((item, index) => (
            <IssueItem key={item.issue_id_unclubbed || index} item={item} />
          ))}
        </div>

      </div>
    </div>
  );
}

export default IssueData;