import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as background from './background'
import {merge} from './util'

class BackgroundTestRender extends Component {
  componentDidMount () {
    this.ctx = {
      yAxisRight: this.refs.yAxisRight.getContext('2d'),
      yAxisLeft: this.refs.yAxisLeft.getContext('2d')
    }

    // translate by half pixel to draw thin lines
    this.ctx.yAxisLeft.translate(0.5, 0.5)
    this.ctx.yAxisRight.translate(0.5, 0.5)
    this.draw()
  }

  shouldComponentUpdate () {
    return false
  }

  getMetrics () {
    // const minUnixTime = DATA[0].unixTime
    // const maxUnixTime = DATA[DATA.length - 1].unixTime
    // const xInterval = Math.ceil((maxUnixTime - minUnixTime) / (DATA.length - 1))
    // const xMin = minUnixTime - round(xInterval / 2)
    // const xMax = maxUnixTime + round(xInterval / 2)
    // const minLow = Math.min(...DATA.map(d => d.low))
    // const maxHigh = Math.max(...DATA.map(d => d.high))
    // // yInterval >= ceil((yMax - yMin) / (num intervals - 2))
    // const yInterval = Math.ceil((maxHigh - minLow) / (this.props.background.numVerticalIntervals - 2))
    // const yMin = minLow - yInterval
    // const yMax = maxHigh + yInterval
    // const maxVolume = Math.max(...DATA.map(price => price.volume))

    return {
      yMin: 10,
      yMax: 110
    }
  }

  draw () {
    const metrics = this.getMetrics()

    background.draw(
      this.ctx.yAxisLeft, {
        ...merge(this.props, {
          y: {
            axis: {
              at: 'left'
            }
          }
        }),
        ...metrics
      })

    background.draw(
      this.ctx.yAxisRight, {
        ...merge(this.props, {
          y: {
            axis: {
              at: 'right'
            }
          }
        }),
        ...metrics
      })
  }

  render () {
    return (
      <div>
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
    bottom: 10,
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
        render: x => x
      },
      width: 50
    },
    intervals: 8
  },
  x: {
    line: {
      color: 'red'
    },
    axis: {
      at: 'bottom',
      // label: {
      //   color: "",
      //   font: "",
      //   render: x => x,
      // }
      height: 50
    },
    intervals: 8
  }
}

BackgroundTestRender.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  background: PropTypes.shape({
  }).isRequired
}

export default BackgroundTestRender
