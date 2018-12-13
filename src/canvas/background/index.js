// @flow
import type { Props } from './types'
import { drawXLines } from './x-lines'
import { drawYLines } from './y-lines'

export function draw (ctx: any, props) {
  ctx.fillStyle = props.backgroundColor
  ctx.fillRect(0, 0, props.width, props.height)

  drawXLines(ctx, props)
  drawYLines(ctx, props)
}
