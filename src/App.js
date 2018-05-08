import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Candlestick from './candlestick'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div style={{margin: 10}}></div>

        <Candlestick
          width={500}
          height={300}
        />
      </div>
    );
  }
}

export default App;
