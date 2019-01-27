import PropTypes from 'prop-types'
import { getCanvasX, getCanvasY } from './math'

const propTypes = {
  type: PropTypes.oneOf(['line']).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  xMin: PropTypes.number.isRequired,
  xMax: PropTypes.number.isRequired,
  yMin: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })).isRequired,
  step: PropTypes.number.isRequired,
  lineColor: PropTypes.string.isRequired,
}

const defaultProps = {
  lineColor: '',
  step: 1
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
    yMin,
    yMax,
    data,
    lineColor,
    step,
  } = setDefaults(props)

  PropTypes.checkPropTypes(propTypes, setDefaults(props), 'prop', 'line')

  ctx.strokeStyle = lineColor
  ctx.lineWidth = 1

  ctx.beginPath()
  for (let i = 0; i < data.length; i += step) {
    const { x, y } = data[i]
    
    ctx.lineTo(
      getCanvasX(width, left, xMax, xMin, x),
      getCanvasY(height, top, yMax, yMin, y)
    )
  }
  ctx.stroke()
}
