import PropTypes from "prop-types"
import { getCanvasX, getCanvasY } from "./math"

const propTypes = {
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  xMin: PropTypes.number.isRequired,
  xMax: PropTypes.number.isRequired,
  yMin: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      open: PropTypes.number.isRequired,
      close: PropTypes.number.isRequired,
      high: PropTypes.number.isRequired,
      low: PropTypes.number.isRequired,
      timestamp: PropTypes.number.isRequired,
    })
  ).isRequired,
  step: PropTypes.number.isRequired,
  getColor: PropTypes.func.isRequired,
  candlestickWidth: PropTypes.number.isRequired,
  lineWidth: PropTypes.number.isRequired,
}

const defaultProps = {
  data: [],
  step: 1,
  getColor: data => "green",
  candlestickWidth: 5,
  lineWidth: 1,
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

export function draw(ctx: any, props: Props) {
  props = setDefaults(props)

  const {
    top,
    left,
    width,
    height,
    xMin,
    xMax,
    yMin,
    yMax,
    data,
    step,
    getColor,
    candlestickWidth,
    lineWidth,
  } = props

  for (let i = 0; i < data.length; i += step) {
    const { high, low, open, close, timestamp } = data[i]

    if (timestamp >= xMin && timestamp <= xMax) {
      const canvasX = getCanvasX(width, left, xMax, xMin, timestamp)
      const bodyTop = getCanvasY(height, top, yMax, yMin, Math.max(open, close))
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
