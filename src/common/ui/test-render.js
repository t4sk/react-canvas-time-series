// @flow
import React, { Component } from 'react'
import * as ui from './index'
import { merge } from '../util'
import TestUICanvas from './test-ui-canvas'

class UITestRender extends Component {
  render () {
    return (
      <div>
        <h3>Y Label Left</h3>
        <TestUICanvas
          {...merge(this.props, {
              y: {
                label: {
                  at: 'left'
                }
              }
          })}
        />

        <h3>Y Label Right</h3>
        <TestUICanvas
          {...merge(this.props, {
              graph: {
                x: 10,
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

UITestRender.defaultProps = {
  canvas: {
    width: 500,
    height: 300
  },
  graph: {
    // y label left, x label bottom
    x: 60, // margin.left + x.axis.width
    y: 20, // margin.
    width: 420, // canvas.width - (margin.left + margin.right + x.axis.width)
    height: 220, // canvas.height - (margin.top + margin.bottom + y.axis.height)
  },
  x: {
    line: {
      color: 'blue',
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
      color: 'green',
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
}


export default UITestRender
