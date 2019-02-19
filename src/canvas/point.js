import PropTypes from "prop-types"
import { getCanvasX, getCanvasY } from "./math"

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  xMin: PropTypes.number.isRequired,
  xMax: PropTypes.number.isRequired,
  yMin: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  x: PropTypes.number,
  y: PropTypes.number,
  color: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
  ambientColor: PropTypes.string.isRequired,
  ambientRadius: PropTypes.number.isRequired,
}

const defaultProps = {
  color: "black",
  radius: 3,
  ambientColor: "rgba(80, 80, 80, 0.3)",
  ambientRadius: 6,
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

export function draw(ctx, props) {
  props = setDefaults(props)

  const {
    top,
    left,
    height,
    width,
    xMin,
    xMax,
    yMin,
    yMax,
    x,
    y,
    color,
    radius,
    ambientColor,
    ambientRadius,
  } = props

  PropTypes.checkPropTypes(propTypes, props, "prop", "point")

  if (x === undefined || y === undefined) {
    return
  }

  const canvasX = getCanvasX(width, left, xMax, xMin, x)
  const canvasY = getCanvasY(height, top, yMax, yMin, y)

  if (ambientRadius > 0) {
    ctx.beginPath()
    ctx.arc(canvasX, canvasY, ambientRadius, 0, 2 * Math.PI, false)
    ctx.fillStyle = ambientColor
    ctx.fill()
  }

  if (radius > 0) {
    ctx.beginPath()
    ctx.arc(canvasX, canvasY, radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = color
    ctx.fill()
  }
}
