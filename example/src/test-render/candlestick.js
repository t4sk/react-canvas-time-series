import React, { Component } from 'react'
import {GraphCanvas} from 'react-canvas-time-series'
import { getRandomCandlestickData } from '../util'

const X_MIN = 0
const X_MAX = 1000
const Y_MIN = 0
const Y_MAX = 100

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

const RANDOM_DATA_SMALL = getRandomCandlestickData(10, X_MIN, X_MAX, Y_MIN, Y_MAX)
const RANDOM_DATA_MEDIUM = getRandomCandlestickData(100, X_MIN, X_MAX, Y_MIN, Y_MAX)
const RANDOM_DATA_LARGE = getRandomCandlestickData(1000, X_MIN, X_MAX, Y_MIN, Y_MAX)

class CandlestickTestRender extends Component {
  render () {
    return (
      <div>
        <h3>Candlestick (Fixed data)</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'candlestick',
            wickWidth: 3,
            data: FIXED_DATA,
          }]}
        />

        <h3>{`Candlestick (Random ${RANDOM_DATA_SMALL.length} data)`}</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'candlestick',
            wickWidth: 3,
            data: RANDOM_DATA_SMALL,
          }]}
        />

        <h3>{`Candlestick (Random ${RANDOM_DATA_MEDIUM.length} data)`}</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'candlestick',
            width: 5,
            data: RANDOM_DATA_MEDIUM,
          }]}
        />

        <h3>{`Candlestick (Random ${RANDOM_DATA_LARGE.length} data)`}</h3>
        <GraphCanvas
          {...this.props}
          graphs={[{
            type: 'candlestick',
            width: 2,
            data: RANDOM_DATA_LARGE,
          }]}
        />
      </div>
    )
  }
}

CandlestickTestRender.defaultProps = {
  background: {
    color: 'beige',
    yTickInterval: 10,
    xTickInterval: 100,
  },
  xMin: X_MIN,
  xMax: X_MAX,
  yMin: Y_MIN,
  yMax: Y_MAX,
}

export default CandlestickTestRender
