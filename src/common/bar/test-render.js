import React, { Component } from 'react'
import { rand } from '../test-util'
import * as background from '../background'
import * as bar from './index'
import TestCanvas from '../test-canvas'

const Y_MIN = 0
const Y_MAX = 100

function generateRandomData (length) {
  let data = []

  for (let i = 0; i < length; i++) {
    const backgroundColor = Math.random() > 0.5 ? 'red' : 'green'
    const lineColor = Math.random() > 0.5 ? 'yellow' : 'blue'

    data.push({
      y: rand(Y_MIN, Y_MAX),
      backgroundColor,
      lineColor
    })
  }

  data.sort((a, b) => a.x - b.x)

  return data
}

const FIXED_DATA = [{
  y: Y_MIN
}, {
  y: Math.round((Y_MAX - Y_MIN) / 2),
  lineColor: 'red',
  backgroundColor: 'yellow'
}, {
  y: Y_MAX,
  lineColor: 'blue',
  backgroundColor: 'green'
}]

const RANDOM_DATA_SMALL = generateRandomData(10)
const RANDOM_DATA_MEDIUM = generateRandomData(100)
const RANDOM_DATA_LARGE = generateRandomData(1000)

class TestRender extends Component {
  render () {
    return (
      <div>
        <h3>Bar (Fixed data)</h3>
        <TestCanvas
          {...this.props}
          xMin={0}
          xMax={FIXED_DATA.length}
          draw={bar.draw}
          data={FIXED_DATA}
          drawBackground={background.draw}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_SMALL.length} data)`}</h3>
        <TestCanvas
          {...this.props}
          xMin={0}
          xMax={RANDOM_DATA_SMALL.length}
          draw={bar.draw}
          data={RANDOM_DATA_SMALL}
          drawBackground={background.draw}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_MEDIUM.length} data)`}</h3>
        <TestCanvas
          {...this.props}
          xMin={0}
          xMax={RANDOM_DATA_MEDIUM.length}
          draw={bar.draw}
          data={RANDOM_DATA_MEDIUM}
          drawBackground={background.draw}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_LARGE.length} data)`}</h3>
        <TestCanvas
          {...this.props}
          xMin={0}
          xMax={RANDOM_DATA_LARGE.length}
          draw={bar.draw}
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
  bar: {
    getBackgroundColor: d => 'green',
    getLineColor: d => 'yellow',
    lineWidth: 1
  },
  data: [],
  yMin: Y_MIN,
  yMax: Y_MAX,
  xMin: 0,
  xMax: 0
}

export default TestRender
