// @flow
import { toCanvasX, toCanvasY } from '../math'
import { getGraphDimensions } from '../util'

function drawPoint(ctx: any, props, canvasX, canvasY) {
  const {
    color,
    radius,
    ambientColor,
    ambientRadius,
  } = props

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

export function draw (ctx: any, props: Props) {
  const {
    getCanvasX,
    getCanvasY,
    data,
  } = props

  for (let i = 0; i < data.length; i++) {
    drawPoint(
      ctx,
      {...props, ...data[i]},
      getCanvasX(data[i].x),
      getCanvasY(data[i].y)
    )
  }
}
