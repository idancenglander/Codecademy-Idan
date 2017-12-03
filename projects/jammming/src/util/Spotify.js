const clientId = 'db70e7c71c69484e8772c09addc1fe7d';
const secret = '99c9fe5bf094407a9d5bea06b11218c8';
const redirectURI = 'jammmidan.surge.sh';
let accessToken;

const Spotify = {
   getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  }, 
  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },
  savePlaylist(playlistName, trackURIs){
    if(!playlistName || !trackURIs){
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}`};
    let userID;
    let playlistID;

    fetch(
      'https://api.spotify.com/v1/me',
      {headers: headers}
    ).then(
      response => {
        if (response.ok){return response.json();}
      }
    ).then(
      jsonResponse => {
        userID = jsonResponse.id;
        fetch(
          `https://api.spotify.com/v1/users/${userID}/playlists`,
          {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({name: playlistName})
          }
        ).then(
          response => {
            if(response.ok){return response.json();}
          }
        ).then(
          jsonResponse => {
            playlistID = jsonResponse.id;
            fetch(
              `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
              {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({uris: trackURIs})
              }
            ).then(
              response => {
                if(response.ok){return response.json();}
              }
            ).then(
              jsonResponse => {playlistID = jsonResponse.id;}
            )
          }
        )
      }
    )
  }
}

export default Spotify;