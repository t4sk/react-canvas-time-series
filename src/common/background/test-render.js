import React, { Component } from 'react'
import * as background from './index'
import { merge } from '../test-util'
import TestCanvas from '../test-canvas'

class TestRender extends Component {
  render () {
    return (
      <div>
        <h3>Hide X Labels</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              showXLabel: false
            }
          })}
          drawBackground={background.draw}
        />

        <h3>Hide X Lines</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              showXLine: false
            }
          })}
          drawBackground={background.draw}
        />

        <h3>Hide Y Labels</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              showYLabel: false
            }
          })}
          drawBackground={background.draw}
        />

        <h3>Hide Y Lines</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              showYLine: false
            }
          })}
          drawBackground={background.draw}
        />

        <h3>X Axis Bottom</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              xAxisAt: 'bottom'
            }
          })}
          drawBackground={background.draw}
        />

        <h3>X Axis Top</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              xAxisAt: 'top'
            }
          })}
          drawBackground={background.draw}
        />

        <h3>Y Axis Left</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              yAxisAt: 'left'
            }
          })}
          drawBackground={background.draw}
        />

        <h3>Y Axis Right</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              yAxisAt: 'right'
            }
          })}
          drawBackground={background.draw}
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
    xInterval: 15
  },
  yMin: 10,
  yMax: 110,
  xMin: 1900,
  xMax: 2010
}

export default TestRender
