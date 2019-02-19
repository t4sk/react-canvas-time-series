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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })
  ).isRequired,
  lineColor: PropTypes.string.isRequired,
}

const defaultProps = {
  lineColor: "",
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
    width,
    height,
    xMin,
    xMax,
    yMin,
    yMax,
    data,
    lineColor,
  } = props

  PropTypes.checkPropTypes(propTypes, props, "prop", "line")

  ctx.strokeStyle = lineColor
  ctx.lineWidth = 1

  ctx.beginPath()
  for (let i = 0; i < data.length; i++) {
    const { x, y } = data[i]

    ctx.lineTo(
      getCanvasX(width, left, xMax, xMin, x),
      getCanvasY(height, top, yMax, yMin, y)
    )
  }
  ctx.stroke()
}
