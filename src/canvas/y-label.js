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
  textAlign: PropTypes.oneOf(["left", "right"]).isRequired,
  drawLine: PropTypes.bool.isRequired,
  lineLeft: PropTypes.number.isRequired,
  lineRight: PropTypes.number.isRequired,
  lineWidth: PropTypes.number.isRequired,
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
  textAlign: "left",
  drawLine: true,
  lineLeft: 0,
  lineRight: 0,
  lineColor: "black",
  lineWidth: 1,
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

function getTextLeft(props) {
  const { textAlign, left, textPadding } = props

  switch (textAlign) {
    case "left":
      return left + textPadding
    case "right":
      return left - textPadding
    default:
      throw new Error(`invalid axisAt ${axisAt}`)
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
    textAlign,
    drawLine,
    lineLeft,
    lineRight,
    lineWidth,
    lineColor,
  } = props

  PropTypes.checkPropTypes(propTypes, props, "prop", "y-label")

  if (drawLabel) {
    ctx.fillStyle = backgroundColor

    // label box
    ctx.fillRect(left, top, width, height)

    // text
    ctx.font = font
    ctx.fillStyle = color
    ctx.textAlign = textAlign
    ctx.textBaseline = "middle"

    ctx.fillText(text, getTextLeft(props), top + textPadding)
  }

  if (drawLine) {
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor

    ctx.beginPath()
    ctx.moveTo(lineLeft, top + height / 2)
    ctx.lineTo(lineRight, top + height / 2)
    ctx.stroke()
  }
}
