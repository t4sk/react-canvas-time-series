import React, { Component } from "react"
import { Graphs, canvas } from "react-canvas-time-series"
import moment from "moment"

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

// graph
const WIDTH = 800
const HEIGHT = 150

// top, bottom, left, right
const PADDING = 10

const X_AXIS = {
  top: HEIGHT - PADDING - 20,
  left: PADDING,
  width: WIDTH - 2 * PADDING,
  height: 20,
}

const GRAPH = {
  top: PADDING,
  left: PADDING,
  width: X_AXIS.width,
  height: HEIGHT - 2 * PADDING - X_AXIS.height,
}

const ZOOM_RATE = 0.1

class Zoom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mouse: {
        x: undefined,
        y: undefined,
      },
      xMin: X_MIN,
      xMax: X_MAX,
    }
  }

  getXRange = (mouse, state) => {
    if (!canvas.math.isInsideRect(GRAPH, mouse) || !state.dragging) {
      return {
        xMin: state.xMin,
        xMax: state.xMax,
      }
    }

    const diff = mouse.x - state.mouse.x

    const xMin = canvas.math.getX(
      GRAPH.width,
      GRAPH.left,
      state.xMax,
      state.xMin,
      GRAPH.left - diff
    )

    const xMax = canvas.math.getX(
      GRAPH.width,
      GRAPH.left,
      state.xMax,
      state.xMin,
      GRAPH.width + GRAPH.left - diff
    )

    return {
      xMin,
      xMax,
    }
  }

  onWheel = (e, mouse) => {
    if (!canvas.math.isInsideRect(GRAPH, mouse)) {
      return
    }

    const { deltaY } = e

    this.setState(state => {
      const { xMin, xMax } = state

      const x = canvas.math.getX(GRAPH.width, GRAPH.left, xMax, xMin, mouse.x)

      if (deltaY > 0) {
        // zoom out
        return {
          xMin: x - (x - xMin) * (1 + ZOOM_RATE),
          xMax: x + (xMax - x) * (1 + ZOOM_RATE),
        }
      } else {
        // zoom in
        return {
          xMin: x - (x - xMin) * (1 - ZOOM_RATE),
          xMax: x + (xMax - x) * (1 - ZOOM_RATE),
        }
      }
    })
  }

  render() {
    const { xMin, xMax, mouse } = this.state

    return (
      <Graphs
        width={WIDTH}
        height={HEIGHT}
        backgroundColor="beige"
        axes={[
          {
            at: "bottom",
            ...X_AXIS,
            lineColor: "blue",
            xMin,
            xMax,
            tickInterval: X_TICK_INTERVAL,
            renderTick: x => moment(x * 1000).format("MM-DD"),
          },
        ]}
        graphs={[
          {
            type: "xLines",
            ...GRAPH,
            xMin,
            xMax,
            xInterval: X_TICK_INTERVAL,
          },
        ]}
        crosshair={{
          ...GRAPH,
          canvasX: mouse.x,
          canvasY: mouse.y,
        }}
        onWheel={this.onWheel}
      />
    )
  }
}

export default Zoom
