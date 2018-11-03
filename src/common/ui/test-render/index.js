import React, { Component } from 'react'
import { merge } from '../../test-util'
import TestCanvas from '../../test-canvas'
import * as background from '../../background'
import * as ui from '../index'

import TestZoom from './test-zoom'
import TestNearest from './test-nearest'
import TestDrag from './test-drag'
import TestUpdateProps from './test-update-props'

const X_MIN = 1900
const X_MAX = 2010
const Y_MIN = 10
const Y_MAX = 110

// TODO component to zoome
class TestRender extends Component {
  render () {
    return (
      <div>
        <h3>Scroll to Zoom</h3>
        <TestZoom {...this.props} />

        <h3>Get Nearest Data at X</h3>
        <TestNearest {...this.props} />

        <h3>X Drag</h3>
        <TestDrag {...this.props} />

        <h3>Update Canvas Props</h3>
        <TestUpdateProps {...this.props} />

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
          showUI={true}
          drawUI={ui.draw}
        />

        <h3>X Label Top</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              xAxisAt: 'top'
            },
            graph: {
              top: 60
            },
            ui: {
              xLabelAt: 'top'
            }
          })}
          drawBackground={background.draw}
          showUI={true}
          drawUI={ui.draw}
        />

        <h3>X Label Fixed</h3>
        <TestCanvas
          {...this.props}
          drawData={(ctx, props) => {
            ui.drawXLineAt(ctx, {
              ...props,
              lineColor: 'orange',
              left: 275
            })

            ui.drawXLabelAt(ctx, {
              ...props,
              left: 275,
              text: 'Here',
              height: props.ui.xLabelHeight,
              width: props.ui.xLabelWidth,
              labelAt: props.ui.xLabelAt,
              backgroundColor: 'orange',
              font: props.ui.xLabelFont,
              color: 'white'
            })
          }}
          drawBackground={background.draw}
          showUI={true}
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
          showUI={true}
          drawUI={ui.draw}
        />

        <h3>Y Label Right</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              yAxisAt: 'right'
            },
            graph: {
              left: 20
            },
            ui: {
              yLabelAt: 'right'
            }
          })}
          drawBackground={background.draw}
          showUI={true}
          drawUI={ui.draw}
        />

        <h3>Y Label Fixed</h3>
        <TestCanvas
          {...this.props}
          drawData={(ctx, props) => {
            ui.drawYLineAt(ctx, {
              ...props,
              lineColor: 'orange',
              top: 150
            })
            ui.drawYLabelAt(ctx, {
              ...props,
              top: 150,
              height: props.ui.yLabelHeight,
              width: props.ui.yLabelWidth,
              labelAt: props.ui.yLabelAt,
              text: 'Here',
              backgroundColor: 'orange',
              font: props.ui.yLabelFont,
              color: 'white'
            })
          }}
          drawBackground={background.draw}
          showUI={true}
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
  padding: {
    top: 10,
    bottom: 20,
    left: 20,
    right: 30
  },
  graph: {
    // y label left, x label bottom
    left: 70, // padding.left + x.axis.width
    top: 10, // padding.top
    width: 400, // canvas.width - (padding.left + padding.right + x.axis.width)
    height: 220 // canvas.height - (padding.top + padding.bottom + y.axis.height)
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

export default TestRender
