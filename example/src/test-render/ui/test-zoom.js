import React, { Component } from 'react'
import ReactCanvasTimeSeries, {zoomable} from 'react-canvas-time-series'

const GraphCanvas = zoomable(ReactCanvasTimeSeries.GraphCanvas)

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

  onWheel = (e, mouse, range) => {
    if (range) {
      e.preventDefault()

      const {
        xMin,
        xMax,
        yMin,
        yMax,
        xTickInterval,
        yTickInterval
      } = range

      this.setState(state => ({
        xMin,
        xMax,
        yMin,
        yMax,
        xTickInterval,
        yTickInterval
      }))
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
