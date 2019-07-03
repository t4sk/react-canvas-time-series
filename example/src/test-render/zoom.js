import React, { useState } from "react"
import ReactCanvasTimeSeries, {
  zoomable,
  canvas,
} from "react-canvas-time-series"
import moment from "moment"

const Graphs = zoomable(ReactCanvasTimeSeries.Graphs)

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

// graph
const WIDTH = 900
const HEIGHT = 150

// top, bottom, left, right
const PADDING = 10

const X_AXIS = {
  top: HEIGHT - PADDING - 20,
  left: PADDING,
  width: WIDTH - 2 * PADDING,
  height: 20,
}

const GRAPH = {
  top: PADDING,
  left: PADDING,
  width: X_AXIS.width,
  height: HEIGHT - 2 * PADDING - X_AXIS.height,
}

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

  function onWheel(e, mouse, xRange) {
    const { xMin, xMax } = xRange

    setState({
      ...state,
      xMin,
      xMax,
    })
  }

  const { xMin, xMax, mouse } = state

  return (
    <Graphs
      width={WIDTH}
      height={HEIGHT}
      backgroundColor="beige"
      ui={GRAPH}
      mouse={mouse}
      xMin={xMin}
      xMax={xMax}
      axes={[
        {
          at: "bottom",
          ...X_AXIS,
          lineColor: "blue",
          xMin,
          xMax,
          tickInterval: X_TICK_INTERVAL,
          renderTick: x => moment(x * 1000).format("MM-DD"),
        },
      ]}
      graphs={[
        {
          type: "xLines",
          ...GRAPH,
          lineColor: "blue",
          xMin,
          xMax,
          xInterval: X_TICK_INTERVAL,
        },
      ]}
      crosshair={{
        ...GRAPH,
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
