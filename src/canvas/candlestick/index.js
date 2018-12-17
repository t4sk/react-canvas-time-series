// @flow
import type { Props } from './types'

export function draw (ctx: any, props: Props) {
  const {
    getCanvasX,
    getCanvasY,
    data,
    width,
  } = props

  for (let i = 0; i < data.length; i++) {
    const {
      high,
      low,
      open,
      close,
      timestamp
    } = data[i]

    const canvasX = getCanvasX(timestamp)
    const bodyTop = getCanvasY(Math.max(open, close))
    const bodyBottom = getCanvasY(Math.min(open, close))
    const bodyHeight = Math.max(bodyBottom - bodyTop, 1)

    ctx.fillStyle = props.getColor(data[i])

    // body
    ctx.fillRect(
      canvasX - width / 2,
      bodyTop,
      width,
      bodyHeight
    )

    ctx.strokeStyle = ctx.fillStyle
    ctx.lineWidth = props.wickWidth

    // top wick
    ctx.beginPath()
    ctx.moveTo(canvasX, bodyTop)
    ctx.lineTo(canvasX, getCanvasY(high))

    // bottom wick
    ctx.moveTo(canvasX, bodyTop + bodyHeight)
    ctx.lineTo(canvasX, getCanvasY(low))
    ctx.stroke()
  }
}
