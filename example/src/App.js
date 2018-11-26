import React, { Component } from 'react'
import BackgroundTestRender from './test-render/background'
import BarTestRender from './test-render/bar'
import LineTestRender from './test-render/line'
import CandlestickTestRender from './test-render/candlestick'
import UITestRender from './test-render/ui'

export default class App extends Component {
  render () {
    return (
      <div>
        <UITestRender />
        <CandlestickTestRender />
        <LineTestRender />
        <BarTestRender />
        <BackgroundTestRender />
      </div>
    )
  }
}
