import React, { useRef } from "react"
import { Props as GraphProps } from "../components/Graph"
import { Mouse, Graph, XRange } from "../components/types"
import { Layout } from "../canvas/types"
import canvas from "../canvas"

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

interface Props {
  xMin: number
  xMax: number
}

export default function draggable(
  Component: React.ComponentType<Partial<GraphProps>>
) {
  const Draggable: React.FC<Partial<GraphProps> & Props> = (props) => {
    // use ref to keep track of dragging state
    // need to store props to ref for functions to get current value from props
    const ref = useRef<Ref>({
      dragging: false,
      dragStartMouseX: undefined,
      dragStartXMin: undefined,
      dragStartXMax: undefined,
      xMin: props.xMin,
      xMax: props.xMax,
    })

    ref.current.xMin = props.xMin
    ref.current.xMax = props.xMax

    function resetDrag() {
      ref.current.dragging = false
      ref.current.dragStartMouseX = undefined
      ref.current.dragStartXMin = undefined
      ref.current.dragStartXMax = undefined
    }

    function onMouseMove(
      e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
      mouse: Mouse,
      layout: Layout
    ) {
      const { xMin, xMax } = getXRange(ref.current, mouse, layout.graph)
      props.onMouseMove?.(e, mouse, layout, { xMin, xMax })
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

      props.onMouseDown?.(e, mouse, layout)
    }

    function onMouseUp(
      e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
      mouse: Mouse,
      layout: Layout
    ) {
      resetDrag()
      props.onMouseUp?.(e, mouse, layout)
    }

    function onMouseOut(
      e: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
      mouse: Mouse,
      layout: Layout
    ) {
      resetDrag()
      props.onMouseOut?.(e, mouse, layout)
    }

    return (
      <Component
        {...props}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    )
  }

  return Draggable
}
