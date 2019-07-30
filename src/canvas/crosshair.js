import PropTypes from "prop-types"
import { isInside } from "./math"

const propTypes = {
  canvasX: PropTypes.number,
  canvasY: PropTypes.number,
  xLineColor: PropTypes.string.isRequired,
  xLineWidth: PropTypes.number.isRequired,
  yLineColor: PropTypes.string.isRequired,
  yLineWidth: PropTypes.number.isRequired,
}

const defaultProps = {
  xLineColor: "",
  xLineWidth: 0.5,
  yLineColor: "",
  yLineWidth: 0.5,
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

export function draw(ctx, layout, props) {
  props = setDefaults(props)
  PropTypes.checkPropTypes(propTypes, props, "prop", "crosshair")

  const {
    graph: { width, height, left, top },
  } = layout

  const {
    canvasX,
    canvasY,
    xLineColor,
    xLineWidth,
    yLineColor,
    yLineWidth,
  } = props

  if (!isInside({ top, left, width, height }, { x: canvasX, y: canvasY })) {
    return
  }

  // x line
  ctx.strokeStyle = xLineColor
  ctx.lineWidth = xLineWidth

  ctx.beginPath()
  ctx.moveTo(canvasX, top)
  ctx.lineTo(canvasX, top + height)
  ctx.stroke()

  // y line
  ctx.strokeStyle = yLineColor
  ctx.lineWidth = yLineWidth

  ctx.beginPath()
  ctx.moveTo(left, canvasY)
  ctx.lineTo(left + width, canvasY)
  ctx.stroke()
}
