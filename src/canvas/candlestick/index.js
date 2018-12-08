// @flow
import { linear } from '../math'
import type { Props } from './types'

// TODO render candle at timestamp
// TODO add space to avoid candle body overlap
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
  const barWidth = Math.max(leftInterval, 1)

  for (let i = 0; i < data.length; i++) {
    const {
      high,
      low,
      open,
      close
    } = data[i]

    const l = graph.left + i * leftInterval
    const top = toTop(Math.max(open, close))
    const bottom = toTop(Math.min(open, close))

    const barHeight = Math.max(bottom - top, 1)

    // body
    ctx.fillStyle = props.getBackgroundColor(data[i])

    ctx.fillRect(l, top, barWidth, barHeight)

    ctx.strokeStyle = props.getLineColor(data[i])
    ctx.lineWidth = props.lineWidth

    ctx.beginPath()
    ctx.rect(l, top, barWidth, barHeight)
    ctx.stroke()

    // wick
    ctx.strokeStyle = props.getWickColor(data[i])
    ctx.lineWidth = props.wickWidth

    // top wick
    ctx.beginPath()
    ctx.moveTo(l + barWidth / 2, top)
    ctx.lineTo(l + barWidth / 2, toTop(high))

    // bottom wick
    ctx.moveTo(l + barWidth / 2, top + barHeight)
    ctx.lineTo(l + barWidth / 2, toTop(low))
    ctx.stroke()
  }
}
