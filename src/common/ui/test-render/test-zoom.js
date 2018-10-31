import React, { Component } from 'react'
import { merge } from '../../test-util'
import TestCanvas from '../../test-canvas'
import * as background from '../../background'
import * as ui from '../index'

// TODO min max from test-render/index props
const X_MIN = 1900
const X_MAX = 2010
const Y_MIN = 10
const Y_MAX = 110

class TestZoom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xMin: 1900,
      xMax: 2010,
      yMin: 10,
      yMax: 110,
      xInterval: 15,
      yInterval: 10,
    }
  }

  onWheel = (e, mouse) => {
    if (ui.isInsideGraph(mouse, this.props.graph)) {
      e.preventDefault()

      if (e.deltaY > 0) {
        // zoom out
        this.setState((state) => ({
          ...state,
          xMin: state.xMin - 15,
          xMax: state.xMax + 15,
          xInterval: state.xInterval + 5,
          yMin: state.yMin - 10,
          yMax: state.yMax + 10,
          yInterval: state.yInterval + 5,
        }))
      } else {
        // zoom in
        this.setState((state) => ({
          ...state,
          xMin: state.xMin + 15,
          xMax: state.xMax +-15,
          xInterval: state.xInterval - 5,
          yMin: state.yMin + 10,
          yMax: state.yMax - 10,
          yInterval: state.yInterval - 5,
        }))
      }
    }
  }

  render () {
    return (
      <TestCanvas
        {...this.props}
        xMin={this.state.xMin}
        xMax={this.state.xMax}
        yMin={this.state.yMin}
        yMax={this.state.yMax}
        drawBackground={(ctx, props) => {
          background.draw(ctx, merge(props, {
            background: {
              xInterval: this.state.xInterval,
              yInterval: this.state.yInterval,
            }
          }))
        }}
        showUI={true}
        drawUI={ui.draw}
        onWheel={this.onWheel}
      />
    )
  }
}

// TODO props from test-render/index
TestZoom.defaultProps = {
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

export default TestZoom
