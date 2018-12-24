import React from 'react'
import PropTypes from 'prop-types'
import canvas from './canvas'
const { ui, math } = canvas

export default function draggable(Component) {
  return class extends React.Component {
    static propTypes = {
      onMouseMove: PropTypes.func.isRequired,
      onMouseDown: PropTypes.func,
      onMouseUp: PropTypes.func,
      onMouseOut: PropTypes.func,
      xMin: PropTypes.number.isRequired,
      xMax: PropTypes.number.isRequired,
    }

    constructor (props) {
      super(props)

      this.mouse = {
        isDragging: false,
        dragStartCanvasX: undefined,
        dragStartXMin: undefined,
        dragStartXMax: undefined
      }
    }

    getXRange = (mouse, graph) => {
      if (!this.mouse.isDragging) {
        return
      }

      if (!ui.isInsideRect(mouse, graph)) {
        return
      }

      const { dragStartXMin, dragStartXMax } = this.mouse

      const getX = math.toX({
        width: graph.width,
        left: graph.left,
        xMax: dragStartXMax,
        xMin: dragStartXMin,
      })

      const diff = mouse.x - this.mouse.dragStartCanvasX

      return {
        xMin: getX(graph.left - diff),
        xMax: getX(graph.left + graph.width - diff)
      }
    }

    onMouseMove = (e, mouse, graph) => {
      const xRange = this.getXRange(mouse, graph)

      this.props.onMouseMove(e, mouse, graph, xRange)
    }

    onMouseDown = (e, mouse, graph) => {
      if (ui.isInsideRect(mouse, graph)) {
        this.mouse.isDragging = true
        this.mouse.dragStartCanvasX = mouse.x
        this.mouse.dragStartXMin = this.props.xMin
        this.mouse.dragStartXMax = this.props.xMax
      }

      if (this.props.onMouseDown) {
        this.props.onMouseDown(e, mouse)
      }
    }

    onMouseUp = (e, mouse) => {
      this.mouse.isDragging = false
      this.mouse.dragStartCanvasX = undefined
      this.mouse.dragStartXMin = undefined
      this.mouse.dragStartXMax = undefined

      if (this.props.onMouseUp) {
        this.props.onMouseUp(e, mouse)
      }
    }

    onMouseOut = (e, mouse) => {
      this.mouse.isDragging = false
      this.mouse.dragStartCanvasX = undefined
      this.mouse.dragStartXMin = undefined
      this.mouse.dragStartXMax = undefined

      if (this.props.onMouseOut) {
        this.props.onMouseOut(e, mouse)
      }
    }

    render() {
      return (
        <Component
          {...this.props}
          onMouseMove={this.onMouseMove}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onMouseOut={this.onMouseOut}
        />
      )
    }
  }
}
