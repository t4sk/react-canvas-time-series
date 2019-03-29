import PropTypes from "prop-types"

const propTypes = {
  drawLabel: PropTypes.bool.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  font: PropTypes.string.isRequired,
  textPadding: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  drawLine: PropTypes.bool.isRequired,
  lineTop: PropTypes.number.isRequired,
  lineBottom: PropTypes.number.isRequired,
  lineColor: PropTypes.string.isRequired,
}

const defaultProps = {
  drawLabel: true,
  width: 50,
  height: 20,
  backgroundColor: "white",
  font: "",
  color: "black",
  textPadding: 10,
  text: "",
  drawLine: true,
  lineTop: 0,
  lineBottom: 0,
  lineColor: "black",
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

export function draw(ctx, props) {
  props = setDefaults(props)

  const {
    drawLabel,
    top,
    left,
    width,
    height,
    backgroundColor,
    font,
    color,
    textPadding,
    text,
    drawLine,
    lineTop,
    lineBottom,
    lineColor,
  } = props

  PropTypes.checkPropTypes(propTypes, props, "prop", "x-label")

  if (drawLabel) {
    ctx.fillStyle = backgroundColor

    // label box
    ctx.fillRect(left, top, width, height)

    // text
    ctx.font = font
    ctx.fillStyle = color
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    ctx.fillText(text, left + width / 2, top + textPadding)
  }

  if (drawLine) {
    ctx.strokeStyle = lineColor

    ctx.beginPath()
    ctx.moveTo(left + width / 2, lineTop)
    ctx.lineTo(left + width / 2, lineBottom)
    ctx.stroke()
  }
}
