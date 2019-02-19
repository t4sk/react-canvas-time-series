import PropTypes from "prop-types"
import { getCanvasX, stepBelow } from "./math"

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  xMin: PropTypes.number.isRequired,
  xMax: PropTypes.number.isRequired,
  xInterval: PropTypes.number,
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

export function draw(ctx, props) {
  const {
    top,
    left,
    width,
    height,
    xMin,
    xMax,
    data,
    xInterval,
    lineColor,
  } = setDefaults(props)

  PropTypes.checkPropTypes(propTypes, setDefaults(props), "prop", "x-lines")

  ctx.strokeStyle = lineColor
  ctx.lineWidth = 1

  if (xInterval) {
    const x0 = stepBelow(xMin, xInterval)

    for (let x = x0; x <= xMax; x += xInterval) {
      if (x < xMin) {
        continue
      }

      const canvasX = getCanvasX(width, left, xMax, xMin, x)

      ctx.beginPath()
      ctx.moveTo(canvasX, top)
      ctx.lineTo(canvasX, top + height)
      ctx.stroke()
    }
  }

  for (let x of data) {
    if (x < xMin || x > xMax) {
      continue
    }

    const canvasX = getCanvasX(width, left, xMax, xMin, x)

    ctx.beginPath()
    ctx.moveTo(canvasX, top)
    ctx.lineTo(canvasX, top + height)
    ctx.stroke()
  }
}
