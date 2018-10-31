import React, { Component } from 'react'
import TestCanvas from '../../test-canvas'
import { linear } from '../../math'
import * as background from '../../background'
import {
  getGraphLeft,
  getGraphWidth,
} from '../../background/common'
import * as ui from '../index'

// TODO props from test-render/index
const X_MIN = 1900
const X_MAX = 2010
const Y_MIN = 10
const Y_MAX = 110

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
        drawBackground={background.draw}
        showUI={true}
        drawUI={ui.draw}
        onMouseMove={this.onMouseMove}
      />
    )
  }
}

// TODO props from test-render/index
TestDrag.defaultProps = {
  canvas: {
    width: 500,
    height: 300
  },
  margin: {
    top: 10,
    bottom: 20,
    left: 20,
    right: 30
  },
  graph: {
    // y label left, x label bottom
    left: 70, // margin.left + x.axis.width
    top: 10, // margin.top
    width: 400, // canvas.width - (margin.left + margin.right + x.axis.width)
    height: 220 // canvas.height - (margin.top + margin.bottom + y.axis.height)
  },
  background: {
    backgroundColor: 'lightgrey',

    showYLabel: true,
    showYLine: true,
    yLineWidth: 1,
    yLineColor: 'red',
    yAxisAt: 'left',
    yAxisWidth: 50,
    yLabelFont: '12px Arial',
    yLabelColor: 'black',
    renderYLabel: y => y,
    yInterval: 10,

    showXLabel: true,
    showXLine: true,
    xLineWidth: 1,
    xLineColor: 'blue',
    xAxisAt: 'bottom',
    xAxisHeight: 50,
    xLabelFont: '12px Arial',
    xLabelColor: 'black',
    renderXLabel: x => x,
    xInterval: 15
  },
  ui: {
    xLineColor: 'blue',
    xLabelAt: 'bottom',
    xLabelWidth: 70,
    xLabelHeight: 20,
    xLabelBackgroundColor: 'green',
    xLabelFont: '12px Arial',
    xLabelColor: 'black',
    renderXLabel: x => Math.round(x),

    yLineColor: 'green',
    yLabelAt: 'left',
    yLabelWidth: 50,
    yLabelHeight: 20,
    yLabelBackgroundColor: 'black',
    yLabelFont: '12px Arial',
    yLabelColor: 'white',
    renderYLabel: y => y.toFixed(2)
  },
  yMin: Y_MIN,
  yMax: Y_MAX,
  xMin: X_MIN,
  xMax: X_MAX
}

export default TestDrag
