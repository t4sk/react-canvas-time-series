// @flow
import type { Props } from './types'
import { drawXLines } from './x-lines'
import { drawYLines } from './y-lines'

// TODO? render x, y labels on both side
export function draw (ctx: any, props) {
  ctx.fillStyle = props.backgroundColor
  ctx.fillRect(
    props.left,
    props.top,
    props.width,
    props.height,
  )

  drawXLines(ctx, props)
  drawYLines(ctx, props)
}
