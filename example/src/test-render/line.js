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
