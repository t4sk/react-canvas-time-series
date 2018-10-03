import React, { Component } from 'react'
import * as background from './index'
import { merge } from '../test-util'

class BackgroundTestRender extends Component {
  componentDidMount () {
    this.ctx = {
      xAxisTop: this.refs.xAxisTop.getContext('2d', { alpha: false }),
      xAxisBottom: this.refs.xAxisBottom.getContext('2d', { alpha: false }),
      yAxisRight: this.refs.yAxisRight.getContext('2d', { alpha: false }),
      yAxisLeft: this.refs.yAxisLeft.getContext('2d', { alpha: false })
    }

    // translate by half pixel to draw thin lines
    this.ctx.xAxisTop.translate(0.5, 0.5)
    this.ctx.xAxisBottom.translate(0.5, 0.5)
    this.ctx.yAxisLeft.translate(0.5, 0.5)
    this.ctx.yAxisRight.translate(0.5, 0.5)
    this.draw()
  }

  shouldComponentUpdate () {
    return false
  }

  draw () {
    background.draw(
      this.ctx.xAxisBottom, {
        ...merge(this.props, {
          x: {
            axis: {
              at: 'bottom'
            }
          }
        })
      }
    )
    background.draw(
      this.ctx.xAxisTop, {
        ...merge(this.props, {
          x: {
            axis: {
              at: 'top'
            }
          }
        })
      }
    )
    background.draw(
      this.ctx.yAxisLeft, {
        ...merge(this.props, {
          y: {
            axis: {
              at: 'left'
            }
          }
        })
      }
    )

    background.draw(
      this.ctx.yAxisRight, {
        ...merge(this.props, {
          y: {
            axis: {
              at: 'right'
            }
          }
        })
      }
    )
  }

  render () {
    return (
      <div>
        <h3>X Axis Bottom</h3>
        <canvas
          ref="xAxisBottom"
          width={this.props.width}
          height={this.props.height}
        />

        <h3>X Axis Top</h3>
        <canvas
          ref="xAxisTop"
          width={this.props.width}
          height={this.props.height}
        />

        <h3>Y Axis Left</h3>
        <canvas
          ref="yAxisLeft"
          width={this.props.width}
          height={this.props.height}
        />

        <h3>Y Axis Right</h3>
        <canvas
          ref="yAxisRight"
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    )
  }
}

BackgroundTestRender.defaultProps = {
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
    intervals: 8
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
    intervals: 10
  },
  yMin: 10,
  yMax: 110,
  xMin: 1900,
  xMax: 2010
}

export default BackgroundTestRender
