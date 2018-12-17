// @flow
import type { Props } from './types'
import { getGraphDimensions } from './util'
import { drawXLines } from './x-lines'
import { drawYLines } from './y-lines'

export function draw (ctx: any, props) {
  ctx.fillStyle = props.color
  ctx.fillRect(0, 0, props.width, props.height)

  const graph = getGraphDimensions(props)

  drawXLines(ctx, graph, props)
  drawYLines(ctx, graph, props)
}
