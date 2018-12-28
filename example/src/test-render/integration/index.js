import React, { Component } from 'react'
import {GraphCanvas} from 'react-canvas-time-series'
import TestNearestData from './test-nearest-data'
import Candlestick from './candlestick'

class IntegrationTestRender extends Component {
  render () {
    return (
      <div>
        <h3>Candlestick</h3>
        <Candlestick {...this.props} />

        <h3>Nearest Data</h3>
        <TestNearestData {...this.props} />
      </div>
    )
  }
}

IntegrationTestRender.defaultProps = {
  background: {
    color: 'beige',
    yTickInterval: 10,
    xTickInterval: 100,
    renderXTickLabel: x => Math.round(x),
    renderYTickLabel: y => Math.round(y),
  },

  xMin: 0,
  xMax: 1000,
  yMin: 0,
  yMax: 100,

  showUI: true,
  ui: {
    renderXLabel: x => Math.round(x),
    renderYLabel: y => Math.round(y),
  },
}

export default IntegrationTestRender
