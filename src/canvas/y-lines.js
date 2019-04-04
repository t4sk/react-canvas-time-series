import PropTypes from "prop-types"
import { getCanvasY, stepBelow } from "./math"

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  yMin: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  yInterval: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  lineColor: PropTypes.string.isRequired,
}

const defaultProps = {
  lineColor: "black",
  data: [],
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

function drawYLine(ctx, props) {
  const { left, top, width, height, yMax, yMin, y } = props

  const canvasY = getCanvasY(height, top, yMax, yMin, y)

  ctx.beginPath()
  ctx.moveTo(left, canvasY)
  ctx.lineTo(left + width, canvasY)
  ctx.stroke()
}

export function draw(ctx, props) {
  props = setDefaults(props)

  const {
    top,
    left,
    width,
    height,
    yMin,
    yMax,
    yInterval,
    data,
    lineColor,
  } = props

  PropTypes.checkPropTypes(propTypes, props, "prop", "y-lines")

  ctx.strokeStyle = lineColor
  ctx.lineWidth = 1

  const y0 = stepBelow(yMin, yInterval)

  for (let y = y0; y <= yMax; y += yInterval) {
    if (y < yMin) {
      continue
    }

    drawYLine(ctx, {
      left,
      top,
      width,
      height,
      yMax,
      yMin,
      y,
    })
  }

  for (let y of data) {
    if (y < yMin || y > yMax) {
      continue
    }

    drawYLine(ctx, {
      left,
      top,
      width,
      height,
      yMax,
      yMin,
      y,
    })
  }
}
