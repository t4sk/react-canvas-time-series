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
  const barWidth = Math.max(xInterval, 1)

  for (let i = 0; i < data.length; i++) {
    const {
      high,
      low,
      open,
      close
    } = data[i]

    const x = graph.x + i * xInterval
    const yTop = toCanvasY(Math.max(open, close))
    const yBottom = toCanvasY(Math.min(open, close))

    const barHeight = Math.max(yBottom - yTop, 1)

    // body
    ctx.fillStyle = props.candlestick.body.getBackgroundColor(data[i])

    ctx.fillRect(
      round(x),
      round(yTop),
      round(barWidth),
      round(barHeight)
    )

    ctx.strokeStyle = props.candlestick.body.line.getColor(data[i])
    ctx.lineWidth = props.candlestick.body.line.width

    ctx.beginPath()
    ctx.rect(
      round(x),
      round(yTop),
      round(barWidth),
      round(barHeight)
    )
    ctx.stroke()

    // wick
    ctx.strokeStyle = props.candlestick.wick.getColor(data[i])
    ctx.lineWidth = props.candlestick.wick.width

    // top wick
    ctx.beginPath()
    ctx.moveTo(
      round(x + barWidth / 2),
      round(yTop)
    )
    ctx.lineTo(
      round(x + barWidth / 2),
      round(toCanvasY(high))
    )

    // bottom wick
    ctx.moveTo(
      round(x + barWidth / 2),
      round(yTop + barHeight)
    )
    ctx.lineTo(
      round(x + barWidth / 2),
      round(toCanvasY(low))
    )
    ctx.stroke()
  }
}
