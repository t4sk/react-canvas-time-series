// @flow
import { linear } from '../math'
import type { Props } from './types'

export function draw (ctx: any, props: Props) {
  const {
    xMin,
    xMax,
    yMin,
    yMax,
    data,
    graph,
    barWidth,
  } = props

  const intervalWidth = graph.width / data.length

  const toCanvasX = linear({
    dy: graph.width - intervalWidth,
    dx: xMax - xMin,
    y0: graph.left + intervalWidth / 2 - (graph.width - intervalWidth) / (xMax - xMin) * xMin
  })

  const toCanvasY = linear({
    dy: -graph.height,
    dx: yMax - yMin,
    y0: graph.top + graph.height / (yMax - yMin) * yMax
  })

  // TODO dont draw line over boder
  for (let i = 0; i < data.length; i++) {
    const bar = data[i]

    const canvasX = toCanvasX(bar.x)
    const canvasY = toCanvasY(bar.y)

    const barHeight = graph.top + graph.height - canvasY

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
