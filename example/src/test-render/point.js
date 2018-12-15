import React, { Component } from 'react'
import {GraphCanvas} from 'react-canvas-time-series'
import { rand } from '../util'

const X_MIN = 0
const X_MAX = 1000
const Y_MIN = 0
const Y_MAX = 100

const FIXED_DATA = [{
  x: X_MIN, y: Y_MIN
}, {
  x: (X_MAX + X_MIN) / 2, y: (Y_MAX + Y_MIN) / 2
}, {
  x: X_MAX, y: Y_MAX
}]

const COLORS = [
  "olive",
  "lime",
  "green",
  "aqua",
  "teal",
  "blue",
  "navy",
  "fuchsia",
  "purple",
  "red",
  "orange",
  "yellow",
  "blue",
]

let RANDOM_DATA = []
for (let i = 0; i < 100; i++) {
  RANDOM_DATA.push({
    pointColor: COLORS[i % COLORS.length],
    pointRadius: i % 4,
    pointAmbientColor: 'rgba(255, 255, 0, 0.5)',
    pointAmbientRadius: 10,
    x: rand(X_MIN, X_MAX),
    y: rand(Y_MIN, Y_MAX)
  })
}

class PointTestRender extends Component {
  render () {
    return (
      <div>
        <h3>Point (Fixed data)</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'point',
            data: FIXED_DATA
          }]}
        />

        <h3>Point (Random)</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'point',
            data: RANDOM_DATA
          }]}
        />

        <h3>Point (Graph props)</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'point',
            pointColor: "red",
            pointRadius: 4,
            pointAmbientColor: 'rgba(255, 0, 0, 0.1)',
            pointAmbientRadius: 14,
            data: FIXED_DATA
          }]}
        />
      </div>
    )
  }
}

PointTestRender.defaultProps = {
  backgroundColor: 'beige',
  yTickInterval: 10,
  xTickInterval: 100,

  xMin: X_MIN,
  xMax: X_MAX,
  yMin: Y_MIN,
  yMax: Y_MAX,
}

export default PointTestRender
