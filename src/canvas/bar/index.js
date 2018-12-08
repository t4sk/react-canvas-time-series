// @flow
import { toCanvasX, toCanvasY } from '../math'
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

  // TODO dont draw line over boder
  for (let i = 0; i < data.length; i++) {
    const bar = data[i]

    const canvasX = getCanvasX(bar.x)
    const canvasY = getCanvasY(bar.y)

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
