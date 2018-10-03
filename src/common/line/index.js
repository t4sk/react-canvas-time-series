// @flow
import { round, linear } from '../math'
import type { Props } from './types'

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
    y0: graph.x - graph.width * xMin / (xMax - xMin)
  })

  const toCanvasY = linear({
    dy: -graph.height,
    dx: yMax - yMin,
    y0: graph.y + graph.height * yMax / (yMax - yMin)
  })

  ctx.strokeStyle = props.line.color
  ctx.lineWidth = props.line.width

  for (let i = 1; i < data.length; i++) {
    const x0 = round(toCanvasX(data[i - 1].x))
    const y0 = round(toCanvasY(data[i - 1].y))

    const x = round(toCanvasX(data[i].x))
    const y = round(toCanvasY(data[i].y))

    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x, y)
    ctx.stroke()
  }
}
