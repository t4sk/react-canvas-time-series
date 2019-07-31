import React, { useState } from "react"
import ReactCanvasTimeSeries, {
  canvas,
  draggable,
} from "react-canvas-time-series"
import moment from "moment"

const Graph = draggable(ReactCanvasTimeSeries.Graph)

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

function Drag(props) {
  const [state, setState] = useState({
    mouse: {
      x: undefined,
      y: undefined,
    },
    xMin: X_MIN,
    xMax: X_MAX,
  })

  function onMouseMove(e, mouse, graph, { xMin, xMax }) {
    setState({
      ...state,
      mouse: {
        x: mouse.x,
        y: mouse.y,
      },
      xMin,
      xMax,
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
      xMin={state.xMin}
      xMax={state.xMax}
      mouse={state.mouse}
      crosshair={{
        canvasX: mouse.x,
        canvasY: mouse.y,
      }}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseOut}
    />
  )
}

export default Drag
