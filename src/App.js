
import React, { useState, useEffect } from "react";
import { searchTracks, getAccessToken } from "./api";
import "./App.css"; // add styles

function App() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get access token on component mount
    const fetchToken = async () => {
      try {
        console.log('Fetching access token...');
        const accessToken = await getAccessToken();
        console.log('Access token obtained successfully');
        setToken(accessToken);
        setError("");
      } catch (err) {
        console.error('Failed to get access token:', err);
        setError(err.message);
      }
    };
    fetchToken();
  }, []);



  const handleSearch = async () => {
    if (!query || !token) return;
    
    setLoading(true);
    setError("");
    
    try {
      const results = await searchTracks(query, token);
      setTracks(results);
    } catch (err) {
      setError(err.message);
      if (err.message.includes("Authentication failed")) {
        // Try to refresh token
        try {
          const newToken = await getAccessToken();
          setToken(newToken);
          const results = await searchTracks(query, newToken);
          setTracks(results);
        } catch (refreshErr) {
          setError(refreshErr.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">🎵 Music Explorer</h1>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="search-bar">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && query && token && !loading) {
              handleSearch();
            }
          }}
          placeholder="Search for songs..."
          disabled={!token || loading}
        />
        <button onClick={handleSearch} disabled={!query || !token || loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {!token && !error && (
        <div className="loading-message">
          <p>Connecting to Spotify...</p>
        </div>
      )}

      <div className="track-grid">
        {tracks.map((track) => (
          <div key={track.id} className="track-card">
            <img src={track.album.images[0]?.url} alt={track.name} />
            <div className="track-name">{track.name}</div>
            <div className="artist-name">{track.artists.map(artist => artist.name).join(", ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
