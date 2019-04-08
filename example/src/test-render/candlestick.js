import React, { Component } from "react"
import { Graphs, canvas } from "react-canvas-time-series"
import moment from "moment"
import { getRandomCandlestickData } from "../util"

const WIDTH = 920
const HEIGHT = 550
const PADDING = 10

const X_AXIS_HEIGHT = 20
const Y_AXIS_WIDTH = 50
const CANDLESTICK_GRAPH_HEIGHT = 400
const VOLUME_GRAPH_HEIGHT = 100

const GRAPH = {
  top: PADDING,
  left: PADDING,
  height: HEIGHT - 2 * PADDING - X_AXIS_HEIGHT,
  width: WIDTH - 2 * PADDING - Y_AXIS_WIDTH,
}

const X_AXIS = {
  top: HEIGHT - PADDING - X_AXIS_HEIGHT,
  left: 10,
  height: X_AXIS_HEIGHT,
  width: WIDTH - 2 * PADDING - Y_AXIS_WIDTH,
}

const CANDLESTICK_Y_AXIS = {
  top: PADDING,
  left: WIDTH - PADDING - Y_AXIS_WIDTH,
  height: CANDLESTICK_GRAPH_HEIGHT,
  width: Y_AXIS_WIDTH,
}

const CANDLESTICK_GRAPH = {
  top: PADDING,
  left: PADDING,
  width: WIDTH - 2 * PADDING - Y_AXIS_WIDTH,
  height: CANDLESTICK_GRAPH_HEIGHT,
}

const VOLUME_Y_AXIS = {
  top: PADDING + CANDLESTICK_GRAPH_HEIGHT + PADDING,
  left: WIDTH - PADDING - Y_AXIS_WIDTH,
  height: VOLUME_GRAPH_HEIGHT,
  width: Y_AXIS_WIDTH,
}

const VOLUME_GRAPH = {
  top: PADDING + CANDLESTICK_GRAPH_HEIGHT + PADDING,
  left: PADDING,
  height: VOLUME_GRAPH_HEIGHT,
  width: WIDTH - 2 * PADDING - Y_AXIS_WIDTH,
}

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

const CANDLESTICK_Y_MIN = 0
const CANDLESTICK_Y_MAX = 1000
const CANDLESTICK_Y_TICK_INTERVAL = 100

const VOLUME_Y_MIN = 0
const VOLUME_Y_MAX = 1000
const VOLUME_Y_TICK_INTERVAL = 200

function renderCandlestickYTick(y) {
  return y.toFixed(2).toLocaleString()
}

function renderVolumeYTick(y) {
  return y.toLocaleString()
}

const DATA = getRandomCandlestickData(
  3600,
  X_MIN,
  X_MAX,
  CANDLESTICK_Y_MIN,
  CANDLESTICK_Y_MAX,
  VOLUME_Y_MAX
)

const X_LABEL_WIDTH = 80
const Y_LABEL_HEIGHT = 20

