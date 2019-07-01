import React, { Component } from "react"
import { Graphs, canvas } from "react-canvas-time-series"
import moment from "moment"
import { fetch, getRandomData } from "../util"

let cache = [
  {
    xMin: undefined,
    xMax: undefined,
    data: {},
  },
  {
    xMin: undefined,
    xMax: undefined,
    data: {},
  },
  {
    xMin: undefined,
    xMax: undefined,
    data: {},
  },
  {
    xMin: undefined,
    xMax: undefined,
    data: {},
  },
]

const now = moment()

const DAYS = [...Array(10).keys()]
  .map(i =>
    now
      .clone()
      .startOf("day")
      .subtract(i, "day")
      .unix()
  )
  .reverse()

const X_MIN = DAYS[0]
const X_MAX = DAYS[DAYS.length - 1]
const X_TICKS = DAYS.slice(1, -1)
const Y_MIN = 0
const Y_MAX = 5000

const WIDTH = 800
const HEIGHT = 500

class LineTestRender extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fetching: false,
      nearest: [],
      mouse: {
        x: undefined,
        y: undefined,
      },
      lines: [],
    }
  }

  componentDidMount() {
    this.fetch()
  }

  fetch = async () => {
    this.setState(state => ({ fetching: true }))

    let lines = []

    for (let i = 0; i < cache.length; i++) {
      const res = await fetch(
        cache[i],
        {
          xMin: X_MIN,
          xMax: X_MAX,
        },
        {
          ms: 200,
          xStep: 3600 * 3,
          yMin: Y_MIN,
          yMax: Y_MAX,
        }
      )

      lines.push(res)
    }

    this.setState(state => ({
      lines,
      fetching: false,
    }))
  }

  onMouseMove = (e, mouse) => {
    this.setState(state => {
      let nearest = []
      let nearestCanvasX

      if (
        canvas.math.isInsideRect(
          {
            top: 10,
            left: 10,
            width: 730,
            height: 430,
          },
          mouse
        )
      ) {
        const x = canvas.math.getX(730, 10, X_MAX, X_MIN, state.mouse.x)

        const { lines } = this.state

        for (let i = 0; i < lines.length; i++) {
          const index = canvas.math.findNearestIndex(lines[i].map(d => d.x), x)

          nearest.push(lines[i][index])
        }

        nearestCanvasX = canvas.math.getCanvasX(
          730,
          10,
          X_MAX,
          X_MIN,
          nearest[1].x
        )
      }

      return {
        nearestCanvasX,
        nearest,
        mouse: {
          x: mouse.x,
          y: mouse.y,
        },
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
      },
    }))
  }

  render() {
    const { mouse, nearest } = this.state

    return (
      <Graphs
        width={WIDTH}
        height={HEIGHT}
        backgroundColor={this.state.fetching ? "lightgrey" : "beige"}
        axes={[
          {
            at: "bottom",
            top: 440,
            left: 10,
            width: 730,
            height: 50,
            lineColor: "blue",
            xMin: X_MIN,
            xMax: X_MAX,
            ticks: X_TICKS,
            renderTick: x => moment(x * 1000).format("MM-DD"),
            labels: [
              {
                x: canvas.math.isInsideRect(
                  {
                    top: 10,
                    left: 10,
                    width: 730,
                    height: 440,
                  },
                  mouse
                )
                  ? canvas.math.getX(730, 10, X_MAX, X_MIN, mouse.x)
                  : undefined,
                color: "white",
                backgroundColor: "black",
                render: x => moment(x * 1000).format("MM-DD HH:mm"),
                width: 80,
              },
            ],
          },
          {
            at: "right",
            top: 10,
            left: 740,
            width: 50,
            height: 200,
            lineColor: "blue",
            yMin: Y_MIN,
            yMax: Y_MAX,
            tickInterval: 1000,
            renderTick: x => x,
            labels: [
              {
                y: canvas.math.isInsideRect(
                  {
                    top: 10,
                    left: 10,
                    width: 730,
                    height: 200,
                  },
                  mouse
                )
                  ? canvas.math.getY(200, 10, Y_MAX, Y_MIN, mouse.y)
                  : undefined,
                color: "white",
                backgroundColor: "black",
                render: y => y,
              },
            ],
          },
          {
            at: "right",
            top: 230,
            left: 740,
            width: 50,
            height: 200,
            lineColor: "blue",
            yMin: Y_MIN,
            yMax: Y_MAX,
            tickInterval: 1000,
            renderTick: x => x,
            labels: [
              {
                y: canvas.math.isInsideRect(
                  {
                    top: 230,
                    left: 10,
                    width: 730,
                    height: 200,
                  },
                  mouse
                )
                  ? canvas.math.getY(200, 230, Y_MAX, Y_MIN, mouse.y)
                  : undefined,
                color: "white",
                backgroundColor: "black",
                render: y => y,
              },
            ],
          },
        ]}
        graphs={[
          {
            type: "xLines",
            top: 10,
            left: 10,
            height: 200,
            width: 730,
            xMin: X_MIN,
            xMax: X_MAX,
            data: X_TICKS,
            lineColor: "lightgrey",
          },
          {
            type: "yLines",
            top: 10,
            left: 10,
            height: 200,
            width: 730,
            yMin: Y_MIN,
            yMax: Y_MAX,
            yInterval: 1000,
            lineColor: "lightgrey",
          },
          {
            type: "line",
            top: 10,
            left: 10,
            height: 200,
            width: 730,
            xMin: X_MIN,
            xMax: X_MAX,
            yMin: Y_MIN,
            yMax: Y_MAX,
            data: this.state.lines[0] || [],
            lineColor: "blue",
          },
          {
            type: "line",
            top: 10,
            left: 10,
            height: 200,
            width: 730,
            xMin: X_MIN,
            xMax: X_MAX,
            yMin: Y_MIN,
            yMax: Y_MAX,
            data: this.state.lines[1] || [],
            lineColor: "green",
          },
          /*
          {
            type: "point",
            top: 10,
            left: 10,
            height: 200,
            width: 730,
            xMin: X_MIN,
            xMax: X_MAX,
            yMin: Y_MIN,
            yMax: Y_MAX,
            x: nearest[1] ? nearest[1].x : undefined,
            y: nearest[1] ? nearest[1].y : undefined,
            color: "green",
            ambientColor: "rgba(0, 255, 0, 0.1)",
          },
          {
            type: "point",
            top: 10,
            left: 10,
            height: 200,
            width: 730,
            xMin: X_MIN,
            xMax: X_MAX,
            yMin: Y_MIN,
            yMax: Y_MAX,
            x: nearest[0] ? nearest[0].x : undefined,
            y: nearest[0] ? nearest[0].y : undefined,
            color: "blue",
            ambientColor: "rgba(0, 0, 255, 0.1)",
          },
          */
          {
            type: "xLines",
            top: 230,
            left: 10,
            height: 200,
            width: 730,
            xMin: X_MIN,
            xMax: X_MAX,
            data: X_TICKS,
            lineColor: "lightgrey",
          },
          {
            type: "yLines",
            top: 230,
            left: 10,
            height: 200,
            width: 730,
            yMin: Y_MIN,
            yMax: Y_MAX,
            yInterval: 1000,
            lineColor: "lightgrey",
          },
          {
            type: "line",
            top: 230,
            left: 10,
            height: 200,
            width: 730,
            xMin: X_MIN,
            xMax: X_MAX,
            yMin: Y_MIN,
            yMax: Y_MAX,
            data: this.state.lines[2] || [],
            lineColor: "lime",
          },
          {
            type: "line",
            top: 230,
            left: 10,
            height: 200,
            width: 730,
            xMin: X_MIN,
            xMax: X_MAX,
            yMin: Y_MIN,
            yMax: Y_MAX,
            data: this.state.lines[3] || [],
            lineColor: "olive",
          },
          /*
          {
            type: "point",
            top: 230,
            left: 10,
            height: 200,
            width: 730,
            xMin: X_MIN,
            xMax: X_MAX,
            yMin: Y_MIN,
            yMax: Y_MAX,
            x: nearest[2] ? nearest[2].x : undefined,
            y: nearest[2] ? nearest[2].y : undefined,
            color: "lime",
            ambientColor: "rgba(0, 255, 0, 0.1)",
          },
          {
            type: "point",
            top: 230,
            left: 10,
            height: 200,
            width: 730,
            xMin: X_MIN,
            xMax: X_MAX,
            yMin: Y_MIN,
            yMax: Y_MAX,
            x: nearest[3] ? nearest[3].x : undefined,
            y: nearest[3] ? nearest[3].y : undefined,
            color: "olive",
            ambientColor: "rgba(0, 255, 0, 0.1)",
          },
          */
        ]}
        frames={[
          {
            text:
              (nearest[1] &&
                moment(nearest[1].x * 1000).format("YYYY-MM-DD HH:mm")) ||
              "",
            color: "black",
            canvasX: 10,
            canvasY: 10,
          },
          {
            text: nearest[0] ? nearest[0].y : "",
            color: "blue",
            canvasX: 10,
            canvasY: 10 + 15,
          },
          {
            text: `${nearest[1] ? nearest[1].y.toFixed() : ""}`,
            color: "green",
            canvasX: 50,
            canvasY: 10 + 15,
          },
          {
            text:
              (nearest[2] &&
                moment(nearest[2].x * 1000).format("YYYY-MM-DD HH:mm")) ||
              "",
            color: "black",
            canvasX: 10,
            canvasY: 240,
          },
          {
            text: `${nearest[2] ? nearest[2].y.toFixed() : ""}`,
            color: "lime",
            canvasX: 10,
            canvasY: 240 + 15,
          },
          {
            text: `${nearest[3] ? nearest[3].y.toFixed() : ""}`,
            color: "olive",
            canvasX: 50,
            canvasY: 240 + 15,
          },
        ]}
        crosshair={{
          top: 10,
          left: 10,
          height: 430,
          width: 730,
          canvasX: this.state.nearestCanvasX || this.state.mouse.x,
          canvasY: this.state.mouse.y,
          yLineColor: "orange",
          yLineWidth: 0.5,
          xLineColor: "rgba(255, 140, 0, 0.5)",
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
    color: "beige",
    yTickInterval: 10,
    xTickInterval: 100,
  },
  xMin: X_MIN,
  xMax: X_MAX,
  yMin: Y_MIN,
  yMax: Y_MAX,
}

export default LineTestRender
