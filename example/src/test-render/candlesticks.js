import React, { Component } from "react"
import { Graphs, canvas } from "react-canvas-time-series"
import moment from "moment"
import { getRandomCandlestickData } from "../util"

const NOW = moment()
const DAYS = [...Array(10).keys()]
  .map(i =>
    NOW.clone()
      .startOf("day")
      .subtract(i, "day")
      .unix()
  )
  .reverse()

const X_MIN = DAYS[0]
const X_MAX = DAYS[DAYS.length - 1]
const X_TICK_INTERVAL = 24 * 3600

const Y_MIN = 0
const Y_MAX = 1000
const Y_TICK_INTERVAL = 100

const DATA = getRandomCandlestickData(3600, X_MIN, X_MAX, Y_MIN, Y_MAX, 0)

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

function Candlesticks(props) {
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
          tickInterval: X_TICK_INTERVAL,
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
          tickInterval: Y_TICK_INTERVAL,
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
          xInterval: X_TICK_INTERVAL,
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
          yInterval: Y_TICK_INTERVAL,
          lineColor: "lightgrey",
        },
        {
          type: "candlesticks",
          top: GRAPH.top,
          left: GRAPH.left,
          height: GRAPH.height,
          width: GRAPH.width,
          xMin: X_MIN,
          xMax: X_MAX,
          yMin: Y_MIN,
          yMax: Y_MAX,
          data: DATA,
          step: 4,
          getColor: d => (d.open >= d.close ? "green" : "red"),
          candlestickWidth: 5,
        },
      ]}
    />
  )
}

export default Candlesticks
