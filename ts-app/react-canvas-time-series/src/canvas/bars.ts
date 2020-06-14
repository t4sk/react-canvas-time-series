import { CanvasContext, Layout } from "./types"
import { getCanvasX, getCanvasY } from "./math"

interface Bar {
  x: number
  y: number
}

interface Graph {
  data: Bar[]
  step: number
  getBarColor: (bar: Bar) => string
  barWidth: number
}

const defaultProps = {
  step: 1,
  getBarColor: () => "",
  barWidth: 1,
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
  graph = setDefaults(graph)

  const {
    graph: { top, left, width, height },
  } = layout

  const { data, step, getBarColor, barWidth } = graph
  const { xMin, xMax, yMin, yMax } = props

  const canvasY0 = getCanvasY(height, top, yMax, yMin, yMin)

  if (step > 0) {
    for (let i = 0; i < data.length; i += step) {
      const d = data[i]
      const { x, y } = d

      if (x >= xMin && x <= xMax) {
        const canvasX = getCanvasX(width, left, xMax, xMin, x)
        const canvasY = getCanvasY(height, top, yMax, yMin, y)

        const barHeight = canvasY0 - canvasY

        ctx.fillStyle = getBarColor(d)
        ctx.fillRect(
          canvasX - barWidth / 2,
          canvasY,
          barWidth,
          Math.max(0, barHeight - 1)
        )
      }
    }
  }
}
