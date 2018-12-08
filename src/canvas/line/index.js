// @flow
import { linear } from '../math'
import type { Props } from './types'

export function drawPoint(ctx: any, props) {
  const {
    canvasX,
    canvasY,
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
    xMin,
    xMax,
    yMin,
    yMax,
    data,
    graph
  } = props

  const toCanvasX = linear({
    dy: graph.width,
    dx: xMax - xMin,
    y0: graph.left - graph.width * xMin / (xMax - xMin)
  })

  const toCanvasY = linear({
    dy: -graph.height,
    dx: yMax - yMin,
    y0: graph.top + graph.height * yMax / (yMax - yMin)
  })

  ctx.strokeStyle = props.color
  ctx.lineWidth = props.width

  ctx.beginPath()
  for (let i = 0; i < data.length; i++) {
    ctx.lineTo(toCanvasX(data[i].x), toCanvasY(data[i].y))
  }
  ctx.stroke()
}
