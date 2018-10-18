import React, { Component } from 'react'
import * as background from './index'
import { merge } from '../test-util'
import TestCanvas from '../test-canvas'

class TestRender extends Component {
  render () {
    console.log(this.props)
    return (
      <div>
        <h3>X Axis Bottom</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              xAxisAt: 'bottom'
            }
          })}
          draw={background.draw}
        />

        <h3>X Axis Top</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              xAxisAt: 'top'
            }
          })}
          draw={background.draw}
        />

        <h3>Y Axis Left</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              yAxisAt: 'left'
            }
          })}
          draw={background.draw}
        />

        <h3>Y Axis Right</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              yAxisAt: 'right'
            }
          })}
          draw={background.draw}
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
    yLineWidth: 1,
    yLineColor: 'red',
    yAxisAt: 'left',
    yAxisWidth: 50,
    yLabelFont: '12px Arial',
    yLabelColor: 'black',
    yLabelRender: y => y,
    yInterval: 10,

    xLineWidth: 1,
    xLineColor: 'blue',
    xAxisAt: 'bottom',
    xAxisHeight: 50,
    xLabelFont: '12px Arial',
    xLabelColor: 'black',
    xLabelRender: x => x,
    xInterval: 15,
  },
  yMin: 10,
  yMax: 110,
  xMin: 1900,
  xMax: 2010
}

export default TestRender
