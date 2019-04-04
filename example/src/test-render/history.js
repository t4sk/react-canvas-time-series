import React, { Component } from "react"
import { History, canvas } from "react-canvas-time-series"
import moment from "moment"
import { getRandomData } from "../util"

const now = moment()

const YEARS = [...Array(10).keys()]
  .map(i =>
    now
      .clone()
      .startOf("year")
      .subtract(i, "year")
      .unix()
  )
  .reverse()

const X_MIN = YEARS[0]
const X_MAX = YEARS[YEARS.length - 1]
const Y_MIN = 0
const Y_MAX = 10000

const DATA = getRandomData(3600 * 24 * 10, X_MIN, X_MAX, Y_MIN, Y_MAX)

const WIDTH = 900
const HEIGHT = 150
const X_AXIS_HEIGHT = 30
const MIN_WINDOW_SIZE = 100
const WINDOW_EDGE_DELTA = 5

class TestRenderHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      window: {
        top: 0,
        left: 100,
        width: 2 * MIN_WINDOW_SIZE,
        height: HEIGHT - X_AXIS_HEIGHT,
      },
      draggingWindow: false,
      // mouse.x when drag start
      dragWindowStartMouseX: undefined,
      // window.left when drag start
      dragWindowStartWindowLeft: undefined,

      draggingLeftEdge: false,
      dragLeftEdgeStartMouseX: undefined,
      dragLeftEdgeStartWindowLeft: undefined,

      draggingRightEdge: false,
      dragRightEdgeStartMouseX: undefined,
      dragRightEdgeStartWindowLeft: undefined,

      mouse: {
        x: undefined,
        y: undefined,
      },
    }
  }

  onMouseMove = (e, mouse) => {
    this.setState(state => {
      // drag left edge
      if (state.draggingLeftEdge) {
        // TODO refactor
        // TODO make sure right - left > MIN_WINDOW_SIZE
        const diff = mouse.x - state.dragLeftEdgeStartMouseX
        const left = state.dragLeftEdgeStartWindowLeft + diff

        return {
          window: {
            ...state.window,
            left,
            width: state.window.width - (left - state.window.left),
          },
          mouse: {
            x: mouse.x,
            y: mouse.y,
          },
        }
      }

      // drag right edge
      if (state.draggingRightEdge) {
        // TODO refactor
        // TODO make sure right - left > MIN_WINDOW_SIZE
        const diff = mouse.x - state.dragRightEdgeStartMouseX
        const right = state.dragRightEdgeStartWindowLeft + diff

        return {
          window: {
            ...state.window,
            width: right - state.window.left,
          },
          mouse: {
            x: mouse.x,
            y: mouse.y,
          },
        }
      }

      if (state.draggingWindow) {
        const diff = mouse.x - state.dragWindowStartMouseX
        const left = state.dragWindowStartWindowLeft + diff

        return {
          mouse: {
            x: mouse.x,
            y: mouse.y,
          },
          window: {
            ...state.window,
            left: Math.max(0, Math.min(left, WIDTH - MIN_WINDOW_SIZE)),
          },
        }
      }

      return {
        mouse: {
          x: mouse.x,
          y: mouse.y,
        },
      }
    })
  }

  onMouseUp = (e, { x, y }) => {
    this.setState(state => ({
      draggingWindow: false,
      dragWindowStartMouseX: undefined,
      dragWindowStartWindowLeft: undefined,
      draggingLeftEdge: false,
      dragLeftEdgeStartMouseX: undefined,
      dragLeftEdgeStartWindowLeft: undefined,
      draggingRightEdge: false,
      dragRightEdgeStartMouseX: undefined,
      dragRightEdgeStartWindowLeft: undefined,
    }))
  }

  onMouseDown = (e, mouse) => {
    if (!canvas.math.isInsideRect(this.state.window, mouse)) {
      return
    }

    // near left edge
    if (Math.abs(mouse.x - this.state.window.left) <= WINDOW_EDGE_DELTA) {
      this.setState(state => ({
        draggingLeftEdge: true,
        dragLeftEdgeStartWindowLeft: state.window.left,
        dragLeftEdgeStartMouseX: mouse.x,
      }))
      return
    }

    // near right edge
    if (
      Math.abs(mouse.x - (this.state.window.left + this.state.window.width)) <=
      WINDOW_EDGE_DELTA
    ) {
      this.setState(state => ({
        draggingRightEdge: true,
        dragRightEdgeStartWindowLeft: state.window.left + state.window.width,
        dragRightEdgeStartMouseX: mouse.x,
      }))
      return
    }

    // inside window
    this.setState(state => ({
      draggingWindow: true,
      dragWindowStartMouseX: mouse.x,
      dragWindowStartWindowLeft: state.window.left,
    }))
  }

  onMouseOut = e => {
    this.setState(state => ({
      draggingWindow: false,
      dragWindowStartMouseX: undefined,
      dragWindowStartWindowLeft: undefined,
      draggingLeftEdge: false,
      dragLeftEdgeStartMouseX: undefined,
      dragLeftEdgeStartWindowLeft: undefined,
      draggingRightEdge: false,
      dragRightEdgeStartMouseX: undefined,
      dragRightEdgeStartWindowLeft: undefined,
      mouse: {
        x: undefined,
        y: undefined,
      },
    }))
  }

  render() {
    return (
      <History
        shouldRedrawGraph={() => false}
        width={WIDTH}
        height={HEIGHT}
        xAxisHeight={X_AXIS_HEIGHT}
        backgroundColor="beige"
        xAxisColor="green"
        ticks={YEARS}
        tickHeight={10}
        renderTick={x => moment.unix(x).format("YYYY")}
        font="16px Arial"
        textColor="red"
        data={DATA}
        lineColor="orange"
        lineWidth={1}
        step={1}
        windowColor="rgba(0, 0, 255, 0.3)"
        window={this.state.window}
        windowEdgeDelta={WINDOW_EDGE_DELTA}
        mouse={this.state.mouse}
        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseOut={this.onMouseOut}
      />
    )
  }
}

export default TestRenderHistory
