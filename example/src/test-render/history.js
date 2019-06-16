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
const HEIGHT = 100
const X_AXIS_HEIGHT = 30
const MIN_MASK_SIZE = 100
const MASK_EDGE_DELTA = 5

class TestRenderHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mask: {
        top: 0,
        left: 100,
        width: 2 * MIN_MASK_SIZE,
        height: HEIGHT - X_AXIS_HEIGHT,
      },
      draggingMask: false,
      draggingLeftEdge: false,
      draggingRightEdge: false,

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
        const diff = mouse.x - state.mouse.x
        const left = state.mask.left + diff

        return {
          mask: {
            ...state.mask,
            left: Math.min(
              left,
              state.mask.left + state.mask.width - MIN_MASK_SIZE
            ),
            width: Math.max(state.mask.width - diff, MIN_MASK_SIZE),
          },
          mouse: {
            x: mouse.x,
            y: mouse.y,
          },
        }
      }

      // drag right edge
      if (state.draggingRightEdge) {
        const diff = mouse.x - state.mouse.x

        return {
          mask: {
            ...state.mask,
            width: Math.max(state.mask.width + diff, MIN_MASK_SIZE),
          },
          mouse: {
            x: mouse.x,
            y: mouse.y,
          },
        }
      }

      // darg mask
      if (state.draggingMask) {
        const diff = mouse.x - state.mouse.x
        const left = state.mask.left + diff

        return {
          mouse: {
            x: mouse.x,
            y: mouse.y,
          },
          mask: {
            ...state.mask,
            left: Math.max(0, Math.min(left, WIDTH - state.mask.width)),
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
      draggingMask: false,
      draggingLeftEdge: false,
      draggingRightEdge: false,
    }))
  }

  onMouseDown = (e, mouse) => {
    if (!canvas.math.isInsideRect(this.state.mask, mouse)) {
      return
    }

    // near left edge
    if (Math.abs(mouse.x - this.state.mask.left) <= MASK_EDGE_DELTA) {
      this.setState(state => ({
        draggingLeftEdge: true,
      }))
      return
    }

    // near right edge
    if (
      Math.abs(mouse.x - (this.state.mask.left + this.state.mask.width)) <=
      MASK_EDGE_DELTA
    ) {
      this.setState(state => ({
        draggingRightEdge: true,
      }))
      return
    }

    // inside mask
    this.setState(state => ({
      draggingMask: true,
    }))
  }

  onMouseOut = e => {
    this.setState(state => ({
      draggingMask: false,
      draggingLeftEdge: false,
      draggingRightEdge: false,
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
        xMin={X_MIN}
        xMax={X_MAX}
        yMin={Y_MIN}
        yMax={Y_MAX}
        ticks={YEARS}
        tickHeight={10}
        renderTick={x => moment.unix(x).format("YYYY")}
        font="16px Arial"
        textColor="red"
        data={DATA}
        lineColor="orange"
        lineWidth={1}
        step={1}
        maskColor="rgba(0, 0, 255, 0.3)"
        mask={this.state.mask}
        maskEdgeDelta={MASK_EDGE_DELTA}
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
