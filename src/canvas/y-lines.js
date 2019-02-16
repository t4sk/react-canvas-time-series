import PropTypes from 'prop-types'
import { getCanvasY, stepBelow } from './math'

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  yMin: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  yInterval: PropTypes.number.isRequired,
  lineColor: PropTypes.string.isRequired,
}

const defaultProps = {
  lineColor: 'black',
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
    yInterval,
    lineColor,
  } = setDefaults(props)

  PropTypes.checkPropTypes(propTypes, setDefaults(props), 'prop', 'y-lines')

  ctx.strokeStyle = lineColor
  ctx.lineWidth = 1

  const y0 = stepBelow(yMin, yInterval)

  for (let y = y0; y <= yMax; y += yInterval) {
    if (y < yMin) {
      continue
    }
    
    const canvasY = getCanvasY(height, top, yMax, yMin, y)

    ctx.beginPath()
    ctx.moveTo(left, canvasY)
    ctx.lineTo(left + width, canvasY)
    ctx.stroke()
  }
}
