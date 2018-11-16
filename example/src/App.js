import React, { Component } from 'react'
import BackgroundTestRender from './background-test-render'
import BarTestRender from './bar-test-render'
import LineTestRender from './line-test-render'
import CandlestickTestRender from './candlestick-test-render'

export default class App extends Component {
  render () {
    return (
      <div>
        <CandlestickTestRender />
        <LineTestRender />
        <BarTestRender />
        <BackgroundTestRender />
      </div>
    )
  }
}
