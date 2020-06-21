import React, { useState, useRef } from "react"
import Graph from "../components/Graph"
import canvas from "../canvas"
import { Layout } from "../canvas/types"
import draggable from "../components/draggable"
import moment from "moment"

// const DraggableGraph = draggable(Graph)
const DraggableGraph = Graph

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

interface Graph {
  top: number
  left: number
  width: number
  height: number
}

interface XRange {
  xMin: number
  xMax: number
}

interface State {
  mouse: Mouse
  xMin: number
  xMax: number
}

interface Ref {
  dragging: boolean
  dragStartMouseX: number | undefined
  dragStartXMin: number | undefined
  dragStartXMax: number | undefined
  xMin: number
  xMax: number
}

function getXRange(ref: Ref, mouse: Mouse, graph: Graph): XRange {
  if (
    !mouse.x ||
    !mouse.y ||
    !canvas.math.isInside(graph, mouse) ||
    !ref.dragging ||
    !ref.dragStartMouseX ||
    !ref.dragStartXMax ||
    !ref.dragStartXMin
  ) {
    return {
      xMin: ref.xMin,
      xMax: ref.xMax,
    }
  }

  const diff = mouse.x - ref.dragStartMouseX

  const xMin = canvas.math.getX(
    graph.width,
    graph.left,
    ref.dragStartXMax,
    ref.dragStartXMin,
    graph.left - diff
  )

  const xMax = canvas.math.getX(
    graph.width,
    graph.left,
    ref.dragStartXMax,
    ref.dragStartXMin,
    graph.width + graph.left - diff
  )

  return {
    xMin,
    xMax,
  }
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

  const ref = useRef<Ref>({
    dragging: false,
    dragStartMouseX: undefined,
    dragStartXMin: undefined,
    dragStartXMax: undefined,
    xMin: X_MIN,
    xMax: X_MAX,
  })

  function resetDrag() {
    ref.current.dragging = false
    ref.current.dragStartMouseX = undefined
    ref.current.dragStartXMin = undefined
    ref.current.dragStartXMax = undefined
  }

  function onMouseDown(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    mouse: Mouse,
    layout: Layout
  ) {
    if (canvas.math.isInside(layout.graph, mouse)) {
      ref.current.dragging = true
      ref.current.dragStartMouseX = mouse.x
      ref.current.dragStartXMin = ref.current.xMin
      ref.current.dragStartXMax = ref.current.xMax
    }
  }

  function onMouseMove(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    mouse: Mouse,
    layout: Layout
  ) {
    const { xMin, xMax } = getXRange(ref.current, mouse, layout.graph)
    ref.current.xMin = xMin
    ref.current.xMax = xMax

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

  function onMouseUp(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    mouse: Mouse,
    layout: Layout
  ) {
    resetDrag()
  }

  function onMouseOut(
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
    mouse: Mouse,
    layout: Layout
  ) {
    resetDrag()

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
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseOut={onMouseOut}
    />
  )
}

export default Drag
