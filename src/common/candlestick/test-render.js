import React, { Component } from 'react'
import { rand } from '../test-util'
import TestCanvas from '../test-canvas'
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
          draw={candlestick.draw}
          data={FIXED_DATA}
          drawBackground={true}
        />

        <h3>{`Candlestick (Random ${RANDOM_DATA_SMALL.length} data)`}</h3>
        <TestCanvas
          {...this.props}
          draw={candlestick.draw}
          data={RANDOM_DATA_SMALL}
          drawBackground={true}
        />

        <h3>{`Candlestick (Random ${RANDOM_DATA_MEDIUM.length} data)`}</h3>
        <TestCanvas
          {...this.props}
          draw={candlestick.draw}
          data={RANDOM_DATA_MEDIUM}
          drawBackground={true}
        />

        <h3>{`Candlestick (Random ${RANDOM_DATA_LARGE.length} data)`}</h3>
        <TestCanvas
          {...this.props}
          draw={candlestick.draw}
          data={RANDOM_DATA_LARGE}
          drawBackground={true}
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
    y: 20, // margin.
    width: 420, // canvas.width - (margin.left + margin.right + x.axis.width)
    height: 220 // canvas.height - (margin.top + margin.bottom + y.axis.height)
  },
  candlestick: {
    wick: {
      width: 2,
      getColor: (d) => d.open <= d.close ? 'blue' : 'orange'
    },
    body: {
      line: {
        width: 1,
        getColor: (d) => d.open <= d.close ? 'green' : 'red'
      },
      getBackgroundColor: (d) => d.open <= d.close ? 'lightgreen' : 'pink'
    }
  },
  data: [],
  yMin: Y_MIN,
  yMax: Y_MAX
}

export default TestRender
