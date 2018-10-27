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

  const toTop = linear({
    dy: -graph.height,
    dx: yMax - yMin,
    y0: graph.top + graph.height * yMax / (yMax - yMin)
  })

  const leftInterval = graph.width / data.length
  const barWidth = Math.max(round(leftInterval), 1)

  for (let i = 0; i < data.length; i++) {
    const l = round(graph.left + i * leftInterval)
    const t = round(toTop(data[i].y))
    const barHeight = graph.top + graph.height - t

    ctx.fillStyle = props.bar.getBackgroundColor(data[i])
    ctx.fillRect(l, t, barWidth, barHeight)

    ctx.beginPath()
    ctx.lineWidth = props.bar.lineWidth
    ctx.strokeStyle = props.bar.getLineColor(data[i])
    ctx.rect(l, t, barWidth, barHeight)
    ctx.stroke()
  }
}
