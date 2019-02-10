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
      mouse: {
        x: undefined,
        y: undefined,
      },
      xMin: days[0],
      xMax: days[days.length - 1],
      xTicks: days,
      yMin: Y_MIN,
      yMax: Y_MAX,
      yTicks: [0, 2000, 4000, 6000, 8000, 10000],
      data: [],
    }
  }

  componentDidMount() {
    this.fetch({
      xMin: this.state.xMin,
      xMax: this.state.xMax,
    })
  }

  fetch = async ({ xMin, xMax }) => {
    const data = await fetch(cache, {
      xMin, xMax
    }, {
      ms: 1000,
      length: 1000,
      yMin: Y_MIN,
      yMax: Y_MAX,
    })

    this.setState(state => ({ data }))
  }

  render() {
    const { xMin, xMax, yMin, yMax, mouse } = this.state

    console.log(this.state.data)
    return (
      <Graphs
        width={WIDTH}
        height={HEIGHT}
        backgroundColor="beige"
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
            x: canvas.math.isInsideRect({
              top: GRAPH.top,
              left: GRAPH.left,
              width: GRAPH.width,
              height: GRAPH.height,
            }, mouse) ? canvas.math.getX(GRAPH.width, GRAPH.left, xMax, xMin, mouse.x) : undefined,
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
            y: canvas.math.isInsideRect({
              top: GRAPH.top,
              left: GRAPH.left,
              width: GRAPH.width,
              height: GRAPH.height,
            }, mouse) ? canvas.math.getY(GRAPH.height, GRAPH.top, yMax, yMin, mouse.y) : undefined,
            color: 'white',
            backgroundColor: 'black',
            render: y => y,
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
          data: this.state.data,
        }]}
      />
    )
  }
}

export default BarTestRender
