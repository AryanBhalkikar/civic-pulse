import { useState, useEffect } from 'react';
import axios from 'axios';
import './IssueData.css';
import IssueItem from './IssueItem.jsx';

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

  async function handleResolve(issue_id) {
    try{
      const response = await axios.post(
        `http://localhost:5001/api/resolveIssue/${issue_id}`,
        {},
        { withCredentials: true }
      );
      
      if (response.status === 200){
        alert('Vote successful!');
      }
    }
    catch(err){
      alert(err.response?.data?.message || "Vote failed");
    }
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

          {/* ── Footer ── */}
          {!loading && clubbedIssuesList.length > 0 && (
              <div className="idata-footer">
                  <span className="idata-footer-hint">
                      Mark this if the issue has been resolved by authorities.
                  </span>
                  <button
                      className="btn-resolved"
                      onClick={() => handleResolve(issue.issue_id)}
                  >
                      Mark as resolved
                  </button>
              </div>
          )}

      </div>
    </div>
  );
}

export default IssueData;