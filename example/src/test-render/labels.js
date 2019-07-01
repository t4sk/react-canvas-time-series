import React, { Component } from "react"
import { Graphs, canvas } from "react-canvas-time-series"
import moment from "moment"

const WIDTH = 900
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

const Y_TICK_INTERVAL = 1000
const Y_MIN = 1000
const Y_MAX = 10000

function renderXTick(x) {
  return moment(x * 1000).format("HH:mm")
}

function renderYTick(y) {
  return y.toLocaleString()
}

const X_LABEL_WIDTH = 80
const X_LABEL_HEIGHT = 20

const Y_LABEL_WIDTH = 50
const Y_LABEL_HEIGHT = 20

function Labels(props) {
  return (
    <Graphs
      width={WIDTH}
      height={HEIGHT}
      backgroundColor="beige"
      axes={[
        {
          at: "top",
          ...X_AXIS_TOP,
          lineColor: "red",
          xMin: X_MIN,
          xMax: X_MAX,
          tickInterval: 2 * X_TICK_INTERVAL,
          tickLength: 5,
          renderTick: renderXTick,
          textColor: "blue",
        },
        {
          at: "left",
          ...Y_AXIS_LEFT,
          lineColor: "green",
          yMin: Y_MIN,
          yMax: Y_MAX,
          tickInterval: Y_TICK_INTERVAL,
          renderTick: renderYTick,
          textColor: "red",
        },
        {
          at: "right",
          ...Y_AXIS_RIGHT,
          lineColor: "orange",
          yMin: Y_MIN,
          yMax: Y_MAX,
          tickInterval: Y_TICK_INTERVAL,
          renderTick: renderYTick,
        },
        {
          at: "bottom",
          ...X_AXIS_BOTTOM,
          lineColor: "blue",
          xMin: X_MIN,
          xMax: X_MAX,
          tickInterval: X_TICK_INTERVAL,
          renderTick: renderXTick,
        },
      ]}
      graphs={[
        {
          type: "xLines",
          ...GRAPH,
          xMin: X_MIN,
          xMax: X_MAX,
          xInterval: X_TICK_INTERVAL,
          lineColor: "lightgrey",
        },
        {
          type: "yLines",
          ...GRAPH,
          yMin: Y_MIN,
          yMax: Y_MAX,
          yInterval: Y_TICK_INTERVAL,
          lineColor: "lightgrey",
        },
      ]}
      xLabels={[
        {
          drawLabel: true,
          top: GRAPH.top - 10 - X_LABEL_HEIGHT,
          left:
            canvas.math.getCanvasX(
              GRAPH.width,
              GRAPH.left,
              X_MAX,
              X_MIN,
              NOW - 8 * 3600
            ) - Math.round(X_LABEL_WIDTH / 2),
          width: X_LABEL_WIDTH,
          height: X_LABEL_HEIGHT,
          renderText: () => renderXTick(NOW - 8 * 3600),
          color: "white",
          backgroundColor: "black",
          drawLine: true,
          lineTop: GRAPH.top - 10,
          lineBottom: GRAPH.top + GRAPH.height,
          lineColor: "green",
        },
        {
          drawLabel: true,
          top: GRAPH.top + GRAPH.height + 10,
          left:
            canvas.math.getCanvasX(
              GRAPH.width,
              GRAPH.left,
              X_MAX,
              X_MIN,
              NOW - 5 * 3600
            ) - Math.round(X_LABEL_WIDTH / 2),
          width: X_LABEL_WIDTH,
          height: X_LABEL_HEIGHT,
          renderText: () => renderXTick(NOW - 5 * 3600),
          color: "white",
          backgroundColor: "black",
          drawLine: true,
          lineTop: GRAPH.top,
          lineBottom: GRAPH.top + GRAPH.height + 10,
          lineColor: "green",
        },
      ]}
      yLabels={[
        {
          drawLabel: true,
          top:
            canvas.math.getCanvasY(
              GRAPH.height,
              GRAPH.top,
              Y_MAX,
              Y_MIN,
              (Y_MAX + Y_MIN) / 2
            ) - 10,
          left: GRAPH.left - Y_LABEL_WIDTH - 10,
          width: Y_LABEL_WIDTH,
          height: Y_LABEL_HEIGHT,
          renderText: () => renderYTick((Y_MAX + Y_MIN) / 2),
          color: "white",
          backgroundColor: "black",
          drawLine: true,
          lineLeft: GRAPH.left - 10,
          lineRight: GRAPH.left + GRAPH.width,
          lineColor: "orange",
        },
        {
          drawLabel: true,
          top:
            canvas.math.getCanvasY(
              GRAPH.height,
              GRAPH.top,
              Y_MAX,
              Y_MIN,
              (Y_MAX + Y_MIN) / 2 + 1000
            ) - 10,
          left: GRAPH.left + GRAPH.width + 10,
          width: Y_LABEL_WIDTH,
          height: Y_LABEL_HEIGHT,
          renderText: () => renderYTick((Y_MAX + Y_MIN) / 2 + 1000),
          color: "white",
          backgroundColor: "black",
          drawLine: true,
          lineLeft: GRAPH.left,
          lineRight: GRAPH.left + GRAPH.width + 10,
          lineColor: "orange",
        },
      ]}
    />
  )
}

export default Labels
