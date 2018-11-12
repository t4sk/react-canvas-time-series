// @flow
import type { Props } from './types'
import { drawXLines } from './x-axis'
import { drawYLines } from './y-axis'

export function fillCanvas(ctx: any, props: Prop) {
  ctx.fillStyle = props.canvas.backgroundColor
  ctx.fillRect(
    0, 0,
    props.canvas.width,
    props.canvas.height,
  )
}

export function draw (ctx: any, props: Props) {
  ctx.fillStyle = props.background.backgroundColor
  ctx.fillRect(
    props.background.left,
    props.background.top,
    props.background.width,
    props.background.height
  )

  drawXLines(ctx, props)
  drawYLines(ctx, props)
}
