import React, { useState } from "react"
import ReactCanvasTimeSeries, {
  zoomable,
  canvas,
} from "react-canvas-time-series"
import moment from "moment"

const Graph = zoomable(ReactCanvasTimeSeries.Graph)

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
const Y_MAX = 1000
const Y_TICK_INTERVAL = 100

// graph
const WIDTH = 900
const HEIGHT = 300

const ZOOM_RATE = 0.1

function Zoom(props) {
  const [state, setState] = useState({
    mouse: {
      x: undefined,
      y: undefined,
    },
    xMin: X_MIN,
    xMax: X_MAX,
  })

  function onMouseMove(e, mouse) {
    setState({
      ...state,
      mouse: {
        x: mouse.x,
        y: mouse.y,
      },
    })
  }

  function onMouseOut() {
    setState({
      ...state,
      mouse: {
        x: undefined,
        y: undefined,
      },
    })
  }

  function onWheel(e, mouse, layout, xRange) {
    const { xMin, xMax } = xRange

    setState({
      ...state,
      xMin,
      xMax,
    })
  }

  const { xMin, xMax, mouse } = state

  return (
    <Graph
      width={WIDTH}
      height={HEIGHT}
      animate={false}
      backgroundColor="beige"
      yMin={Y_MIN}
      yMax={Y_MAX}
      xAxisAt="bottom"
      xTickInterval={X_TICK_INTERVAL}
      yAxisAt="left"
      yTickInterval={Y_TICK_INTERVAL}
      xMin={xMin}
      xMax={xMax}
      mouse={mouse}
      crosshair={{
        canvasX: mouse.x,
        canvasY: mouse.y,
      }}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseOut}
      onWheel={onWheel}
    />
  )
}

export default Zoom
