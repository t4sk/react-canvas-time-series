import React, { Component } from 'react'
import { merge } from '../test-util'
import TestCanvas from './test-canvas'

class TestRender extends Component {
  render () {
    return (
      <div>
        <h3>X Label Bottom</h3>
        <TestCanvas
          {...merge(this.props, {
            x: {
              label: {
                at: 'bottom'
              }
            }
          })}
        />

        <h3>X Label Top</h3>
        <TestCanvas
          {...merge(this.props, {
            graph: {
              y: 60
            },
            x: {
              label: {
                at: 'top'
              }
            }
          })}
        />

        <h3>Y Label Left</h3>
        <TestCanvas
          {...merge(this.props, {
            y: {
              label: {
                at: 'left'
              }
            }
          })}
        />

        <h3>Y Label Right</h3>
        <TestCanvas
          {...merge(this.props, {
            graph: {
              x: 10
            },
            y: {
              label: {
                at: 'right'
              }
            }
          })}
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
  graph: {
    // y label left, x label bottom
    x: 60, // margin.left + x.axis.width
    y: 20, // margin.
    width: 420, // canvas.width - (margin.left + margin.right + x.axis.width)
    height: 220 // canvas.height - (margin.top + margin.bottom + y.axis.height)
  },
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
  },
  yMin: 10,
  yMax: 110,
  xMin: 1900,
  xMax: 2010
}

export default TestRender