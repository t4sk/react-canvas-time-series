import React, { Component } from 'react'
import * as ui from './index'
import { merge } from '../util'

class UITestRender extends Component {
  componentDidMount () {
    this.ctx = {
      yLabelLeft: this.refs.yLabelLeft.getContext('2d'),
    }

    // translate by half pixel to draw thin lines
    this.ctx.yLabelLeft.translate(0.5, 0.5)
    this.draw()
  }

  shouldComponentUpdate () {
    return false
  }

  getMetrics () {
    return {
      yMin: 10,
      yMax: 110,
      xMin: 1900,
      xMax: 2010
    }
  }

  draw () {
    const metrics = this.getMetrics()

    // ui.draw(
    //   this.ctx.xAxisBottom, {
    //     ...merge(this.props, {
    //       x: {
    //         axis: {
    //           at: 'bottom'
    //         }
    //       }
    //     }),
    //     ...metrics
    //   }
    // )
  }

  render () {
    return (
      <div>
        <h3>Y Label Left</h3>
        <canvas
          ref="yLabelLeft"
          width={this.props.width}
          height={this.props.height}
        />

        <h3>Y Label Right</h3>
        <h3>X Label Top</h3>
        <h3>X Label Bottom</h3>
      </div>
    )
  }
}

UITestRender.defaultProps = {
  width: 500,
  height: 300,
}

export default UITestRender
