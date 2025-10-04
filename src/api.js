import axios from "axios";

const API_BASE = "https://api.spotify.com/v1";

export const searchTracks = async (query, token) => {
  const res = await axios.get(`${API_BASE}/search`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { q: query, type: "track", limit: 10 },
  });
  return res.data.tracks.items;
};
