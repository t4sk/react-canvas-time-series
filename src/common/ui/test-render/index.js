import React, { Component } from 'react'
import { merge, rand } from '../../test-util'
import TestCanvas from '../../test-canvas'
import { linear, round, getNearestDataAtX } from '../../math'
import * as background from '../../background'
import {
  getGraphLeft,
  getGraphWidth,
  getGraphHeight
} from '../../background/common'
import * as line from '../../line'
import * as ui from '../index'

import TestZoom from './test-zoom'
import TestNearest from './test-nearest'
import TestDrag from './test-drag'

const X_MIN = 1900
const X_MAX = 2010
const Y_MIN = 10
const Y_MAX = 110

let LINE_DATA = []

for (let i = 0; i < 10; i++) {
  LINE_DATA.push({
    x: round(rand(X_MIN, X_MAX)),
    y: round(rand(Y_MIN, Y_MAX))
  })
}

LINE_DATA.sort((a, b) => a.x - b.x)

// TODO one canvas to test all (candlestick, barchart, line chart, zoom, drag, nearest data)
function getTop(top, margin, height, graph) {
  return top  + margin
}

function getLeft(left, margin, width, graph) {
  if (left -margin - width <= graph.left) {
     return left + margin
  }
  return left - margin - width
}

function getTransition(left, margin, width, graph) {
  let transition = ''

  if (left <= graph.left + 2 * (width + margin)) {
    transition = 'left 0.1s'
  }

  return transition
}

class TestRender extends Component {
  constructor (props) {
    super(props)
    this.state = {
      updateCanvasProps: {
        canvas: {
          width: 500,
          height: 300,
        }
      }
    }
  }

  onWheelTestUpdateCanvasProps = (e) => {
    e.preventDefault()
    if (e.deltaY > 0) {
      this.setState((state) => ({
        updateCanvasProps: {
          canvas: {
            width: state.updateCanvasProps.canvas.width + 10,
            height: state.updateCanvasProps.canvas.height + 10,
          }
        }
      }))
    } else {
      this.setState((state) => ({
        updateCanvasProps: {
          canvas: {
            width: state.updateCanvasProps.canvas.width - 10,
            height: state.updateCanvasProps.canvas.height - 10,
          }
        }
      }))
    }
  }

  render () {
    return (
      <div>
        <h3>Scroll to Zoom</h3>
        <TestZoom />

        <h3>Get Nearest Data at X</h3>
        <TestNearest />

        <h3>X Drag</h3>
        <TestDrag />

        <h3>Update Canvas Props</h3>
        <TestCanvas
          {...merge(this.props, {
            canvas: this.state.updateCanvasProps.canvas,
            graph: {
              width: getGraphWidth(merge(this.props, {
                canvas: this.state.updateCanvasProps.canvas
              })),
              height: getGraphHeight(merge(this.props, {
                canvas: this.state.updateCanvasProps.canvas,
              }))
            }
          })}
          drawBackground={background.draw}
          showUI={true}
          drawUI={ui.draw}
          onWheel={this.onWheelTestUpdateCanvasProps}
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

export default TestRender
