import PropTypes from 'prop-types'
import { getCanvasX, getCanvasY } from './math'

const propTypes = {
  type: PropTypes.oneOf(['yLine']).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  yMin: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
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
    yMin,
    yMax,
    data,
    lineColor,
  } = setDefaults(props)

  PropTypes.checkPropTypes(propTypes, setDefaults(props), 'prop', 'y-line')

  ctx.strokeStyle = lineColor
  ctx.lineWidth = 1

  for (let y of data) {
    const canvasY = getCanvasY(height, top, yMax, yMin, y)

    ctx.beginPath()
    ctx.moveTo(left, canvasY)
    ctx.lineTo(left + width, canvasY)
    ctx.stroke()
  }
}
