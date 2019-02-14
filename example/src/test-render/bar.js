import React, { Component } from 'react'
import { Graphs, canvas } from 'react-canvas-time-series'
import moment from 'moment'
import { fetch } from '../util'

// data
const now = moment()
const days = [
  ...Array(10).keys()
]
.map(i => now.clone().startOf("day").subtract(i, "day").unix())
.reverse()

const Y_MIN = 0
const Y_MAX = 10000

let cache = {
  xMin: undefined,
  xMax: undefined,
  data: {}
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
  height: HEIGHT - X_AXIS_HEIGHT - 2 * PADDING
}

const GRAPH = {
  top: PADDING,
  left: PADDING,
  width: X_AXIS.width,
  height: Y_AXIS.height,
}

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
      labelX: undefined,
      labelY: undefined,
      xMin: days[0],
      xMax: days[days.length - 1],
      xTicks: days,
      yMin: Y_MIN,
      yMax: Y_MAX,
      yTicks: [0, 2000, 4000, 6000, 8000, 10000],
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
    if (prevState.xMin != this.state.xMin || prevState.xMax != this.state.xMax) {
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

    const data = await fetch(cache, {
      xMin, xMax
    }, {
      ms: 1000,
      length: 100,
      yMin: Y_MIN,
      yMax: Y_MAX,
    })

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
      xMax
    }
  }

  onMouseMove = (e, mouse) => {
    this.setState(state => {
      let labelX
      let labelY

      const { xMin, xMax } = this.getXRange(mouse, state)

      if (canvas.math.isInsideRect(GRAPH, mouse)) {
        const { yMin, yMax } = state

        labelX = canvas.math.getX(GRAPH.width, GRAPH.left, xMax, xMin, mouse.x)
        labelY = canvas.math.getY(GRAPH.height, GRAPH.top, yMax, yMin, mouse.y)
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
    }))
  }

  render() {
    const { xMin, xMax, yMin, yMax, mouse } = this.state

    // TODO update xTicks on drag
    return (
      <Graphs
        width={WIDTH}
        height={HEIGHT}
        backgroundColor={this.state.fetching ? "#f2f2f2" : "beige"}
        axes={[{
          at: 'bottom',
          top: X_AXIS.top,
          left: X_AXIS.left,
          width: X_AXIS.width,
          height: X_AXIS.height,
          lineColor: 'blue',
          xMin,
          xMax,
          ticks: this.state.xTicks,
          renderTick: x => moment(x * 1000).format("MM-DD"),
          labels: [{
            x: this.state.labelX,
            color: 'white',
            backgroundColor: 'black',
            render: x => moment(x * 1000).format("MM-DD HH:mm"),
            width: 80,
          }],
        }, {
          at: 'right',
          top: Y_AXIS.top,
          left: Y_AXIS.left,
          width: Y_AXIS.width,
          height: Y_AXIS.height,
          lineColor: 'blue',
          yMin,
          yMax,
          ticks: this.state.yTicks,
          renderTick: x => x,
          labels: [{
            y: this.state.labelY,
            color: 'white',
            backgroundColor: 'black',
            render: y => Math.round(y),
          }],
        }]}
        graphs={[{
          type: 'xLines',
          top: GRAPH.top,
          left: GRAPH.left,
          height: GRAPH.height,
          width: GRAPH.width,
          xMin,
          xMax,
          data: this.state.xTicks,
          lineColor: 'lightgrey',
        }, {
          type: 'yLines',
          top: GRAPH.top,
          left: GRAPH.left,
          height: GRAPH.height,
          width: GRAPH.width,
          yMin,
          yMax,
          data: this.state.yTicks,
          lineColor: 'lightgrey',
        }, {
          type: 'bars',
          top: GRAPH.top,
          left: GRAPH.left,
          height: GRAPH.height,
          width: GRAPH.width,
          xMin,
          xMax,
          yMin,
          yMax,
          barWidth: 10,
          getBarColor: () => 'orange',
          data: this.state.data.filter(d => d.x >= xMin && d.x <= xMax),
        }]}
        crosshair={{
          top: GRAPH.top,
          left: GRAPH.left,
          height: GRAPH.height,
          width: GRAPH.width,
          canvasX: mouse.x,
          canvasY: mouse.y,
          yLineColor: 'orange',
          yLineWidth: 0.5,
          xLineColor: 'rgba(255, 140, 0, 0.5)',
          xLineWidth: 1,
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
