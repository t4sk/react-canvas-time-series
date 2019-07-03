import React, { useState } from "react"
import PropTypes from "prop-types"
import canvas from "./canvas"

export default function draggable(Component) {
  function Draggable(props) {
    const [state, setState] = useState({
      dragging: false,
    })

    function getXRange(mouse) {
      if (!canvas.math.isInsideRect(props.ui, mouse) || !state.dragging) {
        return {
          xMin: props.xMin,
          xMax: props.xMax,
        }
      }

      const diff = mouse.x - props.mouse.x

      const xMin = canvas.math.getX(
        props.ui.width,
        props.ui.left,
        props.xMax,
        props.xMin,
        props.ui.left - diff
      )

      const xMax = canvas.math.getX(
        props.ui.width,
        props.ui.left,
        props.xMax,
        props.xMin,
        props.ui.width + props.ui.left - diff
      )

      return {
        xMin,
        xMax,
      }
    }

    function onMouseMove(e, mouse) {
      const { xMin, xMax } = getXRange(mouse)

      props.onMouseMove(e, mouse, { xMin, xMax })
    }

    function onMouseDown(e, mouse) {
      if (canvas.math.isInsideRect(props.ui, mouse)) {
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
    ui: PropTypes.shape({
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
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
    onMouseMove: () => ({}),
    onMouseDown: () => ({}),
    onMouseUp: () => ({}),
    onMouseOut: () => ({}),
  }

  return Draggable
}
