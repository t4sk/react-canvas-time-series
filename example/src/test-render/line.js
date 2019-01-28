import React, { Component } from 'react'
import { Graphs, canvas } from 'react-canvas-time-series'
import moment from 'moment'
import { getRandomData } from '../util'

const now = moment()

const DAYS = [
  ...Array(10).keys()
]
.map(i => now.clone().startOf("day").subtract(i, "day").unix())
.reverse()

const X_MIN = DAYS[0]
const X_MAX = DAYS[DAYS.length - 1]
const X_TICKS = DAYS.slice(1, -1)
const Y_MIN = 0
const Y_MAX = 5000
const Y_TICKS = [0, 1000, 2000, 3000, 4000, 5000]

const DATA = [
  [{
    x: X_MIN,
    y: Y_MIN,
  }, {
    x: X_MAX,
    y: Y_MAX,
  }],
  getRandomData(10000, X_MIN, X_MAX, Y_MIN, Y_MAX),
]

const WIDTH = 800
const HEIGHT = 500

class LineTestRender extends Component {
  render () {
    return (
      <Graphs
        width={WIDTH}
        height={HEIGHT}
        backgroundColor="beige"
        axes={[{
          at: 'bottom',
          top: 440,
          left: 10,
          width: 740,
          height: 50,
          lineColor: 'blue',
          xMin: X_MIN,
          xMax: X_MAX,
          ticks: X_TICKS,
          renderTick: x => moment(x * 1000).format("MM-DD")
        }, {
          at: 'right',
          top: 10,
          left: 740,
          width: 50,
          height: 200,
          lineColor: 'blue',
          yMin: Y_MIN,
          yMax: Y_MAX,
          ticks: Y_TICKS,
          renderTick: x => x,
        }, {
          at: 'right',
          top: 230,
          left: 740,
          width: 50,
          height: 200,
          lineColor: 'blue',
          yMin: Y_MIN,
          yMax: Y_MAX,
          ticks: Y_TICKS,
          renderTick: x => x,
        }]}
        graphs={[{
          type: 'xLine',
          top: 10,
          left: 10,
          height: 200,
          width: 730,
          xMin: X_MIN,
          xMax: X_MAX,
          data: X_TICKS,
          lineColor: 'lightgrey',
        }, {
          type: 'yLine',
          top: 10,
          left: 10,
          height: 200,
          width: 730,
          yMin: Y_MIN,
          yMax: Y_MAX,
          data: Y_TICKS,
          lineColor: 'lightgrey',
        }, {
          type: 'line',
          top: 10,
          left: 10,
          height: 200,
          width: 730,
          xMin: X_MIN,
          xMax: X_MAX,
          yMin: Y_MIN,
          yMax: Y_MAX,
          data: DATA[1],
          lineColor: 'green',
          step: 100,
        }, {
          type: 'line',
          top: 10,
          left: 10,
          height: 200,
          width: 730,
          xMin: X_MIN,
          xMax: X_MAX,
          yMin: Y_MIN,
          yMax: Y_MAX,
          data: DATA[0],
          lineColor: 'blue'
        }, {
          type: 'xLine',
          top: 230,
          left: 10,
          height: 200,
          width: 730,
          xMin: X_MIN,
          xMax: X_MAX,
          data: X_TICKS,
          lineColor: 'lightgrey',
        }, {
          type: 'yLine',
          top: 230,
          left: 10,
          height: 200,
          width: 730,
          yMin: Y_MIN,
          yMax: Y_MAX,
          data: Y_TICKS,
          lineColor: 'lightgrey',
        }]}
      />
    )
  }
}

LineTestRender.defaultProps = {
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

export default LineTestRender
