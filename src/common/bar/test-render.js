import React, { Component } from 'react'
import { rand } from '../test-util'
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
          draw={bar.draw}
          data={FIXED_DATA}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_SMALL.length} data)`}</h3>
        <TestCanvas
          {...this.props}
          draw={bar.draw}
          data={RANDOM_DATA_SMALL}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_MEDIUM.length} data)`}</h3>
        <TestCanvas
          {...this.props}
          draw={bar.draw}
          data={RANDOM_DATA_MEDIUM}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_LARGE.length} data)`}</h3>
        <TestCanvas
          {...this.props}
          draw={bar.draw}
          data={RANDOM_DATA_LARGE}
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
  graph: {
    // y label left, x label bottom
    x: 60, // margin.left + x.axis.width
    y: 10, // margin.
    width: 420, // canvas.width - (margin.left + margin.right + x.axis.width)
    height: 220 // canvas.height - (margin.top + margin.bottom + y.axis.height)
  },
  data: [],
  yMin: Y_MIN,
  yMax: Y_MAX
}

export default TestRender
