import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar.js';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
   super(props);
   this.state = {
     searchResults: [],
     playlistName: 'My Playlist',
     playlistTracks: []
   }
   this.addTrack = this.addTrack.bind(this);
   this.removeTrack = this.removeTrack.bind(this);
   this.updatePlaylistName = this.updatePlaylistName.bind(this);
   this.savePlaylist = this.savePlaylist.bind(this);
   this.search = this.search.bind(this);
 };
 
 addTrack(track) {
   if (!this.state.playListTracks.find(track.id)) { this.state.playListTracks.push(track) };
 }
 
 removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);

    this.setState({playlistTracks: tracks});
  }
  
  updatePlaylistName(name) {
   this.setState({playlistName: name});
 }
 
 savePlaylist() {
    const trackUris = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris);
    this.setState({
      playlistName: "New Playlist",
      searchResults: [],
      playlistTracks: []
    });
  }
 
 search(term) {
    Spotify.search(term)
      .then(searchResults => this.setState({
        searchResults: searchResults
      }));
  }
 
 render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults onAdd= {this.addTrack} searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.state.removeTrack} onNameChange={this.state.updatePlaylistName} onSave={this.state.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;