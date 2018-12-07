// @flow
import { linear } from '../math'
import type { Props } from './types'

// TODO add space to avoid overlapping bar charts
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
    y0: graph.left - graph.width / (xMax - xMin) * xMin
  })

  const toCanvasY = linear({
    dy: -graph.height,
    dx: yMax - yMin,
    y0: graph.top + graph.height / (yMax - yMin) * yMax
  })

  // TODO how to handle data.length <= 1
  // TODO dont draw line over boder
  // TODO bar label sliding to right due to round off errors
  for (let i = 0; i < data.length; i++) {
    const bar = data[i]

    const canvasX = toCanvasX(bar.x)
    const canvasY = toCanvasY(bar.y)

    const barHeight = graph.top + graph.height - canvasY
    const barWidth = graph.width / data.length

    ctx.fillStyle = props.getBackgroundColor(bar)
    ctx.fillRect(
      canvasX - barWidth / 2,
      canvasY,
      barWidth,
      barHeight
    )

    ctx.beginPath()
    ctx.lineWidth = props.lineWidth
    ctx.strokeStyle = props.getLineColor(bar)
    ctx.rect(
      canvasX - barWidth / 2,
      canvasY,
      barWidth,
      barHeight
    )
    ctx.stroke()
  }
}
