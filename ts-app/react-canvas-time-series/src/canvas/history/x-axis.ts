import { CanvasContext } from "../types"
import { getCanvasX } from "../math"

const TICK_TEXT_TOP_PADDING = 10

interface Props {
  graph: {
    width: number
    height: number
  }
  xAxisColor: string
  xMin: number
  xMax: number
  tickHeight: number
  ticks: number[]
  renderTick: (tick: number) => string
  font: string
  textColor: string
}

export function draw(ctx: CanvasContext, props: Props) {
  const {
    graph,
    xAxisColor,
    xMin,
    xMax,
    tickHeight,
    ticks,
    renderTick,
    font,
    textColor,
  } = props

  // style x axis
  ctx.lineWidth = 1
  ctx.strokeStyle = xAxisColor

  ctx.beginPath()
  ctx.moveTo(0, graph.height)
  ctx.lineTo(graph.width, graph.height)
  ctx.stroke()

  // style ticks
  ctx.font = font
  ctx.fillStyle = textColor
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  for (let tick of ticks) {
    const canvasX = getCanvasX(graph.width, 0, xMax, xMin, tick)

    ctx.beginPath()
    ctx.moveTo(canvasX, graph.height)
    ctx.lineTo(canvasX, graph.height + tickHeight)
    ctx.stroke()

    ctx.fillText(
      renderTick(tick),
      canvasX,
      graph.height + tickHeight + TICK_TEXT_TOP_PADDING
    )
  }
}
