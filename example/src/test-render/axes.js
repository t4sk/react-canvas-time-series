import React, { Component } from 'react'
import { Graphs, canvas } from 'react-canvas-time-series'

const X_MIN = 10
const X_MAX = 110
const TICKS = [20, 30, 40, 50, 60, 70, 80, 90, 100]

class Axes extends Component {
  render() {
    return (
      <Graphs
        width={900}
        height={500}
        backgroundColor="beige"
        axes={[{
          at: 'top',
          top: 10,
          left: 10,
          width: 880,
          height: 50,
          lineColor: 'red',
          lineWidth: 3,
          xMin: X_MIN,
          xMax: X_MAX,
          ticks: TICKS,
        }, {
          at: 'bottom',
          top: 450,
          left: 10,
          width: 880,
          height: 50,
          lineColor: 'blue',
          lineWidth: 1,
          xMin: X_MIN,
          xMax: X_MAX,
          ticks: TICKS,
        }]}
      />
    )
  }
}

export default Axes
