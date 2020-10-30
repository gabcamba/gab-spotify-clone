import React, { useEffect } from 'react';
import './styles/App.css';
import Login from './Login';
import Player from './Player';
import { useDataLayerValue } from './DataLayer';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from 'spotify-web-api-js';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const spotify = new SpotifyWebApi();

const MySwal = withReactContent(Swal);

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromUrl();

    const _token = hash.access_token;

    spotify.setAccessToken(_token);
    window.location.hash = '';
    if (_token) {
      MySwal.fire({
        title: <p>Hi testers and collaborators! </p>,
        text:
          'My repo is open for testers and pull requests! \n\n Head on to GitHub, fork my repo and create your branch! ',
        footer: 'github.com/gabcamba/gab-spotify-clone',
        customClass: 'swal__custom',
      });
      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });

      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });

      // spotify.play
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists,
        });
      });

      spotify.getMySavedTracks().then((tracks) => {
        // console.log("saved tracks", tracks)
        dispatch({
          type: 'SET_SAVED_TRACKS',
          savedTracks: tracks,
        });
      });

      spotify.getMyRecentlyPlayedTracks().then((recents) => {
        dispatch({
          type: 'SET_RECENTS',
          recents: recents,
        });
      });

     


      spotify.getPlaylist('37i9dQZEVXcC89p75CkjPn').then((response) => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        });
      });
    }
  }, [dispatch]);

  return (
    <div className='App'>
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
