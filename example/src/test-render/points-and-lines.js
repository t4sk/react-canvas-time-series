import React, { Component } from "react"
import { Graphs, canvas } from "react-canvas-time-series"

// simulate data fetching
function timeout(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

// fake data
const X_MIN = 0
const X_MAX = 50
const Y_MIN = 0
const Y_MAX = 1000

const LINES = [
  [...new Array(X_MAX)].map((_, i) => ({
    x: i,
    y: Math.random() * Y_MAX + Y_MIN,
  })),

  [...new Array(X_MAX)].map((_, i) => ({
    x: i,
    y: Math.random() * Y_MAX + Y_MIN,
  })),
]

const LINE_COLORS = ["green", "red"]

const POINTS = [
  [...new Array(X_MAX)].map((_, i) => ({
    x: i,
    y: Math.random() * Y_MAX + Y_MIN,
  })),

  [...new Array(X_MAX)].map((_, i) => ({
    x: i,
    y: Math.random() * Y_MAX + Y_MIN,
  })),
]

const POINT_COLORS = ["orange", "purple"]

// dimensions
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 300
const CANVAS_PADDING = 10

const X_AXIS_HEIGHT = 20
const Y_AXIS_WIDTH = 50
const X_AXIS_WIDTH = CANVAS_WIDTH - 2 * CANVAS_PADDING - Y_AXIS_WIDTH
const Y_AXIS_HEIGHT = CANVAS_HEIGHT - 2 * CANVAS_PADDING - X_AXIS_HEIGHT

const X_AXIS = {
  top: CANVAS_PADDING + Y_AXIS_HEIGHT,
  left: CANVAS_PADDING + Y_AXIS_WIDTH,
  width: X_AXIS_WIDTH,
  height: X_AXIS_HEIGHT,
}

const Y_AXIS = {
  top: CANVAS_PADDING,
  left: CANVAS_PADDING,
  width: Y_AXIS_WIDTH,
  height: Y_AXIS_HEIGHT,
}

const GRAPH = {
  top: CANVAS_PADDING,
  left: CANVAS_PADDING + Y_AXIS_WIDTH,
  width: X_AXIS_WIDTH,
  height: Y_AXIS_HEIGHT,
}

function Legend(props) {
  const { color, text } = props

  return (
    <div
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <div
        style={{ width: 10, height: 10, backgroundColor: color, margin: 5 }}
      />
      <div>{text}</div>
    </div>
  )
}

class PointsAndLines extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fetching: false,
      lines: [],
      points: [],
      xMin: 0,
      xMax: 0,
      yMin: 0,
      yMax: 0,
    }
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = async () => {
    this.setState(state => ({ fetching: true }))

    // simulate data fetching
    await timeout(1000)

    const xMin = X_MIN
    const xMax = X_MAX
    const yMin = Y_MIN
    const yMax = Math.max(
      ...LINES[0].map(d => d.y),
      ...LINES[1].map(d => d.y),
      ...POINTS[0].map(d => d.y),
      ...POINTS[1].map(d => d.y),
      Y_MAX
    )

    this.setState(state => ({
      fetching: false,
      lines: LINES,
      points: POINTS,
      xMin,
      xMax,
      yMin,
      yMax,
    }))
  }

  render() {
    const { fetching, xMin, xMax, yMin, yMax } = this.state

    return (
      <div>
        <div>{fetching && "Fetching data..."}</div>
        <Graphs
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          backgroundColor={fetching ? "lightgrey" : "beige"}
          animate={false}
          axes={[
            {
              at: "bottom",
              top: X_AXIS.top,
              left: X_AXIS.left,
              width: X_AXIS.width,
              height: X_AXIS.height,
              lineColor: "blue",
              xMin,
              xMax,
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
              yMin,
              yMax,
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
              xMin,
              xMax,
              xInterval: 10,
              lineColor: "lightgrey",
            },
            {
              type: "yLines",
              top: GRAPH.top,
              left: GRAPH.left,
              height: GRAPH.height,
              width: GRAPH.width,
              yMin,
              yMax,
              yInterval: 100,
              lineColor: "lightgrey",
            },
            {
              type: "line",
              top: GRAPH.top,
              left: GRAPH.left,
              height: GRAPH.height,
              width: GRAPH.width,
              xMin,
              xMax,
              yMin,
              yMax,
              data: this.state.lines[0] || [],
              lineColor: LINE_COLORS[0],
            },
            {
              type: "line",
              top: GRAPH.top,
              left: GRAPH.left,
              height: GRAPH.height,
              width: GRAPH.width,
              xMin,
              xMax,
              yMin,
              yMax,
              data: this.state.lines[1] || [],
              lineColor: LINE_COLORS[1],
            },
            {
              type: "points",
              top: GRAPH.top,
              left: GRAPH.left,
              height: GRAPH.height,
              width: GRAPH.width,
              xMin,
              xMax,
              yMin,
              yMax,
              data: this.state.points[0] || [],
              color: POINT_COLORS[0],
            },
            {
              type: "points",
              top: GRAPH.top,
              left: GRAPH.left,
              height: GRAPH.height,
              width: GRAPH.width,
              xMin,
              xMax,
              yMin,
              yMax,
              data: this.state.points[1] || [],
              color: POINT_COLORS[1],
            },
          ]}
        />

        <div style={{ display: "flex", flexDirection: "row" }}>
          <Legend color={LINE_COLORS[0]} text="Line 1" />
          <Legend color={LINE_COLORS[1]} text="Line 2" />
          <Legend color={POINT_COLORS[0]} text="Point 1" />
          <Legend color={POINT_COLORS[1]} text="Point 2" />
        </div>
      </div>
    )
  }
}

export default PointsAndLines
