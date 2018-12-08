// @flow
import { toCanvasX, toCanvasY } from '../math'
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

  const getCanvasX = toCanvasX({
    width: graph.width,
    left: graph.left,
    xMax,
    xMin,
  })

  const getCanvasY = toCanvasY({
    height: graph.height,
    top: graph.top,
    yMax,
    yMin,
  })

  ctx.strokeStyle = props.color
  ctx.lineWidth = props.width

  ctx.beginPath()
  for (let i = 0; i < data.length; i++) {
    ctx.lineTo(getCanvasX(data[i].x), getCanvasY(data[i].y))
  }
  ctx.stroke()
}
