import PropTypes from 'prop-types'
import { getCanvasX } from './math'

const propTypes = {
  type: PropTypes.oneOf(['xLine']).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  xMin: PropTypes.number.isRequired,
  xMax: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  lineColor: PropTypes.string.isRequired,
}

const defaultProps = {
  lineColor: '',
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
    lineColor,
  } = setDefaults(props)

  PropTypes.checkPropTypes(propTypes, setDefaults(props), 'prop', 'x-line')

  ctx.strokeStyle = lineColor
  ctx.lineWidth = 1

  for (let x of data) {
    const canvasX = getCanvasX(width, left, xMax, xMin, x)

    ctx.beginPath()
    ctx.moveTo(canvasX, top)
    ctx.lineTo(canvasX, top + height)
    ctx.stroke()
  }
}
