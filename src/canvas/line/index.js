// @flow
import type { Props } from './types'

export function draw (ctx: any, props: Props) {
  const {
    getCanvasX,
    getCanvasY,
    line
  } = props

  const { data } = line

  ctx.strokeStyle = line.color
  ctx.lineWidth = line.width

  ctx.beginPath()
  for (let i = 0; i < data.length; i++) {
    ctx.lineTo(getCanvasX(data[i].x), getCanvasY(data[i].y))
  }
  ctx.stroke()
}
