//endpoint to get the user to login

export const authEndpoint = 'https://accounts.spotify.com/authorize';

const redirectUri = 'http://localhost:3000';

const clientId = '60564527960b4e339df97c95788dce2c';

const scopes = [
  // 'ugc-image-upload',
  'user-read-currently-playing',
  'user-library-modify',
  'user-library-read',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-modify-playback-state',
  // 'user-modify-playback-position',
  'user-top-read',
  // 'user-top-read',
  'playlist-modify-private',
  'playlist-read-collaborative',
  'playlist-read-private',
  // 'playlist-modify-public',
  'streaming',
  'app-remote-control',
  // 'user-read-email',
  // 'user-read-private',
  // 'user-follow-read',
  // 'user-follow-modify',
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=token&show_dialog=true`;
