import React from "react"
import Graph from "../components/Graph"
import moment from "moment"

const WIDTH = 900
const HEIGHT = 500

const NOW = Math.round(Date.now() / 1000)

const X_TICK_INTERVAL = 3600
const X_MIN = NOW - 10 * X_TICK_INTERVAL
const X_MAX = NOW

const Y_TICK_INTERVAL = 1000
const Y_MIN = 1000
const Y_MAX = 10000

function renderXTick(x?: number): string {
  if (!x) {
    return ""
  }
  return moment(x * 1000).format("HH:mm")
}

function renderYTick(y?: number): string {
  if (!y) {
    return ""
  }
  return y.toLocaleString()
}

const X_LABEL_WIDTH = 80
const X_LABEL_HEIGHT = 20

const Y_LABEL_WIDTH = 50
const Y_LABEL_HEIGHT = 20

function Labels() {
  return (
    <Graph
      width={WIDTH}
      height={HEIGHT}
      padding={10}
      backgroundColor="beige"
      xMin={X_MIN}
      xMax={X_MAX}
      yMin={Y_MIN}
      yMax={Y_MAX}
      xAxisAt="top"
      xTickInterval={X_TICK_INTERVAL}
      renderXTick={renderXTick}
      yAxisAt="right"
      yTickInterval={Y_TICK_INTERVAL}
      yTickLength={10}
      xLabels={[
        {
          x: (X_MIN + X_MAX) / 2,
          width: X_LABEL_WIDTH,
          height: X_LABEL_HEIGHT,
          render: renderXTick,
          color: "white",
          backgroundColor: "black",
          drawLine: true,
          lineColor: "green",
        },
        {
          x: X_MIN,
          width: X_LABEL_WIDTH,
          height: X_LABEL_HEIGHT,
          render: renderXTick,
          color: "white",
          backgroundColor: "black",
          drawLine: true,
          lineColor: "green",
        },
      ]}
      yLabels={[
        {
          y: (Y_MIN + Y_MAX) / 2,
          width: Y_LABEL_WIDTH,
          height: Y_LABEL_HEIGHT,
          render: renderYTick,
          color: "white",
          backgroundColor: "black",
          drawLine: true,
          lineColor: "orange",
        },
        {
          y: Y_MIN,
          width: Y_LABEL_WIDTH,
          height: Y_LABEL_HEIGHT,
          render: renderYTick,
          color: "white",
          backgroundColor: "black",
          drawLine: true,
          lineColor: "orange",
        },
      ]}
    />
  )
}

export default Labels
