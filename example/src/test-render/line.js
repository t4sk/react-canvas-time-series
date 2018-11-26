import React, { Component } from 'react'
import {canvas, GraphCanvas} from 'react-canvas-graph'
import { rand } from '../util'
const { background, line, math } = canvas

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
    canvas.fill(ctx, this.props.canvas)
    background.draw(ctx, this.props.background)
  }

  render () {
    return (
      <div>
        <h3>Line</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={this.drawBackground}
          drawData={(ctx) => {
            line.draw(ctx, {
              ...this.props.line,
              data: FIXED_DATA,
              xMin: X_MIN,
              xMax: X_MAX,
              yMin: Y_MIN,
              yMax: Y_MAX,
            })
          }}
        />

        <h3>Line (Random)</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={this.drawBackground}
          drawData={(ctx) => {
            line.draw(ctx, {
              ...this.props.line,
              data: RANDOM_DATA,
              xMin: X_MIN,
              xMax: X_MAX,
              yMin: Y_MIN,
              yMax: Y_MAX,
            })
          }}
        />

        <h3>Point</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={this.drawBackground}
          drawData={(ctx) => {
            const {
              graph,
              xMax,
              xMin,
              yMax,
              yMin,
            } = this.props.line

            const canvasX = math.linear({
              dy: graph.width,
              dx: xMax - xMin,
              y0: graph.left - graph.width / (xMax - xMin) * xMin
            })((xMax + xMin) / 2)

            const canvasY = math.linear({
              dy: -graph.height,
              dx: yMax - yMin,
              y0: graph.top + graph.height + graph.height / (yMax - yMin) * yMin
            })((yMax + yMin) / 2)

            line.drawPoint(ctx, {
              canvasX,
              canvasY,
              color: 'orange',
              radius: 3,
              ambientColor: 'rgba(255, 255, 0, 0.5)',
              ambientRadius: 10,
            })
          }}
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
    xInterval: 15,

    xMin: X_MIN,
    xMax: X_MAX,
    yMin: Y_MIN,
    yMax: Y_MAX
  },
  line: {
    graph: {
      left: 70,
      top: 10,
      width: 400,
      height: 220
    },
    color: 'green',
    width: 1,
    data: [],
    xMin: X_MIN,
    xMax: X_MAX,
    yMin: Y_MIN,
    yMax: Y_MAX
  },
}

export default LineTestRender
