import React, { Component } from 'react'
import './App.css'
import BackgroundTestRender from './common/background/test-render'
import PriceGraph from './price-graph'
import Candlestick from './candlestick'

// TODO render price graph
class App extends Component {
  render () {
    return (
      <div className="App">
        {/* }
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

        <BackgroundTestRender />
      </div>
    )
  }
}

export default App
