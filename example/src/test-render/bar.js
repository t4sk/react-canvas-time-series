import React, { Component } from "react"
import { Graphs, canvas } from "react-canvas-time-series"
import moment from "moment"
import { fetch } from "../util"

// data
const now = moment()
const days = [...Array(10).keys()]
  .map(i =>
    now
      .clone()
      .startOf("day")
      .subtract(i, "day")
      .unix()
  )
  .reverse()

const Y_MIN = 0
const Y_MAX = 10000

let cache = {
  xMin: undefined,
  xMax: undefined,
  data: {},
}

// graph
const WIDTH = 800
const HEIGHT = 250

// top, bottom, left, right
const PADDING = 10

const X_AXIS_HEIGHT = 50
const Y_AXIS_WIDTH = 50

const X_AXIS = {
  top: HEIGHT - PADDING - X_AXIS_HEIGHT,
  left: PADDING,
  width: WIDTH - Y_AXIS_WIDTH - 2 * PADDING,
  height: HEIGHT - X_AXIS_HEIGHT - 2 * PADDING,
}

const Y_AXIS = {
  top: PADDING,
  left: WIDTH - PADDING - Y_AXIS_WIDTH,
  width: Y_AXIS_WIDTH,
  height: HEIGHT - X_AXIS_HEIGHT - 2 * PADDING,
}

const GRAPH = {
  top: PADDING,
  left: PADDING,
  width: X_AXIS.width,
  height: Y_AXIS.height,
}

const ZOOM_RATE = 0.1

