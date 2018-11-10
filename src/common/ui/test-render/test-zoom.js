import React, { Component } from 'react'
import { merge } from '../../test-util'
import TestCanvas from '../../test-canvas'
import * as background from '../../background'
import * as ui from '../index'

class TestZoom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xMin: 1900,
      xMax: 2010,
      yMin: 10,
      yMax: 110,
      xInterval: 15,
      yInterval: 10,
    }
  }

  onWheel = (e, mouse) => {
    if (ui.isInsideRect(mouse, this.props.graph)) {
      e.preventDefault()

      if (e.deltaY > 0) {
        // zoom out
        this.setState((state) => ({
          ...state,
          xMin: state.xMin - 15,
          xMax: state.xMax + 15,
          xInterval: state.xInterval + 5,
          yMin: state.yMin - 10,
          yMax: state.yMax + 10,
          yInterval: state.yInterval + 5,
        }))
      } else {
        // zoom in
        this.setState((state) => ({
          ...state,
          xMin: state.xMin + 15,
          xMax: state.xMax +-15,
          xInterval: state.xInterval - 5,
          yMin: state.yMin + 10,
          yMax: state.yMax - 10,
          yInterval: state.yInterval - 5,
        }))
      }
    }
  }

  render () {
    return (
      <TestCanvas
        {...this.props}
        xMin={this.state.xMin}
        xMax={this.state.xMax}
        yMin={this.state.yMin}
        yMax={this.state.yMax}
        drawBackground={(ctx, props) => {
          background.fillCanvas(ctx, props)
          background.draw(ctx, merge(props, {
            background: {
              xInterval: this.state.xInterval,
              yInterval: this.state.yInterval,
            }
          }))
        }}
        drawUI={ui.draw}
        onWheel={this.onWheel}
      />
    )
  }
}

TestZoom.defaultProps = {
}

export default TestZoom
