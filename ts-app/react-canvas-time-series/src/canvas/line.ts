import { CanvasContext, Layout, Point } from "./types"
import { getCanvasX, getCanvasY } from "./math"

interface Graph {
  data: Point[]
  step: number
  lineColor: string
}

const defaultProps = {
  lineColor: "",
  step: 1,
  data: [],
}

function setDefaults(props: Graph): Graph {
  return {
    ...defaultProps,
    ...props,
  }
}

interface Props {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}

export function draw(
  ctx: CanvasContext,
  layout: Layout,
  graph: Graph,
  props: Props
) {
  // TODO remove setDefaults?
  // graph = setDefaults(graph)

  const {
    graph: { top, left, width, height },
  } = layout

  const { data, step, lineColor } = graph
  const { xMin, xMax, yMin, yMax } = props

  ctx.strokeStyle = lineColor
  ctx.lineWidth = 1

  if (step > 0) {
    ctx.beginPath()
    for (let i = 0; i < data.length; i += step) {
      const { x, y } = data[i]

      if (x >= xMin && x <= xMax) {
        ctx.lineTo(
          getCanvasX(width, left, xMax, xMin, x),
          getCanvasY(height, top, yMax, yMin, y)
        )
      }
    }
    ctx.stroke()
  }
}
