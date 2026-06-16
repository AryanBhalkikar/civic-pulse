function HeatmapPreview() {
  const pins = [
    { top: '35%', left: '25%', color: '#E24B4A', label: 'Pothole' },
    { top: '20%', left: '55%', color: '#BA7517', label: 'Streetlight' },
    { top: '65%', left: '65%', color: '#1D9E75', label: 'Resolved' },
    { top: '60%', left: '18%', color: '#BA7517', label: 'Blocked road' },
  ]

  return (
    <div className="map-preview">
      <div className="map-grid"></div>
      {pins.map((pin, i) => (
        <div key={i} className="pin" style={{ top: pin.top, left: pin.left }}>
          <div className="pin-dot" style={{ background: pin.color }}></div>
          <div className="pin-label" style={{ background: pin.color }}>{pin.label}</div>
        </div>
      ))}
      <div className="crisis-ring">
        <div className="crisis-inner"></div>
        <div className="crisis-badge">×5 CRISIS</div>
      </div>
    </div>
  )
}

export default HeatmapPreview