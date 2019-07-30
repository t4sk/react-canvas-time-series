import React, { useState } from "react"
import PropTypes from "prop-types"
import canvas from "./canvas"

export default function draggable(Component) {
  function Draggable(props) {
    const [state, setState] = useState({
      dragging: false,
    })

    function getXRange(mouse, graph) {
      if (!canvas.math.isInside(graph, mouse) || !state.dragging) {
        return {
          xMin: props.xMin,
          xMax: props.xMax,
        }
      }

      const diff = mouse.x - props.mouse.x

      const xMin = canvas.math.getX(
        graph.width,
        graph.left,
        props.xMax,
        props.xMin,
        graph.left - diff
      )

      const xMax = canvas.math.getX(
        graph.width,
        graph.left,
        props.xMax,
        props.xMin,
        graph.width + graph.left - diff
      )

      return {
        xMin,
        xMax,
      }
    }

    function onMouseMove(e, mouse, layout) {
      const { xMin, xMax } = getXRange(mouse, layout.graph)

      props.onMouseMove(e, mouse, layout, { xMin, xMax })
    }

    function onMouseDown(e, mouse, layout) {
      if (canvas.math.isInside(layout.graph, mouse)) {
        setState({ dragging: true })
      }

      props.onMouseDown(e, mouse)
    }

    function onMouseUp(e, mouse) {
      setState({ dragging: false })

      props.onMouseUp(e, mouse)
    }

    function onMouseOut() {
      setState({ dragging: false })

      props.onMouseOut()
    }

    return (
      <Component
        {...props}
        onMouseMove={onMouseMove}
        onMouseOut={onMouseOut}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />
    )
  }

  Draggable.propTypes = {
    xMin: PropTypes.number.isRequired,
    xMax: PropTypes.number.isRequired,
    mouse: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }).isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired,
    onMouseOut: PropTypes.func.isRequired,
  }

  Draggable.defaultProps = {
    onMouseMove: () => {},
    onMouseDown: () => {},
    onMouseUp: () => {},
    onMouseOut: () => {},
  }

  return Draggable
}
