import { useState, useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import IssueForm from '../form/IssueForm'
import IssueData from '../issues/IssueData'

const defaultZoom = 16.5;

// Fix Leaflet's default marker icons (they break with Vite)
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Custom coloured icons based on issue status
function makeIcon(color) {
  return L.divIcon({
    className: '',
    html: `
      <div style="
        background:${color};
        width:16px; height:16px;
        border-radius:50%;
        border:2px solid #fff;
        box-shadow:0 1px 4px rgba(0,0,0,0.3)
      "></div>
    `,
    iconSize: [16, 16],
    iconAnchor: [9, 9],
  })
}

const STATUS_COLORS = {
  crisis:    '#f00101',
  open:      '#ff0000',
  verifying: '#378ADD',
  resolved:  '#1D9E75',
}

// This inner component handles flying the map when center changes.
// It has to live inside <MapContainer> to access the map instance.
function FlyToLocation({ center, zoom }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 })
  }, [center, zoom])
  return null
}

function MapView({ issues, center, setIssuesList, setLoading }) {

  const [clickedPosition, setClickedPosition] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showIssue, setShowIssue] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const markerRefs = useRef({})  // store refs to each marker

  function MapClickHandler({ setClickedPosition, setShowForm }){
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        setShowForm(true);
        setClickedPosition([lat, lng]);
      },
    });
    return null;
  }

  function handleFormClose() {
    setShowForm(false);
  }

  function handleMarkerClick(issue){
    setSelectedIssue(issue);
    setShowIssue(true);
  }

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://openstreetmap.org">OpenStreetMap</a>'
        />

        <MapClickHandler setClickedPosition={setClickedPosition} setShowForm={setShowForm} />

        <FlyToLocation center={center} zoom={defaultZoom} />

        {issues.map(issue => (
          <Marker
            key={issue.issue_id}
            position={[issue.lat, issue.lng]}
            icon={makeIcon(STATUS_COLORS[issue.status] || STATUS_COLORS.open)}
            ref={el => { markerRefs.current[issue.issue_id] = el }}
            eventHandlers={{
              click: () => handleMarkerClick(issue)
            }}
          >
          </Marker>
        ))}

      </MapContainer>

      {showForm && 
        <IssueForm 
          onClose={handleFormClose} 
          lat={clickedPosition?.[0]} 
          lng={clickedPosition?.[1]}
          setIssuesList={setIssuesList}
          setLoading={setLoading}
        />
      }

      {showIssue && (
        <IssueData
          issue={selectedIssue}
          onClose={() => setShowIssue(false)}
        />
      )}

    </div>
  )
}

export default MapView;