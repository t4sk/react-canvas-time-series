import React, { useState } from "react"
import { XRange } from "../components/types"
import Graph from "../components/Graph"
import { Layout } from "../canvas/types"
import zoomable from "../components/zoomable"
import moment from "moment"

const ZoomableGraph = zoomable(Graph)

const NOW = moment()
const DAYS = [...new Array(10)]
  .map((_, i) => NOW.clone().startOf("day").subtract(i, "day").unix())
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

interface Mouse {
  x: number | undefined
  y: number | undefined
}

interface State {
  mouse: Mouse
  xMin: number
  xMax: number
}

function Zoom() {
  const [state, setState] = useState<State>({
    mouse: {
      x: undefined,
      y: undefined,
    },
    xMin: X_MIN,
    xMax: X_MAX,
  })

  function onMouseMove(
    _e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    mouse: Mouse
  ) {
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

  function onWheel(
    _e: React.WheelEvent<HTMLCanvasElement>,
    _mouse: Mouse,
    _layout: Layout,
    xRange: XRange
  ) {
    const { xMin, xMax } = xRange

    setState({
      ...state,
      xMin,
      xMax,
    })
  }

  const { xMin, xMax, mouse } = state

  return (
    <ZoomableGraph
      width={WIDTH}
      height={HEIGHT}
      animate={true}
      backgroundColor="beige"
      yMin={Y_MIN}
      yMax={Y_MAX}
      xAxisAt="bottom"
      xTickInterval={X_TICK_INTERVAL}
      yAxisAt="left"
      yTickInterval={Y_TICK_INTERVAL}
      xMin={xMin}
      xMax={xMax}
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
