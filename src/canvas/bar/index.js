// @flow
import { toCanvasX, toCanvasY } from '../math'
import { getGraphDimensions } from '../background/util'
import type { Props } from './types'

export function draw (ctx: any, props: Props) {
  const {
    xMin,
    xMax,
    yMin,
    yMax,
    data,
    barWidth,
  } = props

  const graph = getGraphDimensions(props)

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

  // TODO render only part of bar that is inside graph
  for (let i = 0; i < data.length; i++) {
    const bar = data[i]

    const canvasX = getCanvasX(bar.x)
    const canvasY = getCanvasY(bar.y)

    const barHeight = graph.top + graph.height - canvasY

    ctx.fillStyle = props.getBarBackgroundColor(bar)
    ctx.fillRect(
      canvasX - barWidth / 2,
      canvasY,
      barWidth,
      barHeight
    )

    if (props.barBorderWidth > 0) {
      ctx.beginPath()
      ctx.lineWidth = props.barBorderWidth
      ctx.strokeStyle = props.getBarBorderColor(bar)
      ctx.rect(
        canvasX - barWidth / 2,
        canvasY,
        barWidth,
        barHeight
      )
      ctx.stroke()
    }
  }
}
