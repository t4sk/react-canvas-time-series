import React from "react"
import { Graph, canvas } from "react-canvas-time-series"
import moment from "moment"

const WIDTH = 800
const HEIGHT = 500
const PADDING = 10
const X_AXIS_TOP_HEIGHT = 50
const X_AXIS_BOTTOM_HEIGHT = 50
const Y_AXIS_LEFT_WIDTH = 50
const Y_AXIS_RIGHT_WIDTH = 50

const X_AXIS_TOP = {
  top: PADDING,
  left: PADDING + Y_AXIS_LEFT_WIDTH,
  width: WIDTH - 2 * PADDING - (Y_AXIS_LEFT_WIDTH + Y_AXIS_RIGHT_WIDTH),
  height: X_AXIS_TOP_HEIGHT,
}

const X_AXIS_BOTTOM = {
  top: HEIGHT - PADDING - X_AXIS_BOTTOM_HEIGHT,
  left: PADDING + Y_AXIS_LEFT_WIDTH,
  width: WIDTH - 2 * PADDING - (Y_AXIS_LEFT_WIDTH + Y_AXIS_RIGHT_WIDTH),
  height: X_AXIS_BOTTOM_HEIGHT,
}

const Y_AXIS_LEFT = {
  top: PADDING + X_AXIS_TOP_HEIGHT,
  left: PADDING,
  width: Y_AXIS_LEFT_WIDTH,
  height: HEIGHT - 2 * PADDING - (X_AXIS_TOP_HEIGHT + X_AXIS_BOTTOM_HEIGHT),
}

const Y_AXIS_RIGHT = {
  top: PADDING + X_AXIS_TOP_HEIGHT,
  left: WIDTH - PADDING - Y_AXIS_RIGHT_WIDTH,
  width: Y_AXIS_RIGHT_WIDTH,
  height: HEIGHT - 2 * PADDING - (X_AXIS_TOP_HEIGHT + X_AXIS_BOTTOM_HEIGHT),
}

const GRAPH = {
  top: PADDING + X_AXIS_TOP_HEIGHT,
  left: PADDING + Y_AXIS_LEFT_WIDTH,
  width: WIDTH - 2 * PADDING - (Y_AXIS_LEFT_WIDTH + Y_AXIS_RIGHT_WIDTH),
  height: HEIGHT - 2 * PADDING - (X_AXIS_TOP_HEIGHT + X_AXIS_BOTTOM_HEIGHT),
}

const NOW = Math.round(Date.now() / 1000)

const X_TICK_INTERVAL = 3600
const X_MIN = NOW - 10 * X_TICK_INTERVAL
const X_MAX = NOW
const X_TICKS = [NOW, NOW - X_TICK_INTERVAL]

const Y_TICK_INTERVAL = 1000
const Y_MIN = 1000
const Y_MAX = 10000
const Y_TICKS = [Y_MIN + 1500]

function renderXTick(x) {
  return moment(x * 1000).format("HH:mm")
}

function renderYTick(y) {
  return y.toLocaleString()
}

function Axes(props) {
  return (
    <Graph
      width={WIDTH}
      height={HEIGHT}
      backgroundColor="beige"
      xMin={X_MIN}
      xMax={X_MAX}
      yMin={Y_MIN}
      yMax={Y_MAX}
      xAxisAt="top"
      xAxisHeight={30}
      xAxisLineColor="red"
      xTicks={X_TICKS}
      showXLine={true}
      xLineColor="lightgrey"
      xTickInterval={X_TICK_INTERVAL}
      xTickLength={5}
      renderXTick={renderXTick}
      xAxisTextColor="blue"
      yAxisAt="left"
      yAxisWidth={50}
      yAxisLineColor="green"
      yTicks={Y_TICKS}
      yTickInterval={Y_TICK_INTERVAL}
      yTickLength={10}
      renderYTick={renderYTick}
      yAxisTextColor="red"
      yLineColor="lightgrey"
    />
  )
}

export default Axes
