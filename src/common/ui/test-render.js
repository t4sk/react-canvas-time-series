import React, { Component } from 'react'
import { merge } from '../test-util'
import TestCanvas from '../test-canvas'
import { linear } from '../math'
import * as background from '../background'
import { getGraphX, getGraphWidth } from '../background/common'
import * as ui from './index'

class TestRender extends Component {
  constructor(props) {
    super(props)
    this.state = {
      xMin: 1900,
      xMax: 2010
    }
  }

  onMouseMove = mouse => {
    if (!mouse.isDragging) {
      return
    }

    if (!ui.isInsideGraph(mouse, this.props.graph)) {
      return
    }

    const graphStartCanvasX = getGraphX(this.props)
    const width = getGraphWidth(this.props)

    const {dragStartXMin, dragStartXMax} = mouse

    const toX = linear({
      dy: dragStartXMax - dragStartXMin,
      dx: width,
      y0: dragStartXMin - (dragStartXMax - dragStartXMin) / width * graphStartCanvasX,
    })

    const diffCanvasX = mouse.x - mouse.dragStartCanvasX

    const xMin = toX(graphStartCanvasX - diffCanvasX)
    const xMax = toX(graphStartCanvasX + width - diffCanvasX)

    this.setState({
      xMin,
      xMax
    })
  }

  render () {
    return (
      <div>
        <h3>X Drag</h3>
        <TestCanvas
          {...this.props}
          xMin={this.state.xMin}
          xMax={this.state.xMax}
          drawBackground={background.draw}
          drawUI={ui.draw}
          onMouseMove={this.onMouseMove}
        />

        <h3>X Label Bottom</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              xAxisAt: 'bottom'
            },
            ui: {
              xLabelAt: 'bottom'
            }
          })}
          drawBackground={background.draw}
          drawUI={ui.draw}
        />

        <h3>X Label Top</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              xAxisAt: 'top'
            },
            graph: {
              y: 60
            },
            ui: {
              xLabelAt: 'top'
            }
          })}
          drawBackground={background.draw}
          drawUI={ui.draw}
        />

        <h3>X Label Fixed</h3>
        <TestCanvas
          {...this.props}
          draw={(ctx, props) => {
            ui.drawXLineAt(ctx, {
              ...props,
              lineColor: 'orange',
              canvasX: 275,
            })

            ui.drawXLabelAt(ctx, {
              ...props,
              canvasX: 275,
              x: 100,
              height: props.ui.xLabelHeight,
              width: props.ui.xLabelWidth,
              labelAt: props.ui.xLabelAt,
              backgroundColor: 'orange',
              font: props.ui.xLabelFont,
              color: 'white',
              renderXLabel: props.ui.renderXLabel,
            })
          }}
          drawBackground={background.draw}
          drawUI={ui.draw}
        />

        <h3>Y Label Left</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              yAxisAt: 'left'
            },
            ui: {
              yLabelAt: 'left'
            }
          })}
          drawBackground={background.draw}
          drawUI={ui.draw}
        />

        <h3>Y Label Right</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              yAxisAt: 'right'
            },
            graph: {
              x: 20
            },
            ui: {
              yLabelAt: 'right'
            }
          })}
          drawBackground={background.draw}
          drawUI={ui.draw}
        />

        <h3>Y Label Fixed</h3>
        <TestCanvas
          {...this.props}
          draw={(ctx, props) => {
            ui.drawYLineAt(ctx, {
              ...props,
              lineColor: 'orange',
              canvasY: 150,
            })
            ui.drawYLabelAt(ctx, {
              ...props,
              canvasY: 150,
              height: props.ui.yLabelHeight,
              width: props.ui.yLabelWidth,
              labelAt: props.ui.yLabelAt,
              backgroundColor: 'orange',
              font: props.ui.yLabelFont,
              color: 'white',
              renderYLabel: props.ui.renderYLabel,
            })
          }}
          drawBackground={background.draw}
          drawUI={ui.draw}
        />
      </div>
    )
  }
}

TestRender.defaultProps = {
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
    xInterval: 15,
  },
  graph: {
    // y label left, x label bottom
    x: 70, // margin.left + x.axis.width
    y: 10, // margin.top
    width: 400, // canvas.width - (margin.left + margin.right + x.axis.width)
    height: 220 // canvas.height - (margin.top + margin.bottom + y.axis.height)
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
  yMin: 10,
  yMax: 110,
  xMin: 1900,
  xMax: 2010
}

export default TestRender
