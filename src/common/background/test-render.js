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
          drawBackground={(ctx, props) => {
            background.fillCanvas(ctx, props)
            background.draw(ctx, props)
          }}
        />

        <h3>Hide X Lines</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              showXLine: false
            }
          })}
          drawBackground={(ctx, props) => {
            background.fillCanvas(ctx, props)
            background.draw(ctx, props)
          }}
        />

        <h3>Hide Y Labels</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              showYLabel: false
            }
          })}
          drawBackground={(ctx, props) => {
            background.fillCanvas(ctx, props)
            background.draw(ctx, props)
          }}
        />

        <h3>Hide Y Lines</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              showYLine: false
            }
          })}
          drawBackground={(ctx, props) => {
            background.fillCanvas(ctx, props)
            background.draw(ctx, props)
          }}
        />

        <h3>X Axis Bottom</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              xAxisAt: 'bottom'
            }
          })}
          drawBackground={(ctx, props) => {
            background.fillCanvas(ctx, props)
            background.draw(ctx, props)
          }}
        />

        <h3>X Axis Top</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              xAxisAt: 'top'
            }
          })}
          drawBackground={(ctx, props) => {
            background.fillCanvas(ctx, props)
            background.draw(ctx, props)
          }}
        />

        <h3>Y Axis Left</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              yAxisAt: 'left'
            }
          })}
          drawBackground={(ctx, props) => {
            background.fillCanvas(ctx, props)
            background.draw(ctx, props)
          }}
        />

        <h3>Y Axis Right</h3>
        <TestCanvas
          {...merge(this.props, {
            background: {
              yAxisAt: 'right'
            }
          })}
          drawBackground={(ctx, props) => {
            background.fillCanvas(ctx, props)
            background.draw(ctx, props)
          }}
        />
      </div>
    )
  }
}

TestRender.defaultProps = {
  canvas: {
    width: 500,
    height: 300,
    backgroundColor: "beige",
  },
  padding: {
    top: 10,
    bottom: 20,
    left: 20,
    right: 30
  },
  background: {
    top: 10,
    left: 20,
    width: 450,
    height: 270,

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