class BarTestRender extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dragging: false,
      dragStartCanvasX: undefined,
      dragStartXMin: undefined,
      dragStartXMax: undefined,
      mouse: {
        x: undefined,
        y: undefined,
      },
      nearest: {
        x: undefined,
        y: undefined,
      },
      labelX: undefined,
      labelY: undefined,
      xMin: days[0],
      xMax: days[days.length - 1],
      xTicks: days,
      yMin: Y_MIN,
      yMax: Y_MAX,
      fetching: false,
      data: [],
    }
  }

  componentDidMount() {
    this.fetch({
      xMin: this.state.xMin,
      xMax: this.state.xMax,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.xMin != this.state.xMin ||
      prevState.xMax != this.state.xMax
    ) {
      this.fetch({
        xMin: this.state.xMin,
        xMax: this.state.xMax,
      })
    }
  }

  fetch = async ({ xMin, xMax }) => {
    this.setState(state => ({
      fetching: true,
    }))

    const data = await fetch(
      cache,
      {
        xMin,
        xMax,
      },
      {
        ms: 1000,
        xStep: 3600 * 3,
        yMin: Y_MIN,
        yMax: Y_MAX,
      }
    )

    this.setState(state => ({
      fetching: false,
      data,
    }))
  }

  getXRange = (mouse, state) => {
    if (!canvas.math.isInsideRect(GRAPH, mouse) || !state.dragging) {
      return {
        xMin: state.xMin,
        xMax: state.xMax,
      }
    }

    const { dragStartCanvasX, dragStartXMin, dragStartXMax } = state

    const diff = mouse.x - dragStartCanvasX

    const xMin = canvas.math.getX(
      GRAPH.width,
      GRAPH.left,
      dragStartXMax,
      dragStartXMin,
      GRAPH.left - diff
    )

    const xMax = canvas.math.getX(
      GRAPH.width,
      GRAPH.left,
      dragStartXMax,
      dragStartXMin,
      GRAPH.width + GRAPH.left - diff
    )

    return {
      xMin,
      xMax,
    }
  }

  onMouseMove = (e, mouse) => {
    this.setState(state => {
      let labelX
      let labelY
      let nearest = {
        x: undefined,
        y: undefined,
      }

      const { xMin, xMax } = this.getXRange(mouse, state)

      if (canvas.math.isInsideRect(GRAPH, mouse)) {
        const { yMin, yMax } = state

        labelX = canvas.math.getX(GRAPH.width, GRAPH.left, xMax, xMin, mouse.x)
        labelY = canvas.math.getY(GRAPH.height, GRAPH.top, yMax, yMin, mouse.y)

        // find nearest data to mouse.x
        const x = canvas.math.getX(GRAPH.width, GRAPH.left, xMax, xMin, mouse.x)
        const i = canvas.math.findNearestIndex(
          state.data.map(d => d.x).filter(x => x >= xMin && x <= xMax),
          x
        )

        nearest.x = state.data[i] ? state.data[i].x : undefined
        nearest.y = state.data[i] ? state.data[i].y : undefined
      }

      return {
        mouse: {
          x: mouse.x,
          y: mouse.y,
        },
        xMin,
        xMax,
        labelX,
        labelY,
        nearest,
      }
    })
  }

  onMouseDown = (e, mouse) => {
    if (canvas.math.isInsideRect(GRAPH, mouse)) {
      const { xMin, xMax } = this.state

      this.setState(state => ({
        dragging: true,
        dragStartCanvasX: mouse.x,
        dragStartXMin: xMin,
        dragStartXMax: xMax,
      }))
    }
  }

  onMouseUp = (e, mouse) => {
    this.setState(state => ({
      dragging: false,
      dragStartCanvasX: undefined,
      dragStartXMin: undefined,
      dragStartXMax: undefined,
    }))
  }

  onMouseOut = () => {
    this.setState(state => ({
      dragging: false,
      dragStartCanvasX: undefined,
      dragStartXMin: undefined,
      dragStartXMax: undefined,
      mouse: {
        x: undefined,
        y: undefined,
      },
      labelX: undefined,
      labelY: undefined,
      nearest: {
        x: undefined,
        y: undefined,
      },
    }))
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
    const { xMin, xMax, yMin, yMax, mouse, nearest } = this.state

    return (
      <Graphs
        width={WIDTH}
        height={HEIGHT}
        backgroundColor={this.state.fetching ? "#f2f2f2" : "beige"}
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
            tickInterval: 3600 * 24,
            ticks: this.state.xTicks,
            renderTick: x => moment(x * 1000).format("MM-DD"),
          },
          {
            at: "right",
            top: Y_AXIS.top,
            left: Y_AXIS.left,
            width: Y_AXIS.width,
            height: Y_AXIS.height,
            lineColor: "blue",
            yMin,
            yMax,
            tickInterval: 2000,
            renderTick: y => y,
            // TODO move to labels: [{...}]
            labels: [
              {
                y: this.state.labelY,
                color: "white",
                backgroundColor: "black",
                render: y => Math.round(y),
              },
            ],
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
            data: this.state.xTicks,
            xInterval: 3600 * 24,
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
            yInterval: 2000,
            lineColor: "lightgrey",
          },
          {
            type: "bars",
            top: GRAPH.top,
            left: GRAPH.left,
            height: GRAPH.height,
            width: GRAPH.width,
            xMin,
            xMax,
            yMin,
            yMax,
            barWidth: 10,
            getBarColor: () => "orange",
            data: this.state.data,
          },
        ]}
        crosshair={{
          top: GRAPH.top,
          left: GRAPH.left,
          height: GRAPH.height,
          width: GRAPH.width,
          canvasX: nearest.x
            ? canvas.math.getCanvasX(
                GRAPH.width,
                GRAPH.left,
                xMax,
                xMin,
                nearest.x
              )
            : mouse.x,
          canvasY: mouse.y,
          yLineColor: "orange",
          yLineWidth: 0.5,
          xLineColor: "rgba(255, 140, 0, 0.5)",
          xLineWidth: 1,
        }}
        frames={[
          {
            text: nearest.x
              ? moment(nearest.x * 1000).format("MM-DD HH:mm")
              : "",
            color: "black",
            left: 10,
            top: 10,
          },
          {
            text: nearest.y ? nearest.y.toFixed() : "",
            color: "orange",
            left: 10,
            top: 10 + 15,
          },
        ]}
        xLabels={[
          {
            drawXline: !!this.state.labelX,
            top: X_AXIS.top + 10,
            left:
              canvas.math.getCanvasX(
                GRAPH.width,
                GRAPH.left,
                xMax,
                xMin,
                nearest.x
              ) - 40,
            width: 80,
            text: moment(this.state.labelX * 1000).format("MM-DD HH:mm"),
            color: "white",
            backgroundColor: "black",
            drawLine: false,
          },
        ]}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseOut}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onWheel={this.onWheel}
      />
    )
  }
}

export default BarTestRender
