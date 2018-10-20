import React, { Component } from 'react'
import { rand } from '../test-util'
import TestCanvas from '../test-canvas'
import * as background from '../background'
import * as candlestick from './index'

const X_MIN = 1900
const X_MAX = 2018
const Y_MIN = 0
const Y_MAX = 100

function generateRandomData (length) {
  let data = []

  for (let i = 0; i < length; i++) {
    const high = rand(Y_MIN, Y_MAX)
    const low = rand(Y_MIN, high)
    const open = rand(low, high)
    const close = rand(low, high)

    data.push({
      high,
      low,
      open,
      close
    })
  }

  return data
}

const FIXED_DATA = [{
  high: Y_MAX - 10,
  low: Y_MIN,
  open: Y_MIN + 10,
  close: Y_MAX - 20
}, {
  high: Y_MAX,
  low: Y_MIN + 10,
  open: Y_MAX - 10,
  close: Y_MIN + 20
}]

const RANDOM_DATA_SMALL = generateRandomData(10)
const RANDOM_DATA_MEDIUM = generateRandomData(100)
const RANDOM_DATA_LARGE = generateRandomData(1000)

class TestRender extends Component {
  render () {
    return (
      <div>
        <h3>Candlestick (Fixed data)</h3>
        <TestCanvas
          {...this.props}
          xMin={0}
          xMax={FIXED_DATA.length}
          draw={candlestick.draw}
          data={FIXED_DATA}
          drawBackground={background.draw}
        />

        <h3>{`Candlestick (Random ${RANDOM_DATA_SMALL.length} data)`}</h3>
        <TestCanvas
          {...this.props}
          xMin={0}
          xMax={RANDOM_DATA_SMALL.length}
          draw={candlestick.draw}
          data={RANDOM_DATA_SMALL}
          drawBackground={background.draw}
        />

        <h3>{`Candlestick (Random ${RANDOM_DATA_MEDIUM.length} data)`}</h3>
        <TestCanvas
          {...this.props}
          xMin={0}
          xMax={RANDOM_DATA_MEDIUM.length}
          draw={candlestick.draw}
          data={RANDOM_DATA_MEDIUM}
          drawBackground={background.draw}
        />

        <h3>{`Candlestick (Random ${RANDOM_DATA_LARGE.length} data)`}</h3>
        <TestCanvas
          {...this.props}
          xMin={0}
          xMax={RANDOM_DATA_LARGE.length}
          draw={candlestick.draw}
          data={RANDOM_DATA_LARGE}
          drawBackground={background.draw}
        />
      </div>
    )
  }
}

TestRender.defaultProps = {
  draw: (ctx, props) => {},
  canvas: {
    width: 500,
    height: 300
  },
  margin: {
    top: 10,
    bottom: 20,
    left: 20,
    right: 30
  },
  background: {
    backgroundColor: 'lightgrey',

    showYLabel: true,
    showYLine: true,
    yLineWidth: 1,
    yLineColor: 'red',
    yAxisAt: 'left',
    yAxisWidth: 50,
    yLabelFont: '12px Arial',
    yLabelColor: 'black',
    renderYLabel: y => y,
    yInterval: 10,

    showXLabel: true,
    showXLine: true,
    xLineWidth: 1,
    xLineColor: 'blue',
    xAxisAt: 'bottom',
    xAxisHeight: 50,
    xLabelFont: '12px Arial',
    xLabelColor: 'black',
    renderXLabel: x => x,
    xInterval: 15
  },
  graph: {
    // y label left, x label bottom
    x: 70, // margin.left + x.axis.width
    y: 10, // margin.top
    width: 400, // canvas.width - (margin.left + margin.right + x.axis.width)
    height: 220 // canvas.height - (margin.top + margin.bottom + y.axis.height)
  },
  candlestick: {
    wickWidth: 2,
    getWickColor: (d) => d.open <= d.close ? 'blue' : 'orange',
    lineWidth: 1,
    getLineColor: (d) => d.open <= d.close ? 'green' : 'red',
    getBackgroundColor: (d) => d.open <= d.close ? 'lightgreen' : 'pink'
  },
  data: [],
  yMin: Y_MIN,
  yMax: Y_MAX,
  xMin: 0,
  xMax: 0
}

export default TestRender
