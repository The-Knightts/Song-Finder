# Music Explorer App

A React application that allows users to search for music tracks using the Spotify Web API.

## Setup Instructions

### 1. Get Spotify API Credentials

To fix the 401 authentication error, you need to obtain Spotify API credentials:

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Log in with your Spotify account (or create one if needed)
3. Click "Create an App"
4. Fill in the app details:
   - App name: "Music Explorer" (or any name you prefer)
   - App description: "A music search application"
   - Check the boxes for agreement
5. Click "Create"
6. On your app dashboard, click "Settings"
7. Copy your "Client ID" and "Client Secret"

### 2. Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values with your actual credentials:

```
REACT_APP_SPOTIFY_CLIENT_ID=your_actual_client_id_here
REACT_APP_SPOTIFY_CLIENT_SECRET=your_actual_client_secret_here
```

### 3. Restart the Development Server

After adding your credentials, restart the development server:

```bash
# Stop the current server (Ctrl+C)
npm start
```

## Features

- Search for music tracks using the Spotify API
- View track details including album artwork
- Play 30-second previews (when available)
- Responsive design with modern UI
- Proper error handling and loading states

## How It Works

The application now uses the Spotify Web API with proper authentication:

1. **Authentication**: Uses Client Credentials flow to obtain an access token
2. **Search**: Searches for tracks using the Spotify Search API
3. **Error Handling**: Gracefully handles authentication errors and token expiration
4. **UI States**: Shows loading indicators and error messages

## Troubleshooting

### 401 Authentication Error
If you still see a 401 error:
- Double-check your Client ID and Client Secret are correct
- Ensure there are no extra spaces in your `.env` file
- Restart the development server after making changes

### Other Issues
- Make sure you have a stable internet connection
- Check that the Spotify API is accessible
- Verify your Spotify app is properly configured

## Technical Details

- **Frontend**: React with hooks (useState, useEffect)
- **API**: Spotify Web API
- **Authentication**: Client Credentials flow
- **HTTP Client**: Axios
- **Styling**: CSS with modern design patterns
