import React, { Component } from 'react'
import { rand } from '../test-util'
import TestCanvas from '../test-canvas'
import * as background from '../background'
import * as line from './index'

const X_MIN = 1900
const X_MAX = 2018
const Y_MIN = 0
const Y_MAX = 100

const DATA = [{
  x: X_MIN, y: Y_MIN
}, {
  x: X_MAX, y: Y_MAX
}]

let RANDOM_DATA = []

for (let i = 0; i < 100; i++) {
  RANDOM_DATA.push({
    x: rand(X_MIN, X_MAX),
    y: rand(Y_MIN, Y_MAX)
  })
}

RANDOM_DATA.sort((a, b) => a.x - b.x)

class TestRender extends Component {
  render () {
    return (
      <div>
        <h3>Line Graph</h3>
        <TestCanvas
          {...this.props}
          draw={(ctx, props) => {
            line.draw(ctx, {
              ...props,
              data: DATA
            })
          }}
          drawBackground={background.draw}
        />

        <h3>Line Graph (Random)</h3>
        <TestCanvas
          {...this.props}
          draw={(ctx, props) => {
            line.draw(ctx, {
              ...props,
              data: RANDOM_DATA
            })
          }}
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
  line: {
    color: 'green',
    width: 2
  },
  data: [],
  xMin: X_MIN,
  xMax: X_MAX,
  yMin: Y_MIN,
  yMax: Y_MAX
}

export default TestRender
