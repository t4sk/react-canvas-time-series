import React, { Component } from 'react'
import {GraphCanvas} from 'react-canvas-time-series'
import { rand } from '../util'

const X_MIN = 0
const X_MAX = 100
const Y_MIN = 0
const Y_MAX = 100

function generateRandomData (length) {
  let data = []

  const xStep = (X_MAX - X_MIN) / length
  for (let i = 0; i < length; i++) {
    data.push({
      x: i * xStep,
      y: rand(Y_MIN, Y_MAX),
    })
  }

  return data
}

const FIXED_DATA = [{
  x: X_MIN,
  y: Y_MIN
}, {
  x: (X_MIN + X_MAX) / 2,
  y: (Y_MAX + Y_MIN) / 2,
}, {
  x: X_MAX,
  y: Y_MAX,
}]

const RANDOM_DATA_SMALL = generateRandomData(10)
const RANDOM_DATA_MEDIUM = generateRandomData(100)
const RANDOM_DATA_LARGE = generateRandomData(1000)

const NUM_Y_INTERVALS = 10

class BarTestRender extends Component {
  render () {
    return (
      <div>
        <h3>Bar (Fixed data)</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'bar',
            barWidth: 100,
            data: FIXED_DATA,
          }]}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_SMALL.length} data)`}</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'bar',
            width: 20,
            data: RANDOM_DATA_SMALL,
          }]}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_MEDIUM.length} data)`}</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'bar',
            width: 5,
            data: RANDOM_DATA_MEDIUM,
          }]}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_LARGE.length} data)`}</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'bar',
            width: 2,
            data: RANDOM_DATA_LARGE,
          }]}
        />

        <h3>Bar (Bar props)</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'bar',
            getColor: d => 'rgba(255, 0, 255, 0.5)',
            width: 60,
            data: [{
              x: (X_MAX + X_MIN) / 2,
              y: (Y_MAX - Y_MIN) / 2
            }]
          }]}
        />
      </div>
    )
  }
}

BarTestRender.defaultProps = {
  background: {
    color: 'beige',
    yTickInterval: 10,
    xTickInterval: 10,
  },
  xMin: X_MIN,
  xMax: X_MAX,
  yMin: Y_MIN,
  yMax: Y_MAX,
}

export default BarTestRender
