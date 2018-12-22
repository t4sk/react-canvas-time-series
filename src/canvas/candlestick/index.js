// @flow
import type { Props } from './types'

export function draw (ctx: any, props: Props) {
  const {
    getCanvasX,
    getCanvasY,
    candlestick,
  } = props

  const { data } = candlestick

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

    ctx.fillStyle = props.candlestick.getColor(data[i])

    // body
    ctx.fillRect(
      canvasX - candlestick.width / 2,
      bodyTop,
      candlestick.width,
      bodyHeight
    )

    ctx.strokeStyle = ctx.fillStyle
    ctx.lineWidth = props.candlestick.wickWidth

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
