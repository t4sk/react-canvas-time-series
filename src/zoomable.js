import React from "react"
import PropTypes from "prop-types"
import canvas from "./canvas"

const DEFAULT_ZOOM_RATE = 0.1

export default function zoomable(Component) {
  function Zoomable(props) {
    const { graph, xMin, xMax, mouse, zoomRate } = props

    function getXRange(e) {
      if (!canvas.math.isInsideRect(graph, mouse)) {
        return {
          xMin,
          xMax,
        }
      }

      const { deltaY } = e

      const x = canvas.math.getX(graph.width, graph.left, xMax, xMin, mouse.x)

      if (deltaY > 0) {
        // zoom out
        return {
          xMin: x - (x - xMin) * (1 + zoomRate),
          xMax: x + (xMax - x) * (1 + zoomRate),
        }
      } else {
        // zoom in
        return {
          xMin: x - (x - xMin) * (1 - zoomRate),
          xMax: x + (xMax - x) * (1 - zoomRate),
        }
      }
    }

    function onWheel(e, mouse) {
      const { xMin, xMax } = getXRange(e)

      props.onWheel(e, mouse, { xMin, xMax })
    }

    return <Component {...props} onWheel={onWheel} />
  }

  Zoomable.propTypes = {
    xMin: PropTypes.number.isRequired,
    xMax: PropTypes.number.isRequired,
    graph: PropTypes.shape({
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
    mouse: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }).isRequired,
    onWheel: PropTypes.func.isRequired,
    zoomRate: PropTypes.number.isRequired,
  }

  Zoomable.defaultProps = {
    zoomRate: DEFAULT_ZOOM_RATE,
    onWheel: () => ({}),
  }

  return Zoomable
}