class Candlestick extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mouse: {
        x: undefined,
        y: undefined,
      },
      xMin: X_MIN,
      xMax: X_MAX,
      candlestickYMin: CANDLESTICK_Y_MIN,
      candlestickYMax: CANDLESTICK_Y_MAX,
      volumeYMin: VOLUME_Y_MIN,
      volumeYMax: VOLUME_Y_MAX,
    }
  }

  onMouseMove = (e, mouse) => {
    this.setState(state => {
      if (!canvas.math.isInsideRect(GRAPH, mouse)) {
        return {
          mouse: {
            x: undefined,
            y: undefined,
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

  onMouseOut = () => {
    this.setState(state => {
      return {
        mouse: {
          x: undefined,
          y: undefined,
        },
      }
    })
  }

  render() {
    const {
      mouse,
      xMin,
      xMax,
      candlestickYMin,
      candlestickYMax,
      volumeYMin,
      volumeYMax,
    } = this.state

    return (
      <Graphs
        width={WIDTH}
        height={HEIGHT}
        backgroundColor="beige"
        axes={[
          {
            at: "right",
            ...CANDLESTICK_Y_AXIS,
            lineColor: "blue",
            yMin: candlestickYMin,
            yMax: candlestickYMax,
            tickInterval: CANDLESTICK_Y_TICK_INTERVAL,
            renderTick: renderCandlestickYTick,
          },
          {
            at: "right",
            ...VOLUME_Y_AXIS,
            lineColor: "blue",
            yMin: volumeYMin,
            yMax: volumeYMax,
            tickInterval: VOLUME_Y_TICK_INTERVAL,
            renderTick: renderVolumeYTick,
          },
          {
            at: "bottom",
            ...X_AXIS,
            lineColor: "blue",
            xMin,
            xMax,
            tickInterval: 3600 * 24,
            renderTick: x => moment(x * 1000).format("MM-DD"),
          },
        ]}
        graphs={[
          {
            type: "xLines",
            ...CANDLESTICK_GRAPH,
            xMin,
            xMax,
            xInterval: 3600 * 24,
            lineColor: "lightgrey",
          },
          {
            type: "candlestick",
            ...CANDLESTICK_GRAPH,
            xMin,
            xMax,
            yMin: candlestickYMin,
            yMax: candlestickYMax,
            candlestickWidth: 5,
            lineWidth: 1,
            getColor: data => (data.close > data.open ? "red" : "green"),
            data: DATA,
          },
          {
            type: "bars",
            ...VOLUME_GRAPH,
            xMin,
            xMax,
            yMin: volumeYMin,
            yMax: volumeYMax,
            barWidth: 10,
            getBarColor: d => (d.close > d.open ? "green" : "red"),
            data: DATA.map(d => ({
              x: d.timestamp,
              y: d.volume,
              open: d.open,
              close: d.close,
            })),
          },
        ]}
        crosshair={{
          ...GRAPH,
          canvasX: mouse.x,
          canvasY: mouse.y,
          yLineColor: "black",
          yLineWidth: 1,
          xLineColor: "black",
          xLineWidth: 1,
        }}
        xLabels={[
          {
            drawLabel: !!mouse.x,
            top: X_AXIS.top + 10,
            left: mouse.x - X_LABEL_WIDTH / 2,
            width: X_LABEL_WIDTH,
            renderText: () =>
              moment(
                canvas.math.getX(GRAPH.width, GRAPH.left, xMax, xMin, mouse.x) *
                  1000
              ).format("MM-DD HH:mm"),
            color: "white",
            backgroundColor: "black",
            drawLine: !!mouse.x,
            lineTop: GRAPH.top,
            lineBottom: X_AXIS.top + 10,
          },
        ]}
        yLabels={[
          {
            drawLabel: !!mouse.y,
            top: mouse.y - Y_LABEL_HEIGHT / 2,
            left: GRAPH.left + GRAPH.width + 10,
            height: Y_LABEL_HEIGHT,
            width: Y_AXIS_WIDTH,
            renderText: () => {
              if (mouse.y <= CANDLESTICK_GRAPH.top + CANDLESTICK_GRAPH.height) {
                return renderCandlestickYTick(
                  canvas.math.getY(
                    CANDLESTICK_GRAPH.height,
                    CANDLESTICK_GRAPH.top,
                    candlestickYMax,
                    candlestickYMin,
                    mouse.y
                  )
                )
              } else if (
                mouse.y >= VOLUME_GRAPH.top &&
                mouse.y <= VOLUME_GRAPH.top + VOLUME_GRAPH.height
              ) {
                return renderCandlestickYTick(
                  canvas.math.getY(
                    VOLUME_GRAPH.height,
                    VOLUME_GRAPH.top,
                    volumeYMax,
                    volumeYMin,
                    mouse.y
                  )
                )
              }
            },
            color: "white",
            backgroundColor: "black",
            drawLine: !!mouse.y,
            lineLeft: GRAPH.left,
            lineRight: GRAPH.left + GRAPH.width + 10,
          },
        ]}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseOut}
      />
    )
  }
}

export default Candlestick
