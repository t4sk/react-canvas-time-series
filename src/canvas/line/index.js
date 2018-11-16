// @flow
import { round, floor, linear } from '../math'
import type { Props } from './types'

//TODO flow props
export function drawPoint(ctx: any, props) {
  const {
    graph,
    xMax,
    xMin,
    yMax,
    yMin,
    x,
    y,
    color,
    size,
    borderColor,
    borderWidth,
    ambientColor,
    ambientRadius,
  } = props

  const centerX = linear({
    dy: graph.width,
    dx: xMax - xMin,
    y0: graph.left - graph.width / (xMax - xMin) * xMin
  })(x)

  const centerY = linear({
    dy: -graph.height,
    dx: yMax - yMin,
    y0: graph.top + graph.height + graph.height / (yMax - yMin) * yMin
  })(y)

  const halfSize = floor(size / 2)

  ctx.beginPath()

  if (ambientRadius > 0) {
    ctx.arc(centerX, centerY, ambientRadius, 0, 2 * Math.PI, false)
    ctx.fillStyle = ambientColor
    ctx.fill()
  }

  ctx.beginPath()
  ctx.fillStyle = color
  ctx.fillRect(centerX - halfSize, centerY - halfSize, size, size)

  if (borderWidth > 0) {
    ctx.beginPath()
    ctx.lineWidth = borderWidth
    ctx.strokeStyle = borderColor
    ctx.rect(centerX - halfSize, centerY - halfSize, size, size)
    ctx.stroke()
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

  const toLeft = linear({
    dy: graph.width,
    dx: xMax - xMin,
    y0: graph.left - graph.width * xMin / (xMax - xMin)
  })

  const toTop = linear({
    dy: -graph.height,
    dx: yMax - yMin,
    y0: graph.top + graph.height * yMax / (yMax - yMin)
  })

  ctx.strokeStyle = props.color
  ctx.lineWidth = props.width

  for (let i = 1; i < data.length; i++) {
    const l0 = round(toLeft(data[i - 1].x))
    const t0 = round(toTop(data[i - 1].y))

    const l = round(toLeft(data[i].x))
    const t = round(toTop(data[i].y))

    ctx.beginPath()
    ctx.moveTo(l0, t0)
    ctx.lineTo(l, t)
    ctx.stroke()
  }
}
