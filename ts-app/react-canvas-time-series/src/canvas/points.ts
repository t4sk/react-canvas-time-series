import { CanvasContext, Layout, Point } from "./types"
import { getCanvasX, getCanvasY } from "./math"

interface Graph {
  data: Point[]
  color: string
  radius: number
  ambientColor: string
  ambientRadius: number
}

const defaultProps = {
  color: "black",
  radius: 2,
  ambientColor: "rgba(80, 80, 80, 0.3)",
  ambientRadius: 0,
  data: [],
}

function setDefaults(props: Graph): Graph {
  return {
    ...defaultProps,
    ...props,
  }
}

export function drawPoint(
  ctx: CanvasContext,
  layout: Layout,
  graph: Graph,
  point: Point,
  props: Props
) {
  const {
    graph: { top, left, width, height },
  } = layout

  const { color, radius, ambientColor, ambientRadius } = graph
  const { xMin, xMax, yMin, yMax } = props
  const { x, y } = point

  if (x === undefined || y === undefined) {
    return
  }

  const canvasX = getCanvasX(width, left, xMax, xMin, x)
  const canvasY = getCanvasY(height, top, yMax, yMin, y)

  if (ambientRadius > 0) {
    ctx.beginPath()
    ctx.arc(canvasX, canvasY, ambientRadius, 0, 2 * Math.PI, false)
    ctx.fillStyle = ambientColor
    ctx.fill()
  }

  if (radius > 0) {
    ctx.beginPath()
    ctx.arc(canvasX, canvasY, radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = color
    ctx.fill()
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

  const { data } = graph

  for (const point of data) {
    drawPoint(ctx, layout, graph, point, props)
  }
}
