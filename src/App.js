
import React, { useState } from "react";
import { searchTracks } from "./api";
import "./App.css"; // add styles

function App() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState("BQC3OmJvaEJmkmlMHSAI36VEB_N7iCBk4WXR1h5x5ZeJwRaHEZYYnU59MQOPLZ9MCNljlGkKU1rlg7FXTXI9fM6mYqFfEQqCMdbmaCTQetYRQHWfwk6nFFG3NG-fw5ovki0D3T2_riZIORwngVgXyWBoEEc8bTO5uOo9z_ptlY7srdmZFuslbeUKNXdwAKZ1zvjm4AuoTn8obvQs-cJZZe6TKfX2hlEGE0OowQFygZ-_iHsLqcCAVXj35rXCFX_mJYsyOU5S8oaTIIJqcUqPeLBDMjCKqgm-u77_aWG9T3H1BDNJgBIx7XujI7MTjjqEdGZM"); 

  const handleSearch = async () => {
    if (!query || !token) return;
    const results = await searchTracks(query, token);
    setTracks(results);
  };

  return (
    <div className="app">
      <h1 className="title">🎵 Music Explorer</h1>

      <div className="search-bar">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for songs..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="track-grid">
        {tracks.map((track) => (
          <div key={track.id} className="track-card">
            <img src={track.album.images[0]?.url} alt={track.name} />
            <h2>{track.name}</h2>
            <p>{track.artists.map((a) => a.name).join(", ")}</p>
            {track.preview_url ? (
              <audio controls src={track.preview_url}></audio>
            ) : (
              <p className="no-preview">No Preview</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
