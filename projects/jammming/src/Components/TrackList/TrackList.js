import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.props.tracks.map(track => {return <Track track={track} onAdd= {this.props.onAdd} key={track.id} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove} />})
        }
      </div>
    )
  }
}

export default TrackList;