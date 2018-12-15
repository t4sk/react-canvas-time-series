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

  ctx.strokeStyle = props.lineColor
  ctx.lineWidth = props.lineWidth

  ctx.beginPath()
  for (let i = 0; i < data.length; i++) {
    ctx.lineTo(getCanvasX(data[i].x), getCanvasY(data[i].y))
  }
  ctx.stroke()
}
