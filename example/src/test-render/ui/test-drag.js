import React, { Component } from 'react'
import {canvas, GraphCanvas} from 'react-canvas-graph'
import { rand } from '../../util'
const { background, ui, line, math } = canvas
const { linear, round, findIndexOfNearestData } = math

class TestDrag extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xMin: 1900,
      xMax: 2010,
    }

    this.mouse = {
      isDragging: false,
      dragStartLeft: undefined,
      dragStartXMin: undefined,
      dragStartXMax: undefined
    }
  }

  onMouseMove = (e, mouse) => {
    if (!this.mouse.isDragging) {
      return
    }

    if (!ui.isInsideRect(mouse, this.props.ui.graph)) {
      return
    }

    const graph = this.props.ui.graph

    const { dragStartXMin, dragStartXMax } = this.mouse

    const toX = linear({
      dy: dragStartXMax - dragStartXMin,
      dx: graph.width,
      y0: dragStartXMin - (dragStartXMax - dragStartXMin) / graph.width * graph.left
    })

    const diff = mouse.x - this.mouse.dragStartLeft

    const xMin = toX(graph.left - diff)
    const xMax = toX(graph.left + graph.width - diff)

    this.setState((state) => ({
      xMin,
      xMax
    }))
  }

  onMouseDown = (e, mouse) => {
    if (ui.isInsideRect(mouse, this.props.ui.graph)) {
      this.mouse.isDragging = true
      this.mouse.dragStartLeft = mouse.x
      this.mouse.dragStartXMin = this.state.xMin
      this.mouse.dragStartXMax = this.state.xMax
    }
  }

  onMouseUp = (e, mouse) => {
    this.mouse.isDragging = false
    this.mouse.dragStartLeft = undefined
    this.mouse.dragStartXMin = undefined
    this.mouse.dragStartXMax = undefined
  }

  onMouseOut = (e, mouse) => {
    this.mouse.isDragging = false
    this.mouse.dragStartLeft = undefined
    this.mouse.dragStartXMin = undefined
    this.mouse.dragStartXMax = undefined
  }

  render () {
    return (
      <GraphCanvas
        canvas={this.props.canvas}
        drawBackground={(ctx) => {
          canvas.fill(ctx, this.props.canvas)
          background.draw(ctx, {
            ...this.props.background,
            xMin: this.state.xMin,
            xMax: this.state.xMax,
          })
        }}
        drawUI={(ctx, mouse) => {
          ui.draw(ctx, {
            ...this.props.ui,
            mouse,
          })
        }}
        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseOut={this.onMouseOut}
      />
    )
  }
}

TestDrag.defaultProps = {
}

export default TestDrag
