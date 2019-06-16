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
  data: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  color: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
  ambientColor: PropTypes.string.isRequired,
  ambientRadius: PropTypes.number.isRequired,
}

const defaultProps = {
  color: "black",
  radius: 2,
  ambientColor: "rgba(80, 80, 80, 0.3)",
  ambientRadius: 0,
  data: [],
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

export function drawPoint(ctx, props, point) {
  const {
    top,
    left,
    height,
    width,
    xMin,
    xMax,
    yMin,
    yMax,
    color,
    radius,
    ambientColor,
    ambientRadius,
  } = props

  const { x, y } = point

  PropTypes.checkPropTypes(propTypes, props, "prop", "points")

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

export function draw(ctx, props) {
  props = setDefaults(props)

  const { data } = props

  PropTypes.checkPropTypes(propTypes, props, "prop", "points")

  for (let point of data) {
    drawPoint(ctx, props, point)
  }
}
