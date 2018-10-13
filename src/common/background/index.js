// @flow
import type { Props } from './types'
import { drawXLines } from './x-axis'
import { drawYLines } from './y-axis'

// TODO namespace background props
// TODO fix lien width
// TODO optional x axis
// TODO optiona x lines
// TODO optional y axis
// TODO optional y lines
// TODO round

export function draw (ctx: any, props: Props) {
  ctx.fillStyle = props.background.backgroundColor
  ctx.fillRect(
    0, 0,
    props.canvas.width,
    props.canvas.height
  )

  drawXLines(ctx, props)
  drawYLines(ctx, props)
}
