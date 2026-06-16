import { useState } from 'react';
import axios from 'axios';

function Searchbar({ handleCenterChange }){
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSearch(e){
        e.preventDefault();
        if (query.trim() == "")
            return;
        
        setLoading(true);
        try{
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&limit=1&format=json`
            );
            const { lat, lon } = response.data[0];
            handleCenterChange([lat, lon]);
        }
        catch(err){
            alert(err || "Search failed");
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <form className="search-bar" onSubmit={handleSearch}>
            <svg className="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
                type="text"
                placeholder="Enter a location. Click a spot on the map to report an issue at that location."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />
            {loading && <span className="search-loading">Loading Search...</span>}
        </form>
    )
}

export default Searchbar;