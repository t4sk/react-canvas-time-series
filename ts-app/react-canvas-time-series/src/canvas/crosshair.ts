import { CanvasContext, Layout } from "./types"
import { isInside } from "./math"

interface Props {
  canvasX: number
  canvasY: number
  xLineColor: string
  xLineWidth: number
  yLineColor: string
  yLineWidth: number
}

const defaultProps = {
  xLineColor: "",
  xLineWidth: 0.5,
  yLineColor: "",
  yLineWidth: 0.5,
}

function setDefaults(props: Props): Props {
  return {
    ...defaultProps,
    ...props,
  }
}

export function draw(ctx: CanvasContext, layout: Layout, props: Props) {
  // TODO remove setDefaults?
  // props = setDefaults(props)

  const {
    graph: { width, height, left, top },
  } = layout

  const {
    canvasX,
    canvasY,
    xLineColor,
    xLineWidth,
    yLineColor,
    yLineWidth,
  } = props

  if (!isInside({ top, left, width, height }, { x: canvasX, y: canvasY })) {
    return
  }

  // x line
  ctx.strokeStyle = xLineColor
  ctx.lineWidth = xLineWidth

  ctx.beginPath()
  ctx.moveTo(canvasX, top)
  ctx.lineTo(canvasX, top + height)
  ctx.stroke()

  // y line
  ctx.strokeStyle = yLineColor
  ctx.lineWidth = yLineWidth

  ctx.beginPath()
  ctx.moveTo(left, canvasY)
  ctx.lineTo(left + width, canvasY)
  ctx.stroke()
}
