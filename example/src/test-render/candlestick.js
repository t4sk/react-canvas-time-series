import React, { Component } from 'react'
import {GraphCanvas} from 'react-canvas-time-series'
import { rand } from '../util'

const X_MIN = 0
const X_MAX = 1000
const Y_MIN = 0
const Y_MAX = 100

function generateRandomData (length) {
  let data = []

  const xStep = (X_MAX - X_MIN) / length

  let high = rand(Y_MIN, Y_MAX)
  let low = rand(Y_MIN, high)
  for (let i = 0; i < length; i++) {
    if (Math.random() > 0.5) {
      high += rand(0, (Y_MAX - Y_MIN) * 0.1)
      low += rand(0, (Y_MAX - Y_MIN) * 0.1)

      high = Math.min(high, Y_MAX)
      low = Math.min(low, Y_MAX)
    } else {
      high -= rand(0, (Y_MAX - Y_MIN) * 0.1)
      low -= rand(0, (Y_MAX - Y_MIN) * 0.1)

      high = Math.max(high, Y_MIN)
      low = Math.max(low, Y_MIN)
    }

    const open = rand(low, high)
    const close = rand(low, high)

    data.push({
      high,
      low,
      open,
      close,
      timestamp: xStep * i,
    })
  }

  return data
}

const FIXED_DATA = [{
  open: 20,
  close: 40,
  high: 50,
  low: 10,
  timestamp: X_MIN
}, {
  high: Y_MAX,
  low: Y_MIN,
  open: Y_MAX - 10,
  close: Y_MIN + 10,
  timestamp: (X_MAX + X_MIN) / 2
}, {
  high: Y_MAX,
  low: Y_MIN,
  open: Y_MIN + 10,
  close: Y_MAX - 10,
  timestamp: X_MAX
}]

const RANDOM_DATA_SMALL = generateRandomData(10)
const RANDOM_DATA_MEDIUM = generateRandomData(100)
const RANDOM_DATA_LARGE = generateRandomData(1000)

class CandlestickTestRender extends Component {
  render () {
    return (
      <div>
        <h3>Candlestick (Fixed data)</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'candlestick',
            candlestickWickWidth: 3,
            data: FIXED_DATA,
          }]}
        />

        <h3>{`Candlestick (Random ${RANDOM_DATA_SMALL.length} data)`}</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'candlestick',
            candlestickWickWidth: 3,
            data: RANDOM_DATA_SMALL,
          }]}
        />

        <h3>{`Candlestick (Random ${RANDOM_DATA_MEDIUM.length} data)`}</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'candlestick',
            candlestickWidth: 5,
            data: RANDOM_DATA_MEDIUM,
          }]}
        />

        <h3>{`Candlestick (Random ${RANDOM_DATA_LARGE.length} data)`}</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'candlestick',
            candlestickWidth: 2,
            data: RANDOM_DATA_LARGE,
          }]}
        />
      </div>
    )
  }
}

CandlestickTestRender.defaultProps = {
  backgroundColor: 'beige',
  yTickInterval: 10,
  xTickInterval: 100,

  xMin: X_MIN,
  xMax: X_MAX,
  yMin: Y_MIN,
  yMax: Y_MAX,
}

export default CandlestickTestRender
