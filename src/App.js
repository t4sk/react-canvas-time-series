import React, { Component } from 'react'
import './App.css'
import BackgroundTestRender from './common/background/test-render'
import UITestRender from './common/ui/test-render'
import LineTestRender from './common/line/test-render'
import BarTestRender from './common/bar/test-render'
import CandlestickTestRender from './common/candlestick/test-render'
import IntegrationTestRender from './common/test-render'

// TODO fix memory leak
// TODO flow
// TODO optimizations (render diff)
// TODO draggable, zoomable component
// TODO display loading
// TODO rename margin to padding
class App extends Component {
  render () {
    return (
      <div className="App">
        <IntegrationTestRender />
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
