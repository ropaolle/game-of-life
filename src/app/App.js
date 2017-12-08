import React, { Component } from 'react';
import AppBar from './AppBar';
import Footer from './Footer';
import GolController from '../pages/gol/GolController';

class App extends Component {
  render() {
    return (
      <div id="app-wrapper">
        <AppBar />
        <div id="content">
          <GolController />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
