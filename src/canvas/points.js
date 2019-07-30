import PropTypes from "prop-types"
import { getCanvasX, getCanvasY } from "./math"

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    })
  ).isRequired,
  color: PropTypes.string.isRequired,
  radius: PropTypes.number.isRequired,
  ambientColor: PropTypes.string.isRequired,
  ambientRadius: PropTypes.number.isRequired,
}

const defaultProps = {
  color: "black",
  radius: 2,
  ambientColor: "rgba(80, 80, 80, 0.3)",
  ambientRadius: 0,
  data: [],
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

export function drawPoint(ctx, layout, graph, point, props) {
  const {
    graph: { top, left, width, height },
  } = layout

  const { color, radius, ambientColor, ambientRadius } = graph
  const { xMin, xMax, yMin, yMax } = props
  const { x, y } = point

  if (x === undefined || y === undefined) {
    return
  }

  const canvasX = getCanvasX(width, left, xMax, xMin, x)
  const canvasY = getCanvasY(height, top, yMax, yMin, y)

  if (ambientRadius > 0) {
    ctx.beginPath()
    ctx.arc(canvasX, canvasY, ambientRadius, 0, 2 * Math.PI, false)
    ctx.fillStyle = ambientColor
    ctx.fill()
  }

  if (radius > 0) {
    ctx.beginPath()
    ctx.arc(canvasX, canvasY, radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = color
    ctx.fill()
  }
}

export function draw(ctx, layout, graph, props) {
  graph = setDefaults(graph)
  PropTypes.checkPropTypes(propTypes, graph, "prop", "points")

  const { data } = graph

  for (let point of data) {
    drawPoint(ctx, layout, graph, point, props)
  }
}
