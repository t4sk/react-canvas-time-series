import React, { Component } from "react"
import { Graphs, canvas } from "react-canvas-time-series"

// fake data
const X_MIN = 0
const X_MAX = 50
const Y_MIN = 0
const Y_MAX = 1000

const DATA = [
  [...new Array(X_MAX)].map((_, i) => ({
    x: i,
    y: Math.random() * Y_MAX + Y_MIN,
  })),

  [...new Array(X_MAX)].map((_, i) => ({
    x: i,
    y: Math.random() * Y_MAX + Y_MIN,
  })),
]

const COLORS = ["rgba(0, 255, 0, 0.3)", "rgba(255, 0, 0, 0.3)"]

// dimensions
const WIDTH = 900
const HEIGHT = 300
const PADDING = 10

const X_AXIS_HEIGHT = 20
const Y_AXIS_WIDTH = 50
const X_AXIS_WIDTH = WIDTH - 2 * PADDING - Y_AXIS_WIDTH
const Y_AXIS_HEIGHT = HEIGHT - 2 * PADDING - X_AXIS_HEIGHT

const X_AXIS = {
  top: PADDING + Y_AXIS_HEIGHT,
  left: PADDING + Y_AXIS_WIDTH,
  width: X_AXIS_WIDTH,
  height: X_AXIS_HEIGHT,
}

const Y_AXIS = {
  top: PADDING,
  left: PADDING,
  width: Y_AXIS_WIDTH,
  height: Y_AXIS_HEIGHT,
}

const GRAPH = {
  top: PADDING,
  left: PADDING + Y_AXIS_WIDTH,
  width: X_AXIS_WIDTH,
  height: Y_AXIS_HEIGHT,
}

function Bars(props) {
  return (
    <Graphs
      width={WIDTH}
      height={HEIGHT}
      backgroundColor="beige"
      animate={false}
      axes={[
        {
          at: "bottom",
          top: X_AXIS.top,
          left: X_AXIS.left,
          width: X_AXIS.width,
          height: X_AXIS.height,
          lineColor: "blue",
          xMin: X_MIN,
          xMax: X_MAX,
          tickInterval: 10,
          renderTick: x => x,
        },
        {
          at: "left",
          top: Y_AXIS.top,
          left: Y_AXIS.left,
          width: Y_AXIS.width,
          height: Y_AXIS.height,
          lineColor: "blue",
          yMin: Y_MIN,
          yMax: Y_MAX,
          tickInterval: 100,
          renderTick: x => x,
        },
      ]}
      graphs={[
        {
          type: "xLines",
          top: GRAPH.top,
          left: GRAPH.left,
          height: GRAPH.height,
          width: GRAPH.width,
          xMin: X_MIN,
          xMax: X_MAX,
          xInterval: 10,
          lineColor: "lightgrey",
        },
        {
          type: "yLines",
          top: GRAPH.top,
          left: GRAPH.left,
          height: GRAPH.height,
          width: GRAPH.width,
          yMin: Y_MIN,
          yMax: Y_MAX,
          yInterval: 100,
          lineColor: "lightgrey",
        },
        ...DATA.map((data, i) => ({
          type: "bars",
          top: GRAPH.top,
          left: GRAPH.left,
          height: GRAPH.height,
          width: GRAPH.width,
          xMin: X_MIN,
          xMax: X_MAX,
          yMin: Y_MIN,
          yMax: Y_MAX,
          data,
          getBarColor: () => COLORS[i],
          barWidth: 10,
        })),
      ]}
    />
  )
}

export default Bars
