import { CanvasContext } from "../types"
import { getCanvasX, getCanvasY } from "../math"

interface Props {
  graph: {
    width: number
    height: number
  }
  xMin: number
  xMax: number
  yMin: number
  yMax: number
  data: { x: number; y: number }[]
  lineColor: string
  lineWidth: number
  step: number
}

export function draw(ctx: CanvasContext, props: Props) {
  const {
    graph,
    xMin,
    xMax,
    yMin,
    yMax,
    data,
    lineColor,
    lineWidth,
    step = 1,
  } = props

  ctx.strokeStyle = lineColor
  ctx.lineWidth = lineWidth

  ctx.beginPath()
  for (let i = 0; i < data.length; i += step) {
    const { x, y } = data[i]

    const canvasX = getCanvasX(graph.width, 0, xMax, xMin, x)
    const canvasY = getCanvasY(graph.height, 0, yMax, yMin, y)

    ctx.lineTo(canvasX, canvasY)
  }
  ctx.stroke()
}
