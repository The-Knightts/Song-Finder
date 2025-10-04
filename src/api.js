import axios from "axios";

const API_BASE = "https://api.spotify.com/v1";
const AUTH_ENDPOINT = "https://accounts.spotify.com/api/token";

// Get client credentials token (for demo purposes)
// In production, you should implement proper OAuth flow
export const getAccessToken = async () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  
  console.log('Environment check:', { 
    hasClientId: !!clientId, 
    hasClientSecret: !!clientSecret,
    clientIdLength: clientId?.length,
    clientIdValue: clientId // Be careful with logging sensitive data in production
  });
  
  if (!clientId || !clientSecret) {
    throw new Error("Spotify credentials not configured. Please set REACT_APP_SPOTIFY_CLIENT_ID and REACT_APP_SPOTIFY_CLIENT_SECRET in your .env file");
  }

  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  // Create Base64 encoded string for Basic auth
  const authString = `${clientId}:${clientSecret}`;
  let base64Auth;
  
  try {
    // Try to use btoa first (browser environment)
    base64Auth = btoa(authString);
  } catch (e) {
    try {
      // Fallback to Buffer (Node.js environment)
      base64Auth = Buffer.from(authString).toString('base64');
    } catch (e2) {
      // Manual base64 encoding as last resort
      base64Auth = btoa(authString);
    }
  }
  
  console.log('Attempting to get access token with client ID:', clientId);
  
  try {
    const res = await axios.post(AUTH_ENDPOINT, params, {
      headers: {
        'Authorization': `Basic ${base64Auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log('Access token obtained successfully');
    return res.data.access_token;
  } catch (error) {
    console.error('Auth error details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      requestHeaders: error.config?.headers
    });
    
    if (error.response?.status === 400) {
      throw new Error(`Spotify authentication failed (400): ${error.response.data?.error_description || error.response.data?.error || 'Invalid client credentials'}`);
    } else if (error.response?.status === 401) {
      throw new Error("Authentication failed. Please check your Spotify credentials.");
    }
    
    throw new Error(`Failed to get access token: ${error.message}`);
  }
};

export const searchTracks = async (query, token) => {
  try {
    console.log('Searching for tracks with query:', query);
    const res = await axios.get(`${API_BASE}/search`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { q: query, type: "track", limit: 10 },
    });
    console.log('Search successful, found', res.data.tracks.items.length, 'tracks');
    return res.data.tracks.items;
  } catch (error) {
    console.error('Search error:', error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      throw new Error("Authentication failed. Please check your Spotify credentials.");
    } else if (error.response?.status === 400) {
      throw new Error(`Search failed (400): ${error.response.data?.error?.message || 'Bad request'}`);
    }
    throw error;
  }
};
