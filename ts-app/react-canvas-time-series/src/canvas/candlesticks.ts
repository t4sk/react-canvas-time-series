import { CanvasContext, Layout } from "./types"
import { getCanvasX, getCanvasY } from "./math"

interface Candlestick {
  open: number
  close: number
  high: number
  low: number
  timestamp: number
}

interface Graph {
  data: Candlestick[]
  step: number
  getColor: (candlestick: Candlestick) => string
  candlestickWidth: number
  lineWidth: number
}

const defaultProps = {
  data: [],
  step: 1,
  getColor: (data: Candlestick) => "green",
  candlestickWidth: 5,
  lineWidth: 1,
}

function setDefaults(props: Graph): Graph {
  return {
    ...defaultProps,
    ...props,
  }
}

interface Props {
  xMin: number
  xMax: number
  yMin: number
  yMax: number
}

export function draw(
  ctx: CanvasContext,
  layout: Layout,
  graph: Graph,
  props: Props
) {
  graph = setDefaults(graph)

  const {
    graph: { top, left, width, height },
  } = layout

  const { data, step, getColor, candlestickWidth, lineWidth } = graph
  const { xMin, xMax, yMin, yMax } = props

  if (step > 0) {
    for (let i = 0; i < data.length; i += step) {
      const { high, low, open, close, timestamp } = data[i]

      if (timestamp >= xMin && timestamp <= xMax) {
        const canvasX = getCanvasX(width, left, xMax, xMin, timestamp)
        const bodyTop = getCanvasY(
          height,
          top,
          yMax,
          yMin,
          Math.max(open, close)
        )
        const bodyBottom = getCanvasY(
          height,
          top,
          yMax,
          yMin,
          Math.min(open, close)
        )
        const bodyHeight = Math.max(bodyBottom - bodyTop, 1)

        ctx.fillStyle = getColor(data[i])

        // body
        ctx.fillRect(
          canvasX - candlestickWidth / 2,
          bodyTop,
          candlestickWidth,
          bodyHeight
        )

        ctx.strokeStyle = ctx.fillStyle
        ctx.lineWidth = lineWidth

        // top wick
        ctx.beginPath()
        ctx.moveTo(canvasX, bodyTop)
        ctx.lineTo(canvasX, getCanvasY(height, top, yMax, yMin, high))

        // bottom wick
        ctx.moveTo(canvasX, bodyTop + bodyHeight)
        ctx.lineTo(canvasX, getCanvasY(height, top, yMax, yMin, low))
        ctx.stroke()
      }
    }
  }
}
