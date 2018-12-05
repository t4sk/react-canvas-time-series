// @flow
import { round, linear } from '../math'
import type { Props } from './types'

// TODO add space to avoid overlapping bar charts
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

  // TODO dont draw line over boder
  // TODO bar label sliding to right due to round off errors
  // TODO center bar at x
  for (let i = 0; i < data.length; i++) {
    const l = round(graph.left + i * leftInterval)
    const t = round(toTop(data[i].y))
    const barHeight = graph.top + graph.height - t

    ctx.fillStyle = props.getBackgroundColor(data[i])
    ctx.fillRect(l, t, barWidth, barHeight)

    ctx.beginPath()
    ctx.lineWidth = props.lineWidth
    ctx.strokeStyle = props.getLineColor(data[i])
    ctx.rect(l, t, barWidth, barHeight)
    ctx.stroke()
  }
}
