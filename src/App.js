import React, { Component } from 'react';
import './App.css';
import PriceGraph from './price-graph'
import Candlestick from './candlestick'
import LineGraph from './line-graph'

// TODO render price graph
class App extends Component {
  render() {
    return (
      <div className="App">
        {/*}
        <div style={{margin: 10}}>
          <Candlestick />
        </div>

        <div style={{margin: 10}}>
          <PriceGraph />
        </div>

        <div style={{margin: 10}}>
          <PriceGraph />
        </div>
        */}
      </div>
    );
  }
}

export default App;
