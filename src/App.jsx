import React from 'react';
import GolController from './gol/Controller';
import './App.css';

const App = () => (
  <div id="app-wrapper">

    <header >
      <div className="root">
        <img src="./favicon-32x32.png" alt="logo" />
        <span>Game of Life</span>
      </div>
    </header>

    <div id="content">
      <GolController />
    </div>

    <footer>
      <div>
        <a href="https://github.com/ropaolle/game-of-life"><img src="./github.svg" alt="github" /></a> By <b>RopaOlle </b>
      </div>
      <div>Game of Life 2018 <img src="./favicon-32x32.png" alt="logo" /></div>
    </footer>

  </div>
);

export default App;
