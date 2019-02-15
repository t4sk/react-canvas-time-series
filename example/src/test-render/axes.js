import React, { Component } from 'react'
import { Graphs, canvas } from 'react-canvas-time-series'

const X_MIN = 10
const X_MAX = 110
const Y_MIN = 1000
const Y_MAX = 10000
const X_TICKS = [20, 30, 40, 50, 60, 70, 80, 90, 100]

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
          xMin: X_MIN,
          xMax: X_MAX,
          ticks: X_TICKS,
          tickLength: 5,
          renderTick: x => x,
          textColor: 'blue',
          labels: [{
            x: (X_MIN + X_MAX) / 2,
            color: 'white',
            backgroundColor: 'red',
            render: x => 'top',
          }],
        }, {
          at: 'left',
          top: 60,
          left: 10,
          width: 50,
          height: 380,
          lineColor: 'green',
          yMin: Y_MIN,
          yMax: Y_MAX,
          tickInterval: 1000,
          labels: [{
            y: (Y_MIN + Y_MAX) / 2,
            color: 'white',
            backgroundColor: 'green',
            render: y => 'left'
          }],
        }, {
          at: 'right',
          top: 60,
          left: 840,
          width: 50,
          height: 380,
          lineColor: 'orange',
          yMin: Y_MIN,
          yMax: Y_MAX,
          tickInterval: 1000,
          labels: [{
            y: (Y_MIN + Y_MAX) / 2,
            color: 'white',
            backgroundColor: 'orange',
            render: y => 'right'
          }],
        }, {
          at: 'bottom',
          top: 440,
          left: 10,
          width: 880,
          height: 50,
          lineColor: 'blue',
          xMin: X_MIN,
          xMax: X_MAX,
          ticks: X_TICKS,
          tickInterval: 5,
          labels: [{
            x: (X_MIN + X_MAX) / 2,
            color: 'white',
            backgroundColor: 'blue',
            render: x => 'bottom',
          }],
        }]}
      />
    )
  }
}

export default Axes
