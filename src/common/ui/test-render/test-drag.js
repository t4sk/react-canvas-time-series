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
  }

  onMouseMove = mouse => {
    if (!mouse.isDragging) {
      return
    }

    if (!ui.isInsideGraph(mouse, this.props.graph)) {
      return
    }

    const graphLeft = getGraphLeft(this.props)
    const width = getGraphWidth(this.props)

    const { dragStartXMin, dragStartXMax } = mouse

    const toX = linear({
      dy: dragStartXMax - dragStartXMin,
      dx: width,
      y0: dragStartXMin - (dragStartXMax - dragStartXMin) / width * graphLeft
    })

    const diff = mouse.x - mouse.dragStartLeft

    const xMin = toX(graphLeft - diff)
    const xMax = toX(graphLeft + width - diff)

    this.setState((state) => ({
      xMin,
      xMax
    }))
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
      />
    )
  }
}

TestDrag.defaultProps = {
}

export default TestDrag
