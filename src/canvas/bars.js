import PropTypes from 'prop-types'
import { getCanvasX, getCanvasY } from './math'

const propTypes = {
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
  getBarColor: PropTypes.func.isRequired,
  barWidth: PropTypes.number.isRequired,
}

const defaultProps = {
  getBarColor: () => '',
  barWidth: 1,
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props
  }
}

export function draw (ctx, props) {
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
    getBarColor,
    barWidth,
  } = setDefaults(props)

  PropTypes.checkPropTypes(propTypes, setDefaults(props), 'prop', 'bar')

  const canvasY0 = getCanvasY(height, top, yMax, yMin, yMin)

  for (let d of data) {
    const { x, y } = d

    const canvasX = getCanvasX(width, left, xMax, xMin, x)
    const canvasY = getCanvasY(height, top, yMax, yMin, y)

    const barHeight = canvasY0 - canvasY

    ctx.fillStyle = getBarColor(d)
    ctx.fillRect(
      canvasX - barWidth / 2,
      canvasY,
      barWidth,
      Math.max(0, barHeight - 1),
    )
  }
}