import {drawXLines} from './x-axis'
import {drawYLines} from './y-axis'

export function draw (ctx, props) {
  ctx.fillStyle = props.backgroundColor
  ctx.fillRect(
    0, 0,
    props.width,
    props.height
  )

  // style lines
  ctx.lineWidth = 1

  drawXLines(ctx, props)
  drawYLines(ctx, props)
}
