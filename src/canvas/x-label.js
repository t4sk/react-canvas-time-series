import PropTypes from 'prop-types'
import { getCanvasX } from './math'

const propTypes = {
  rect: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  xMin: PropTypes.number.isRequired,
  xMax: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  axisAt: PropTypes.oneOf(['top', 'bottom']).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  font: PropTypes.string.isRequired,
  render: PropTypes.string.isRequired,
  textPadding: PropTypes.number.isRequired,
}

const defaultProps = {
  width: 50,
  height: 20,
  backgroundColor: '',
  font: '',
  color: '',
  render: x => x,
  textPadding: 10,
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

function getTop(props) {
  const {
    axisAt,
    rect,
    height,
  } = props

  if (axisAt == "top") {
    return rect.top + rect.height - height
  }
  else if (axisAt == "bottom") {
    return rect.top
  }
}

function _draw(ctx, props) {
  const {
    rect,
    xMin,
    xMax,
    x,
    width,
    height,
    backgroundColor,
    font,
    color,
    render,
    textPadding,
  } = props

  PropTypes.checkPropTypes(propTypes, setDefaults(props), 'prop', 'x-label')

  const canvasX = getCanvasX(rect.width, rect.left, xMax, xMin, x)
  const top = getTop(props)

  ctx.fillStyle = backgroundColor

  // rect
  ctx.fillRect(
    canvasX - width / 2,
    top,
    width,
    height,
  )

  // text
  ctx.font = font
  ctx.fillStyle = color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.fillText(
    render(x),
    canvasX,
    top + textPadding,
  )
}

export function draw(ctx, props) {
  _draw(ctx, setDefaults(props))
}
