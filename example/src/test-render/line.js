import React, { Component } from 'react'
import {canvas, GraphCanvas} from 'react-canvas-time-series'
import { rand } from '../util'
const { line, math } = canvas

const X_MIN = 0
const X_MAX = 1000
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
  render () {
    return (
      <div>
        <h3>Line</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'line',
            data: FIXED_DATA,
          }]}
        />

        <h3>Line (Random)</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'line',
            data: RANDOM_DATA,
          }]}
        />

        <h3>Multiple Lines</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'line',
            lineColor: 'green',
            lineWidth: 3,
            data: FIXED_DATA,
          }, {
            type: 'line',
            lineColor: 'blue',
            lineWidth: 1,
            data: RANDOM_DATA,
          }]}
        />

        <h3>TODO Point</h3>
        <GraphCanvas
          {...this.props}
          drawData={(ctx) => {
            const {
              graph,
              xMax,
              xMin,
              yMax,
              yMin,
            } = this.props.line

            const canvasX = math.toCanvasX({
              width: graph.width,
              left: graph.left,
              xMax,
              xMin,
            })((xMax + xMin) / 2)

            const canvasY = math.toCanvasY({
              height: graph.height,
              top: graph.top,
              yMax,
              yMin
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
  backgroundColor: 'beige',
  yTickInterval: 10,
  xTickInterval: 100,

  xMin: X_MIN,
  xMax: X_MAX,
  yMin: Y_MIN,
  yMax: Y_MAX,
}

export default LineTestRender
