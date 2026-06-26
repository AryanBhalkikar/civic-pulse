const STATUS_LABELS = {
  open:      'Open',
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

export default IssueItem;