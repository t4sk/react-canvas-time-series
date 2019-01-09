import React, { Component } from 'react'
import Axes from './test-render/axes'
import BackgroundTestRender from './test-render/background'
import LineTestRender from './test-render/line'
import PointTestRender from './test-render/point'
import BarTestRender from './test-render/bar'
import CandlestickTestRender from './test-render/candlestick'
import LabelTestRender from './test-render/label'
import UITestRender from './test-render/ui'
import IntegrationTestRender from './test-render/integration'

export default class App extends Component {
  render () {
    return (
      <div style={{margin: 20}}>
        <Axes />
        {/*
        <IntegrationTestRender />
        <UITestRender />
        <LabelTestRender />
        <CandlestickTestRender />
        <BarTestRender />
        <PointTestRender />
        <LineTestRender />
        <BackgroundTestRender />
        */}
      </div>
    )
  }
}
