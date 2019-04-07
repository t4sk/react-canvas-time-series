import React, { Component } from "react"
import { Graphs } from "react-canvas-time-series"

const X_MIN = 10
const X_MAX = 110
const Y_MIN = 1000
const Y_MAX = 10000
const X_TICKS = [20, 30, 40, 50, 60, 70, 80, 90, 100]

class AxesAndLabels extends Component {
  render() {
    return (
      <Graphs
        width={900}
        height={500}
        backgroundColor="beige"
        axes={[
          {
            at: "top",
            top: 10,
            left: 10,
            width: 880,
            height: 50,
            lineColor: "red",
            xMin: X_MIN,
            xMax: X_MAX,
            ticks: X_TICKS,
            tickLength: 5,
            renderTick: x => x,
            textColor: "blue",
          },
          {
            at: "left",
            top: 60,
            left: 10,
            width: 50,
            height: 380,
            lineColor: "green",
            yMin: Y_MIN,
            yMax: Y_MAX,
            tickInterval: 1000,
          },
          {
            at: "right",
            top: 60,
            left: 840,
            width: 50,
            height: 380,
            lineColor: "orange",
            yMin: Y_MIN,
            yMax: Y_MAX,
            tickInterval: 1000,
          },
          {
            at: "bottom",
            top: 440,
            left: 10,
            width: 880,
            height: 50,
            lineColor: "blue",
            xMin: X_MIN,
            xMax: X_MAX,
            ticks: X_TICKS,
            tickInterval: 5,
          },
        ]}
        graphs={[
          {
            type: "xLines",
            top: 60,
            left: 10,
            height: 380,
            width: 880,
            xMin: X_MIN,
            xMax: X_MAX,
            xInterval: 5,
            data: X_TICKS,
            lineColor: "lightgrey",
          },
          {
            type: "yLines",
            top: 60,
            left: 60,
            height: 380,
            width: 780,
            yMin: Y_MIN,
            yMax: Y_MAX,
            yInterval: 1000,
            lineColor: "lightgrey",
          },
        ]}
      />
    )
  }
}

export default AxesAndLabels
