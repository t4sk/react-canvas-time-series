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
  getBarColor: PropTypes.func.isRequired,
  barWidth: PropTypes.number.isRequired,
}

const defaultProps = {
  step: 1,
  getBarColor: () => "",
  barWidth: 1,
}

function setDefaults(props) {
  return {
    ...defaultProps,
    ...props,
  }
}

export function draw(ctx, layout, graph, props) {
  graph = setDefaults(graph)
  PropTypes.checkPropTypes(propTypes, graph, "prop", "bars")

  const {
    graph: { top, left, width, height },
  } = layout

  const { data, step, getBarColor, barWidth } = graph
  const { xMin, xMax, yMin, yMax } = props

  const canvasY0 = getCanvasY(height, top, yMax, yMin, yMin)

  if (step > 0) {
    for (let i = 0; i < data.length; i += step) {
      const d = data[i]
      const { x, y } = d

      if (x >= xMin && x <= xMax) {
        const canvasX = getCanvasX(width, left, xMax, xMin, x)
        const canvasY = getCanvasY(height, top, yMax, yMin, y)

        const barHeight = canvasY0 - canvasY

        ctx.fillStyle = getBarColor(d)
        ctx.fillRect(
          canvasX - barWidth / 2,
          canvasY,
          barWidth,
          Math.max(0, barHeight - 1)
        )
      }
    }
  }
}
