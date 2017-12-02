import React, { Component } from 'react';
import './App.css';
import BusinessList from './components/BusinessList/BusinessList.js';
import SearchBar from './components/SearchBar/SearchBar.js';
import Yelp from './util/Yelp.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: []
    };
    this.searchYelp.bind(this);
  }

  searchYelp(term, location, sortBy) {
    // Yelp.search(term, location, sortBy).then(businesses => {console.log(businesses)});
      console.log(this.setState);
      const mySetState = this.setState.bind(this);
      const updateBusiness = businesses => {mySetState({businesses: businesses})};
      Yelp.search(term, location, sortBy).then(updateBusiness.bind(this));
  }

  render() {
    return (
      <div className="App">
  <h1>ravenous</h1>
  <SearchBar searchYelp={this.searchYelp}/>
  <BusinessList businesses={this.state.businesses} />
</div>
    );
  }
}

export default App;