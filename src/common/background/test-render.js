import React, { Component } from 'react'
import * as background from './index'
import { merge } from '../test-util'
import TestCanvas from '../test-canvas'

class TestRender extends Component {
  render () {
    return (
      <div>
        <h3>X Axis Bottom</h3>
        <TestCanvas
          {...merge(this.props, {
            x: {
              axis: {
                at: 'bottom'
              }
            }
          })}
          draw={background.draw}
        />

        <h3>X Axis Top</h3>
        <TestCanvas
          {...merge(this.props, {
            x: {
              axis: {
                at: 'top'
              }
            }
          })}
          draw={background.draw}
        />

        <h3>Y Axis Left</h3>
        <TestCanvas
          {...merge(this.props, {
            y: {
              axis: {
                at: 'left'
              }
            }
          })}
          draw={background.draw}
        />

        <h3>Y Axis Right</h3>
        <TestCanvas
          {...merge(this.props, {
            y: {
              axis: {
                at: 'right'
              }
            }
          })}
          draw={background.draw}
        />
      </div>
    )
  }
}

TestRender.defaultProps = {
  width: 500,
  height: 300,
  margin: {
    top: 10,
    bottom: 20,
    left: 20,
    right: 30
  },
  backgroundColor: 'lightgrey',
  y: {
    line: {
      color: 'red'
    },
    axis: {
      at: 'left',
      label: {
        font: '12px Arial',
        color: 'black',
        render: y => y
      },
      width: 50
    },
    interval: 10
  },
  x: {
    line: {
      color: 'blue'
    },
    axis: {
      at: 'bottom',
      label: {
        font: '12px Arial',
        color: 'black',
        render: x => x
      },
      height: 50
    },
    interval: 15
  },
  yMin: 10,
  yMax: 110,
  xMin: 1900,
  xMax: 2010
}

export default TestRender
