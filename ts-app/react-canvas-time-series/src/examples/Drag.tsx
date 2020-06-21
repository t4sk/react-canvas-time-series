import React, { useState, useRef } from "react"
import { XRange } from "../components/types"
import Graph from "../components/Graph"
import canvas from "../canvas"
import { Layout } from "../canvas/types"
import draggable from "../components/draggable"
import moment from "moment"

const DraggableGraph = draggable(Graph)

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

function Drag() {
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
    mouse: Mouse,
    _layout: Layout,
    xRange: XRange
  ) {
    const { xMin, xMax } = xRange

    setState((state) => ({
      ...state,
      mouse: {
        x: mouse.x,
        y: mouse.y,
      },
      xMin,
      xMax,
    }))
  }

  function onMouseOut(
    _e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    _mouse: Mouse,
    _layout: Layout
  ) {
    setState((state) => ({
      ...state,
      mouse: {
        x: undefined,
        y: undefined,
      },
    }))
  }

  const { xMin, xMax, mouse } = state

  return (
    <DraggableGraph
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
    />
  )
}

export default Drag
