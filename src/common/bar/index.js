// @flow
import { round, linear } from '../math'
import type { Props } from './types'

export function draw (ctx: any, props: Props) {
  const {
    yMin,
    yMax,
    data,
    graph
  } = props

  const toCanvasY = linear({
    dy: -graph.height,
    dx: yMax - yMin,
    y0: graph.y + graph.height * yMax / (yMax - yMin)
  })

  const xInterval = graph.width / data.length
  const barWidth = Math.max(round(xInterval), 1)

  for (let i = 0; i < data.length; i++) {
    const x = round(graph.x + i * xInterval)
    const y = round(toCanvasY(data[i].y))
    const barHeight = graph.y + graph.height - y

    ctx.fillStyle = props.bar.getBackgroundColor(data[i])
    ctx.fillRect(x, y, barWidth, barHeight)

    ctx.beginPath()
    ctx.lineWidth = props.bar.lineWidth
    ctx.strokeStyle = props.bar.getLineColor(data[i])
    ctx.rect(x, y, barWidth, barHeight)
    ctx.stroke()
  }
}
