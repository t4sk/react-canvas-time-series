// @flow
import { toCanvasX, toCanvasY } from '../math'
import type { Props } from './types'
import { getGraphDimensions } from '../background/util'

export function draw (ctx: any, props: Props) {
  const {
    xMin,
    xMax,
    yMin,
    yMax,
    data,
    candlestickWidth,
  } = props

  const graph = getGraphDimensions(props)

  const getCanvasX = toCanvasX({
    width: graph.width,
    left: graph.left,
    xMax,
    xMin,
  })

  const getCanvasY = toCanvasY({
    height: graph.height,
    top: graph.top,
    yMax,
    yMin,
  })

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

    ctx.fillStyle = props.getCandlestickColor(data[i])

    // body
    ctx.fillRect(
      canvasX - candlestickWidth / 2,
      bodyTop,
      candlestickWidth,
      bodyHeight
    )

    ctx.strokeStyle = ctx.fillStyle
    ctx.lineWidth = props.candlestickWickWidth

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
