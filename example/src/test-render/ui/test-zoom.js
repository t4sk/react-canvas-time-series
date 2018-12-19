import React, { Component } from 'react'
import {canvas, GraphCanvas} from 'react-canvas-time-series'
const { ui } = canvas

// ZOOM_RATE should be < 0.5
const ZOOM_RATE = 0.1
const MIN_X_TICK_INTERVAL = 10
const NUM_X_TICKS = 10
const MIN_Y_TICK_INTERVAL = 1
const NUM_Y_TICKS = 10

class TestZoom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xMin: 0,
      xMax: 1000,
      yMin: 0,
      yMax: 100,
      xTickInterval: 100,
      yTickInterval: 10,
    }
  }

  onWheel = (e, mouse) => {
    // TODO where to get graph
    const graph = {
      top: 0,
      left: 50,
      height: 250,
      width: 450,
    }

    if (ui.isInsideRect(mouse, graph)) {
      e.preventDefault()

      if (e.deltaY > 0) {
        // zoom out
        this.setState((state) => {
          const xDiff = state.xMax - state.xMin
          const xTickInterval = Math.max(
            (1 + 2 * ZOOM_RATE) * xDiff / NUM_X_TICKS,
            MIN_X_TICK_INTERVAL
          )

          const yDiff = state.yMax - state.yMin
          const yTickInterval = Math.max(
            (1 + 2 * ZOOM_RATE) * yDiff / NUM_Y_TICKS,
            MIN_Y_TICK_INTERVAL
          )

          return {
            ...state,
            xMin: state.xMin - ZOOM_RATE * xDiff,
            xMax: state.xMax + ZOOM_RATE * xDiff,
            xTickInterval,
            yMin: state.yMin - ZOOM_RATE * yDiff,
            yMax: state.yMax + ZOOM_RATE * yDiff,
            yTickInterval,
          }
        })
      } else {
        // zoom in
        this.setState((state) => {
          const xDiff = state.xMax - state.xMin
          const xTickInterval = Math.max(
            (1 - 2 * ZOOM_RATE) * xDiff / NUM_X_TICKS,
            MIN_X_TICK_INTERVAL
          )

          const yDiff = state.yMax - state.yMin
          const yTickInterval = Math.max(
            (1 - 2 * ZOOM_RATE) * yDiff / NUM_Y_TICKS,
            MIN_Y_TICK_INTERVAL
          )

          return {
            ...state,
            xMin: state.xMin + ZOOM_RATE * xDiff,
            xMax: state.xMax - ZOOM_RATE * xDiff,
            xTickInterval,
            yMin: state.yMin + ZOOM_RATE * yDiff,
            yMax: state.yMax - ZOOM_RATE * yDiff,
            yTickInterval,
          }
        })
      }
    }
  }

  render () {
    return (
      <GraphCanvas
        {...this.props}
        background={{
          ...this.props.background,
          xTickInterval: this.state.xTickInterval,
          yTickInterval: this.state.yTickInterval,
        }}
        xMin={this.state.xMin}
        xMax={this.state.xMax}
        yMin={this.state.yMin}
        yMax={this.state.yMax}
        onWheel={this.onWheel}
      />
    )
  }
}

TestZoom.defaultProps = {
}

export default TestZoom
