import React, { useRef } from "react"
import { Mouse, Graph, XRange } from "../components/types"
import { Layout } from "../canvas/types"
import canvas from "../canvas"

const DEFAULT_ZOOM_RATE = 0.1

interface Ref {
  xMin: number
  xMax: number
  zoomRate: number
}

function getXRange(
  ref: Ref,
  e: React.WheelEvent<HTMLCanvasElement>,
  mouse: Mouse,
  graph: Graph
) {
  const { xMin, xMax, zoomRate } = ref

  if (!canvas.math.isInside(graph, mouse)) {
    return {
      xMin,
      xMax,
    }
  }

  const { deltaY } = e

  const x = canvas.math.getX(graph.width, graph.left, xMax, xMin, mouse.x)

  if (deltaY > 0) {
    // zoom out
    return {
      xMin: x - (x - xMin) * (1 + zoomRate),
      xMax: x + (xMax - x) * (1 + zoomRate),
    }
  } else {
    // zoom in
    return {
      xMin: x - (x - xMin) * (1 - zoomRate),
      xMax: x + (xMax - x) * (1 - zoomRate),
    }
  }
}

interface ZoomableProps {
  xMin: number
  xMax: number
  zoomRate?: number
  onWheel?: (
    e: React.WheelEvent<HTMLCanvasElement>,
    mouse: Mouse,
    layout: Layout,
    xRange: XRange
  ) => void
}

export default function zoomable<ComponentProps>(
  Component: React.ComponentType<ComponentProps>
) {
  const Zoomable: React.FC<ComponentProps & ZoomableProps> = (props) => {
    // need to store props to ref for functions to get current value from props
    const ref = useRef<Ref>({
      xMin: props.xMin,
      xMax: props.xMax,
      zoomRate: props.zoomRate || DEFAULT_ZOOM_RATE,
    })

    ref.current.xMin = props.xMin
    ref.current.xMax = props.xMax
    ref.current.zoomRate = props.zoomRate || DEFAULT_ZOOM_RATE

    function onWheel(
      e: React.WheelEvent<HTMLCanvasElement>,
      mouse: Mouse,
      layout: Layout
    ) {
      const { xMin, xMax } = getXRange(ref.current, e, mouse, layout.graph)
      props.onWheel?.(e, mouse, layout, { xMin, xMax })
    }

    return <Component {...props} onWheel={onWheel} />
  }

  return Zoomable
}
