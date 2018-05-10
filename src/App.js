import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Candlestick from './candlestick'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{margin: 10}}>
          <Candlestick />
        </div>

      </div>
    );
  }
}

export default App;
