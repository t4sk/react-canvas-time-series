import React, { Component } from 'react'
import { Graphs, canvas } from 'react-canvas-time-series'
import moment from 'moment'
import { getRandomData } from '../util'

const now = moment()

const DAYS = [
  ...Array(10).keys()
]
.map(i => now.clone().startOf("day").subtract(i, "day").unix())
.reverse()

const X_MIN = DAYS[0]
const X_MAX = DAYS[DAYS.length - 1]
const X_TICKS = DAYS.slice(1, -1)
const Y_MIN = 0
const Y_MAX = 5000
const Y_TICKS = [0, 1000, 2000, 3000, 4000, 5000]

const DATA = [
  [{
    x: X_MIN,
    y: Y_MIN,
  }, {
    x: X_MAX,
    y: Y_MAX,
  }],
  getRandomData(10000, X_MIN, X_MAX, Y_MIN, Y_MAX),
  getRandomData(10000, X_MIN, X_MAX, Y_MIN, Y_MAX),
  getRandomData(10000, X_MIN, X_MAX, Y_MIN, Y_MAX),
]

const WIDTH = 800
const HEIGHT = 500

class LineTestRender extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nearest: [],
      mouse: {
        x: undefined,
        y: undefined,
      }
    }
  }

  onMouseMove = (e, mouse) => {
    this.setState(state => {
      let nearest = []
      let nearestCanvasX

      if (canvas.math.isInsideRect({
        top: 10,
        left: 10,
        width: 730,
        height: 430
      }, mouse)) {
        const x = canvas.math.getX(730, 10, X_MAX, X_MIN, state.mouse.x)

        for (let i = 0; i < DATA.length; i++) {
          const index = canvas.math.findNearestIndex(DATA[i].map(d => d.x), x)

          nearest.push(DATA[i][index])
        }

        nearestCanvasX = canvas.math.getCanvasX(730, 10, X_MAX, X_MIN, nearest[1].x)
      }

      return {
        nearestCanvasX,
        nearest,
        mouse: {
          x: mouse.x,
          y: mouse.y
        }
      }
    })
  }

  onMouseOut = () => {
    this.setState(state => ({
      nearestCanvasX: undefined,
      nearest: [],
      mouse: {
        x: undefined,
        y: undefined,
      }
    }))
  }

  render () {
    const { mouse, nearest } = this.state

    return (
      <Graphs
        width={WIDTH}
        height={HEIGHT}
        backgroundColor="beige"
        axes={[{
          at: 'bottom',
          top: 440,
          left: 10,
          width: 730,
          height: 50,
          lineColor: 'blue',
          xMin: X_MIN,
          xMax: X_MAX,
          ticks: X_TICKS,
          renderTick: x => moment(x * 1000).format("MM-DD"),
          labels: [{
            x: canvas.math.isInsideRect({
              top: 10,
              left: 10,
              width: 730,
              height: 440,
            }, mouse) ? canvas.math.getX(730, 10, X_MAX, X_MIN, mouse.x) : undefined,
            color: 'white',
            backgroundColor: 'black',
            render: x => moment(x * 1000).format("MM-DD HH:mm"),
            width: 80,
          }],
        }, {
          at: 'right',
          top: 10,
          left: 740,
          width: 50,
          height: 200,
          lineColor: 'blue',
          yMin: Y_MIN,
          yMax: Y_MAX,
          ticks: Y_TICKS,
          renderTick: x => x,
          labels: [{
            y: canvas.math.isInsideRect({
              top: 10,
              left: 10,
              width: 730,
              height: 200,
            }, mouse) ? canvas.math.getY(200, 10, Y_MAX, Y_MIN, mouse.y) : undefined,
            color: 'white',
            backgroundColor: 'black',
            render: y => y,
          }],
        }, {
          at: 'right',
          top: 230,
          left: 740,
          width: 50,
          height: 200,
          lineColor: 'blue',
          yMin: Y_MIN,
          yMax: Y_MAX,
          ticks: Y_TICKS,
          renderTick: x => x,
          labels: [{
            y: canvas.math.isInsideRect({
              top: 230,
              left: 10,
              width: 730,
              height: 200,
            }, mouse) ? canvas.math.getY(200, 230, Y_MAX, Y_MIN, mouse.y) : undefined,
            color: 'white',
            backgroundColor: 'black',
            render: y => y,
          }],
        }]}
        graphs={[{
          type: 'xLine',
          top: 10,
          left: 10,
          height: 200,
          width: 730,
          xMin: X_MIN,
          xMax: X_MAX,
          data: X_TICKS,
          lineColor: 'lightgrey',
        }, {
          type: 'yLine',
          top: 10,
          left: 10,
          height: 200,
          width: 730,
          yMin: Y_MIN,
          yMax: Y_MAX,
          data: Y_TICKS,
          lineColor: 'lightgrey',
        }, {
          type: 'line',
          top: 10,
          left: 10,
          height: 200,
          width: 730,
          xMin: X_MIN,
          xMax: X_MAX,
          yMin: Y_MIN,
          yMax: Y_MAX,
          data: DATA[1],
          lineColor: 'green',
          step: 100,
        }, {
          type: 'line',
          top: 10,
          left: 10,
          height: 200,
          width: 730,
          xMin: X_MIN,
          xMax: X_MAX,
          yMin: Y_MIN,
          yMax: Y_MAX,
          data: DATA[0],
          lineColor: 'blue'
        }, {
          type: 'xLine',
          top: 230,
          left: 10,
          height: 200,
          width: 730,
          xMin: X_MIN,
          xMax: X_MAX,
          data: X_TICKS,
          lineColor: 'lightgrey',
        }, {
          type: 'yLine',
          top: 230,
          left: 10,
          height: 200,
          width: 730,
          yMin: Y_MIN,
          yMax: Y_MAX,
          data: Y_TICKS,
          lineColor: 'lightgrey',
        }, {
          type: 'line',
          top: 230,
          left: 10,
          height: 200,
          width: 730,
          xMin: X_MIN,
          xMax: X_MAX,
          yMin: Y_MIN,
          yMax: Y_MAX,
          data: DATA[2],
          step: 100,
          lineColor: 'lime'
        }, {
          type: 'line',
          top: 230,
          left: 10,
          height: 200,
          width: 730,
          xMin: X_MIN,
          xMax: X_MAX,
          yMin: Y_MIN,
          yMax: Y_MAX,
          data: DATA[3],
          step: 100,
          lineColor: 'olive'
        }]}
        frames={[{
          text: nearest[1] && moment(nearest[1].x * 1000).format("YYYY-MM-DD HH:mm") || '' ,
          color: 'black',
          canvasX: 10,
          canvasY: 10
        }, {
          text: nearest[0] ? nearest[0].y :  '',
          color: 'blue',
          canvasX: 10,
          canvasY: 10 + 15,
        }, {
          text: `${nearest[1] ? nearest[1].y.toFixed() : ''}`,
          color: 'green',
          canvasX: 50,
          canvasY: 10 + 15,
        }, {
          text: nearest[2] && moment(nearest[2].x * 1000).format("YYYY-MM-DD HH:mm") || '' ,
          color: 'black',
          canvasX: 10,
          canvasY: 240,
        }, {
          text: `${nearest[2] ? nearest[2].y.toFixed() : ''}`,
          color: 'lime',
          canvasX: 10,
          canvasY: 240 + 15,
        }, {
          text: `${nearest[3] ? nearest[3].y.toFixed() : ''}`,
          color: 'olive',
          canvasX: 50,
          canvasY: 240 + 15,
        }]}
        crosshair={{
          top: 10,
          left: 10,
          height: 430,
          width: 730,
          canvasX: this.state.nearestCanvasX || this.state.mouse.x,
          canvasY: this.state.mouse.y,
          yLineColor: 'orange',
          yLineWidth: 0.5,
          xLineColor: 'rgba(255, 140, 0, 0.5)',
          xLineWidth: 10,
        }}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseOut}
      />
    )
  }
}

LineTestRender.defaultProps = {
  background: {
    color: 'beige',
    yTickInterval: 10,
    xTickInterval: 100,
  },
  xMin: X_MIN,
  xMax: X_MAX,
  yMin: Y_MIN,
  yMax: Y_MAX,
}

export default LineTestRender
