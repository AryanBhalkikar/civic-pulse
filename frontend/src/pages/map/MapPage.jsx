import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import IssueList from './IssueList';
import MapView from './MapView';
import IssueForm from '../form/IssueForm';
import Searchbar from './Searchbar';
import fetchData from './fetchData';
import './Map.css';

function MapPage(){

    const [issuesList, setIssuesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mapCenter, setMapCenter] = useState([12.9118, 77.6387]); //To be changed later

    function handleCenterChange(newCenter){
        setMapCenter(newCenter);
    }

    useEffect(() => {
        const controller = new AbortController();
        fetchData(setIssuesList, setLoading);
        return () => controller.abort();
    }, []);

    return (
        <div className="map-page">

        <div className="map-topbar">
            <div className="map-logo">
                <div className="map-logo-dot"></div>
                <span>ZonePulse</span>
            </div>
            <Searchbar
            handleCenterChange={handleCenterChange}
            />
        </div>

        <div className="map-body">
            <IssueList
            issues={issuesList}
            loading={loading}
            />
            <MapView
            issues={issuesList}
            center={mapCenter}
            setIssuesList={setIssuesList}
            setLoading={setLoading}
            />
        </div>

        </div>
    )

}

export default MapPage;