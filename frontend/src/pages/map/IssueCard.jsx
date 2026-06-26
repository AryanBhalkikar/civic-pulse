const STATUS_LABELS = {
  open:      'Open',
  resolved:  'Resolved',
}

function IssueCard({ issue, onIssueClick }) {
  return (
    <div className="issue-card" onClick={onIssueClick}>
      <div className="issue-card-top">
        <span className="issue-card-title">{issue.title}</span>
        <span className={`issue-badge issue-badge-${issue.status}`}>
          {STATUS_LABELS[issue.status]}
        </span>
      </div>
      <div className="issue-card-location">{issue.address}</div>
      <div className="issue-card-meta">
        <span>{issue.report_count} report{issue.report_count !== 1 ? 's' : ''}</span>
        <span>{issue.last_reported_date}</span>
      </div>
    </div>
  )
}

export default IssueCard