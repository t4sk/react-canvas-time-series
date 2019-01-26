import React, { Component } from 'react'
import { History, canvas } from 'react-canvas-time-series'
import moment from 'moment'
import { getRandomData } from '../util'

const now = moment()

const YEARS = [
  ...Array(10).keys()
]
.map(i => now.clone().startOf("year").subtract(i, "year").unix())
.reverse()

const X_MIN = YEARS[0]
const X_MAX = YEARS[YEARS.length - 1]
const Y_MIN = 0
const Y_MAX = 10000

const DATA = getRandomData(3650, X_MIN, X_MAX, Y_MIN, Y_MAX)
// .map(({x, y}, i) => {
//   return {
//     x,
//     y: i
//   }
// })

const WIDTH = 900
const HEIGHT = 150
const X_AXIS_HEIGHT = 30
const WINDOW_SIZE = 200

class TestRenderHistory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dragging: false,
      dragStartCanvasX: undefined,
      dragStartWindowLeft: undefined,
      window: {
        left: 0,
        width: WINDOW_SIZE
      }
    }
  }

  getWindow = () => {
    return {
      top: 0,
      left: this.state.window.left,
      width: WINDOW_SIZE,
      height: HEIGHT - X_AXIS_HEIGHT,
    }
  }

  onMouseMove = (e, { x, y }) => {
    if (!this.state.dragging) {
      return
    }

    const rect = this.getWindow()

    if (!canvas.math.isInsideRect(rect, { x, y })) {
      return
    }

    this.setState(state => {
      const diff = x - state.dragStartCanvasX
      const left = state.dragStartWindowLeft + diff

      return {
        window: {
          ...state.window,
          left: Math.max(0, Math.min(left, WIDTH - WINDOW_SIZE))
        }
      }
    })
  }

  onMouseUp = (e, { x, y }) => {
    this.setState(state => ({
      dragging: false,
      dragStartCanvasX: undefined,
      dragStartWindowLeft: undefined,
    }))
  }

  onMouseDown = (e, { x, y }) => {
    const rect = this.getWindow()

    if (!canvas.math.isInsideRect(rect, { x, y })) {
      return
    }

    this.setState(state => ({
      dragging: true,
      dragStartCanvasX: x,
      dragStartWindowLeft: state.window.left,
    }))
  }

  onMouseOut = e => {
    this.setState(state => ({
      dragging: false,
      dragStartCanvasX: undefined,
      dragStartWindowLeft: undefined,
    }))
  }

  render() {
    return (
      <History
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

        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseOut={this.onMouseOut}
      />
    )
  }
}

export default TestRenderHistory
