import PropTypes from 'prop-types'
import { getCanvasY } from './math'

const propTypes = {
  rect: PropTypes.shape({
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  yMin: PropTypes.number.isRequired,
  yMax: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  axisAt: PropTypes.oneOf(['left', 'right']).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  font: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  textPadding: PropTypes.number.isRequired,
}

const defaultProps = {
  width: 50,
  height: 20,
  backgroundColor: '',
  font: '',
  color: '',
  text: '',
  textPadding: 10,
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

function getLeft(props) {
  const {
    axisAt,
    rect,
    width,
  } = props

  if (axisAt == "left") {
    return rect.left + rect.width - width
  }
  else if (axisAt == "right") {
    return rect.left
  }
  else {
    throw new Error(`invalid axisAt ${axisAt}`)
  }
}

function getTextAlign(props) {
  const {
    axisAt,
  } = props

  if (axisAt == "left") {
    return "right"
  }
  else if (axisAt == "right") {
    return "left"
  }
  else {
    throw new Error(`invalid axisAt ${axisAt}`)
  }
}

function getTextLeft(props) {
  const {
    axisAt,
    rect,
    textPadding
  } = props

  const left = getLeft(props)

  if (axisAt == "left") {
    return rect.left + rect.width - textPadding
  }
  else if (axisAt == "right") {
    return rect.left + textPadding
  }
  else {
    throw new Error(`invalid axisAt ${axisAt}`)
  }
}

function _draw(ctx, props) {
  const {
    rect,
    yMin,
    yMax,
    y,
    width,
    height,
    backgroundColor,
    font,
    color,
    text,
    textPadding,
  } = props

  PropTypes.checkPropTypes(propTypes, setDefaults(props), 'prop', 'y-label')

  const left = getLeft(props)
  const canvasY = getCanvasY(rect.height, rect.top, yMax, yMin, y)

  ctx.fillStyle = backgroundColor

  // rect
  ctx.fillRect(
    left,
    canvasY - height / 2,
    width,
    height,
  )

  // text
  ctx.font = font
  ctx.fillStyle = color
  ctx.textAlign = getTextAlign(props)
  ctx.textBaseline = 'middle'

  ctx.fillText(
    text,
    getTextLeft(props),
    canvasY,
  )
}

export function draw(ctx, props) {
  _draw(ctx, setDefaults(props))
}
