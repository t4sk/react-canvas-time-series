import PropTypes from "prop-types"

const propTypes = {
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  font: PropTypes.string.isRequired,
}

const defaultProps = {
  color: "black",
  font: "12px Arial",
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

export function draw(ctx, props) {
  props = setDefaults(props)

  const { left, top, color, font, text } = props

  PropTypes.checkPropTypes(propTypes, props, "prop", "text")

  ctx.textBaseline = "top"
  ctx.textAlign = "left"

  ctx.font = font
  ctx.fillStyle = color

  ctx.fillText(`${text}`, left, top)
}
