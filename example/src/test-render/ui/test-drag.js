import React, { Component } from 'react'
import {canvas, GraphCanvas} from 'react-canvas-time-series'
import { rand } from '../../util'
const { background, ui, math } = canvas
const { toX } = math

class TestDrag extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xMin: 0,
      xMax: 1000,
    }

    this.mouse = {
      isDragging: false,
      dragStartCanvasX: undefined,
      dragStartXMin: undefined,
      dragStartXMax: undefined
    }
  }

  onMouseMove = (e, mouse) => {
    if (!this.mouse.isDragging) {
      return
    }

    // TODO where to get graph from?
    const graph = {
      top: 0,
      left: 50,
      height: 250,
      width: 450
    }

    if (!ui.isInsideRect(mouse, graph)) {
      return
    }


    const { dragStartXMin, dragStartXMax } = this.mouse

    const getX = toX({
      width: graph.width,
      left: graph.left,
      xMax: dragStartXMax,
      xMin: dragStartXMin,
    })

    const diff = mouse.x - this.mouse.dragStartCanvasX

    const xMin = getX(graph.left - diff)
    const xMax = getX(graph.left + graph.width - diff)

    this.setState((state) => ({
      xMin,
      xMax
    }))
  }

  onMouseDown = (e, mouse) => {
    // TODO where to get graph from?
    const graph = {
      top: 0,
      left: 50,
      height: 250,
      width: 450
    }

    if (ui.isInsideRect(mouse, graph)) {
      this.mouse.isDragging = true
      this.mouse.dragStartCanvasX = mouse.x
      this.mouse.dragStartXMin = this.state.xMin
      this.mouse.dragStartXMax = this.state.xMax
    }
  }

  onMouseUp = (e, mouse) => {
    this.mouse.isDragging = false
    this.mouse.dragStartCanvasX = undefined
    this.mouse.dragStartXMin = undefined
    this.mouse.dragStartXMax = undefined
  }

  onMouseOut = (e, mouse) => {
    this.mouse.isDragging = false
    this.mouse.dragStartCanvasX = undefined
    this.mouse.dragStartXMin = undefined
    this.mouse.dragStartXMax = undefined
  }

  render () {
    return (
      <GraphCanvas
        {...this.props}
        onMouseMove={this.onMouseMove}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        onMouseOut={this.onMouseOut}
        xMin={this.state.xMin}
        xMax={this.state.xMax}
      />
    )
  }
}

TestDrag.defaultProps = {
}

export default TestDrag
