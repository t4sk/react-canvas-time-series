import React, { Component } from 'react'
import BackgroundTestRender from './test-render/background'
import LineTestRender from './test-render/line'
import PointTestRender from './test-render/point'
import BarTestRender from './test-render/bar'
import CandlestickTestRender from './test-render/candlestick'
import LabelTestRender from './test-render/label'
import UITestRender from './test-render/ui'
import IntegrationTestRender from './test-render/integration'
// import LineUITestRender from './test-render/line-ui'

export default class App extends Component {
  render () {
    return (
      <div>
        {/*}
        <LineUITestRender />
        */}
        <IntegrationTestRender />
        <UITestRender />
        <LabelTestRender />
        <CandlestickTestRender />
        <BarTestRender />
        <PointTestRender />
        <LineTestRender />
        <BackgroundTestRender />
      </div>
    )
  }
}
