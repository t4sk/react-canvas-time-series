import React, { Component } from 'react'
import {canvas, GraphCanvas} from 'react-canvas-graph'
import { rand } from './util'
const { background, line } = canvas

const X_MIN = 1900
const X_MAX = 2018
const Y_MIN = 0
const Y_MAX = 100

const FIXED_DATA = [{
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

class LineTestRender extends Component {
  drawBackground = (ctx) => {
    background.fillCanvas(ctx, this.props)
    background.draw(ctx, this.props)
  }

  drawData = (ctx, data) => {
    line.draw(ctx, {
      ...this.props,
      data,
    })
  }

  render () {
    return (
      <div>
        <h3>Line Graph</h3>
        <GraphCanvas
          {...this.props}
          drawData={(ctx) => this.drawData(ctx, FIXED_DATA)}
          drawBackground={this.drawBackground}
        />

        <h3>Line Graph (Random)</h3>
        <GraphCanvas
          {...this.props}
          drawData={(ctx) => this.drawData(ctx, RANDOM_DATA)}
          drawBackground={this.drawBackground}
        />
      </div>
    )
  }
}

LineTestRender.defaultProps = {
  canvas: {
    width: 500,
    height: 300,
    backgroundColor: 'beige',
  },
  background: {
    top: 10,
    left: 20,
    width: 450,
    height: 270,
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
    left: 70,
    top: 10,
    width: 400,
    height: 220
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

export default LineTestRender
