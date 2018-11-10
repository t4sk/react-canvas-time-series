import React, { Component } from 'react'
import TestCanvas from '../../test-canvas'
import { linear } from '../../math'
import * as background from '../../background'
import {
  getGraphLeft,
  getGraphWidth,
} from '../../background/common'
import * as ui from '../index'

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

    if (!ui.isInsideRect(mouse, this.props.graph)) {
      return
    }

    const graphLeft = getGraphLeft(this.props)
    const width = getGraphWidth(this.props)

    const { dragStartXMin, dragStartXMax } = this.mouse

    const toX = linear({
      dy: dragStartXMax - dragStartXMin,
      dx: width,
      y0: dragStartXMin - (dragStartXMax - dragStartXMin) / width * graphLeft
    })

    const diff = mouse.x - this.mouse.dragStartLeft

    const xMin = toX(graphLeft - diff)
    const xMax = toX(graphLeft + width - diff)

    this.setState((state) => ({
      xMin,
      xMax
    }))
  }

  onMouseDown = (e, mouse) => {
    if (ui.isInsideRect(mouse, this.props.graph)) {
      this.mouse.isDragging = true
      this.mouse.dragStartLeft = mouse.x
      this.mouse.dragStartXMin = this.props.xMin
      this.mouse.dragStartXMax = this.props.xMax
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
      <TestCanvas
        {...this.props}
        xMin={this.state.xMin}
        xMax={this.state.xMax}
        drawBackground={(ctx, props) => {
          background.fillCanvas(ctx, props)
          background.draw(ctx, props)
        }}
        drawUI={ui.draw}
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
