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
          {...merge(this.props, {
            background: {
              xAxisAt: 'bottom'
            },
            ui: {
              x: {
                label: {
                  at: 'bottom'
                }
              }
            },
            xMin: this.state.xMin,
            xMax: this.state.xMax
          })}
          showBackground={true}
          drawBackground={background.draw}
          showUI={true}
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
              x: {
                label: {
                  at: 'bottom'
                }
              }
            }
          })}
          showBackground={true}
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
              y: 60
            },
            ui: {
              x: {
                label: {
                  at: 'top'
                }
              }
            }
          })}
          showBackground={true}
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
              y: {
                label: {
                  at: 'left'
                }
              }
            }
          })}
          showBackground={true}
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
              x: 20
            },
            ui: {
              y: {
                label: {
                  at: 'right'
                }
              }
            }
          })}
          showBackground={true}
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
    yLabelRender: y => y,
    yInterval: 10,

    showXLabel: true,
    showXLine: true,
    xLineWidth: 1,
    xLineColor: 'blue',
    xAxisAt: 'bottom',
    xAxisHeight: 50,
    xLabelFont: '12px Arial',
    xLabelColor: 'black',
    xLabelRender: x => x,
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
    x: {
      line: {
        color: 'blue'
      },
      label: {
        at: 'bottom',
        width: 70,
        height: 20,
        backgroundColor: 'green',
        font: '12px Arial',
        color: 'black',
        render: x => Math.round(x)
      }
    },
    y: {
      line: {
        color: 'green'
      },
      label: {
        at: 'left',
        width: 50,
        height: 20,
        backgroundColor: 'black',
        font: '12px Arial',
        color: 'white',
        render: y => y.toFixed(2)
      }
    }
  },
  yMin: 10,
  yMax: 110,
  xMin: 1900,
  xMax: 2010
}

export default TestRender
