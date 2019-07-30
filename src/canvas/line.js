import PropTypes from "prop-types"
import { getCanvasX, getCanvasY } from "./math"

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    })
  ).isRequired,
  step: PropTypes.number.isRequired,
  lineColor: PropTypes.string.isRequired,
}

const defaultProps = {
  lineColor: "",
  step: 1,
  data: [],
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

export function draw(ctx, layout, graph, props) {
  graph = setDefaults(graph)
  PropTypes.checkPropTypes(propTypes, graph, "prop", "line")

  const {
    graph: { top, left, width, height },
  } = layout

  const { data, step, lineColor } = graph

  const { xMin, xMax, yMin, yMax } = props

  ctx.strokeStyle = lineColor
  ctx.lineWidth = 1

  if (step > 0) {
    ctx.beginPath()
    for (let i = 0; i < data.length; i += step) {
      const { x, y } = data[i]

      if (x >= xMin && x <= xMax) {
        ctx.lineTo(
          getCanvasX(width, left, xMax, xMin, x),
          getCanvasY(height, top, yMax, yMin, y)
        )
      }
    }
    ctx.stroke()
  }
}
