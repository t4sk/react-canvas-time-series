import PropTypes from 'prop-types'

const propTypes = {
  canvasX: PropTypes.number.isRequired,
  canvasY: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  font: PropTypes.string.isRequired,
}

const defaultProps = {
  color: 'black',
  font: '12px Arial',
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

export function draw(ctx, props) {
  const {
    canvasX,
    canvasY,
    color,
    font,
    text,
  } = setDefaults(props)

  PropTypes.checkPropTypes(propTypes, setDefaults(props), 'prop', 'text')

  ctx.textBaseline = "top"
  ctx.textAlign = "left"

  ctx.font = font
  ctx.fillStyle = color

  ctx.fillText(`${text}`, canvasX, canvasY)
}
