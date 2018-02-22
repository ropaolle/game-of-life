import React from 'react';
import AppBar from './AppBar';
import Footer from './AppFooter';
import GolController from './pages/gol/GolController';
import './App.css';

const App = () => (
  <div id="app-wrapper">
    <AppBar />
    <div id="content">
      <GolController />
    </div>
    <Footer />
  </div>
);

export default App;
