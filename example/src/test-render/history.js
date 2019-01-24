import React, { Component } from 'react'
import { History } from 'react-canvas-time-series'
import moment from 'moment'
import { getRandomData } from '../util'

const now = moment()

const YEARS = [
  ...Array(10).keys()
]
.map(i => now.clone().startOf("year").subtract(i, "year").unix())
.reverse()

const X_MIN = YEARS[0]
const X_MAX = YEARS[YEARS.length - 1]
const Y_MIN = 0
const Y_MAX = 10000

const DATA = getRandomData(3650, X_MIN, X_MAX, Y_MIN, Y_MAX)
// .map(({x, y}, i) => {
//   return {
//     x,
//     y: i
//   }
// })

class TestRenderHistory extends Component {
  render() {
    return (
      <History
        backgroundColor="beige"
        xAxisColor="green"
        ticks={YEARS}
        tickHeight={10}
        renderTick={x => moment.unix(x).format("YYYY")}
        font="16px Arial"
        textColor="red"

        data={DATA}
        lineColor="orange"
        lineWidth={1}
        step={1}
      />
    )
  }
}

export default TestRenderHistory
