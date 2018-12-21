// @flow
import type { Props } from './types'
import { drawXLines } from './x-lines'
import { drawYLines } from './y-lines'

export function draw (ctx: any, props, internalProps) {
  ctx.fillStyle = props.background.color
  ctx.fillRect(0, 0, props.width, props.height)

  drawXLines(ctx, props, internalProps)
  drawYLines(ctx, props, internalProps)
}
