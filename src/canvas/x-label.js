import PropTypes from "prop-types"
import { getCanvasX } from "./math"

const propTypes = {
  x: PropTypes.number,
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
  lineWidth: 1,
  lineColor: "black",
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

function getTop(label, layout, props) {
  const { graph } = layout
  const { xAxisAt, xTickLength } = props

  if (xAxisAt == "top") {
    return graph.top - label.height - xTickLength
  }
  if (xAxisAt == "bottom") {
    return graph.top + graph.height + xTickLength
  }

  return 0
}

function getLineStart(label, layout, props) {
  const { graph } = layout
  const { xAxisAt, xTickLength } = props

  if (xAxisAt == "top") {
    return graph.top - xTickLength
  }
  if (xAxisAt == "bottom") {
    return graph.top + graph.height + xTickLength
  }

  return 0
}

function getLineEnd(label, layout, props) {
  const { graph } = layout
  const { xAxisAt } = props

  if (xAxisAt == "top") {
    return graph.top + graph.height
  }
  if (xAxisAt == "bottom") {
    return graph.top
  }

  return 0
}

export function draw(ctx, layout, label, props) {
  label = setDefaults(label)
  PropTypes.checkPropTypes(propTypes, label, "prop", "x-label")

  const {
    x,
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

  const { xMin, xMax } = props

  if (x == undefined) {
    return
  }

  const canvasX = getCanvasX(graph.width, graph.left, xMax, xMin, x)
  const left = canvasX - Math.round(width / 2)
  const top = getTop(label, layout, props)

  // label box
  ctx.fillStyle = backgroundColor
  ctx.fillRect(left, top, width, height)

  // text
  ctx.font = font
  ctx.fillStyle = color
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  ctx.fillText(render(x), left + width / 2, top + textPadding)

  if (drawLine) {
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = lineColor

    const lineStart = getLineStart(label, layout, props)
    const lineEnd = getLineEnd(label, layout, props)

    ctx.beginPath()
    ctx.moveTo(left + width / 2, lineStart)
    ctx.lineTo(left + width / 2, lineEnd)
    ctx.stroke()
  }
}
