import { useState } from 'react'
import IssueCard from './IssueCard'
import IssueData from '../issues/IssueData';

function IssueList({ issues, loading }) {
  
  const [showIssue, setShowIssue] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  function handleIssueClick(issue){
    setSelectedIssue(issue);
    setShowIssue(true);
  }

  return (
    <div className="issue-list">
      <div className="issue-list-header">
        <span className="issue-list-title">Issues near you</span>
        <span className="issue-list-count">{issues.length}</span>
      </div>

      <div className="issue-list-scroll">
        {loading && (
          <div className="issue-list-empty">Loading issues...</div>
        )}

        {!loading && issues.length === 0 && (
          <div className="issue-list-empty">No issues reported in this area yet.</div>
        )}

        {!loading && issues.map(issue => (
          <IssueCard
            key={issue.issue_id}
            issue={issue}
            onIssueClick={() => handleIssueClick(issue)}
          />
        ))}
      </div>

      {showIssue && (
        <IssueData
          issue={selectedIssue}
          onClose={() => setShowIssue(false)}
        />
      )}

    </div>
  )
}

export default IssueList;