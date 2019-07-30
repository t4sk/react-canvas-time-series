import PropTypes from "prop-types"
import { getCanvasY } from "./math"

const propTypes = {
  y: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  font: PropTypes.string.isRequired,
  textPadding: PropTypes.number.isRequired,
  render: PropTypes.func.isRequired,
  drawLine: PropTypes.bool.isRequired,
  lineWidth: PropTypes.number.isRequired,
  lineColor: PropTypes.string.isRequired,
}

const defaultProps = {
  width: 50,
  height: 20,
  backgroundColor: "white",
  font: "",
  color: "black",
  textPadding: 10,
  render: () => "",
  drawLine: true,
  lineColor: "black",
  lineWidth: 1,
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

function getLeft(label, layout, props) {
  const { graph } = layout
  const { yAxisAt, yTickLength } = props

  if (yAxisAt == "left") {
    return graph.left - label.width - yTickLength
  }
  if (yAxisAt == "right") {
    return graph.left + graph.width + yTickLength
  }

  return 0
}

function getTextAlign(props) {
  const { yAxisAt } = props

  switch (yAxisAt) {
    case "left":
      return "right"
    case "right":
      return "left"
    default:
      console.error(`invalid yAxisAt ${yAxisAt}`)
  }
}

function getTextLeft(left, label, props) {
  const { yAxisAt } = props
  const { textPadding, width } = label

  switch (yAxisAt) {
    case "left":
      return left + width - textPadding
    case "right":
      return left + textPadding
    default:
      console.error(`invalid yAxisAt ${yAxisAt}`)
  }
}

function getLineStart(label, layout, props) {
  const { graph } = layout
  const { yAxisAt, yTickLength } = props

  if (yAxisAt == "left") {
    return graph.left - yTickLength
  }
  if (yAxisAt == "right") {
    return graph.left + graph.width + yTickLength
  }

  return 0
}

function getLineEnd(label, layout, props) {
  const { graph } = layout
  const { yAxisAt } = props

  if (yAxisAt == "left") {
    return graph.left + graph.width
  }
  if (yAxisAt == "right") {
    return graph.left
  }

  return 0
}

export function draw(ctx, layout, label, props) {
  label = setDefaults(label)
  PropTypes.checkPropTypes(propTypes, label, "prop", "y-label")

  const {
    y,
    width,
    height,
    backgroundColor,
    font,
    color,
    textPadding,
    render,
    drawLine,
    lineWidth,
    lineColor,
  } = label

  const { graph } = layout

  const { yMin, yMax } = props

  if (y == undefined) {
    return
  }

  const canvasY = getCanvasY(graph.height, graph.top, yMax, yMin, y)
  const top = canvasY - Math.round(height / 2)
  const left = getLeft(label, layout, props)

  ctx.fillStyle = backgroundColor

  // label box
  ctx.fillRect(left, top, width, height)

  // text
  ctx.font = font
  ctx.fillStyle = color
  ctx.textAlign = getTextAlign(props)
  ctx.textBaseline = "middle"

  ctx.fillText(render(y), getTextLeft(left, label, props), top + textPadding)

  if (drawLine) {
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor

    const lineStart = getLineStart(label, layout, props)
    const lineEnd = getLineEnd(label, layout, props)

    ctx.beginPath()
    ctx.moveTo(lineStart, top + height / 2)
    ctx.lineTo(lineEnd, top + height / 2)
    ctx.stroke()
  }
}
