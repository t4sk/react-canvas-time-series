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

const Y_MIN = 0
const Y_MAX = 10000

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

class BarTestRender extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dragging: false,
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

  onMouseMove = (e, mouse) => {
    this.setState(state => {
      const { xMin, xMax } = this.getXRange(mouse, state)

      return {
        mouse: {
          x: mouse.x,
          y: mouse.y,
        },
        xMin,
        xMax,
      }
    })
  }

  onMouseDown = (e, mouse) => {
    if (canvas.math.isInsideRect(GRAPH, mouse)) {
      this.setState(state => ({
        dragging: true,
      }))
    }
  }

  onMouseUp = (e, mouse) => {
    this.setState(state => ({
      dragging: false,
    }))
  }

  onMouseOut = () => {
    this.setState(state => ({
      dragging: false,
      mouse: {
        x: undefined,
        y: undefined,
      },
    }))
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
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseOut}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
      />
    )
  }
}

export default BarTestRender
