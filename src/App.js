import React, { Component } from 'react'
import './App.css'
import BackgroundTestRender from './common/background/test-render'
import UITestRender from './common/ui/test-render'
import LineTestRender from './common/line/test-render'
import BarTestRender from './common/bar/test-render'
import CandlestickTestRender from './common/candlestick/test-render'

// TODO fix memory leak
// TODO test canvas render after props update
// TODO flow
// TODO components for ui and graph
// TODO measure preformance and refactor
class App extends Component {
  render () {
    return (
      <div className="App">
        <UITestRender />
        <CandlestickTestRender />
        <BarTestRender />
        <LineTestRender />
        <BackgroundTestRender />
      </div>
    )
  }
}

export default App
