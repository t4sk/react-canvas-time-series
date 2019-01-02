import React, { Component } from 'react'
import ReactCanvasTimeSeries, {zoomable} from 'react-canvas-time-series'

const GraphCanvas = zoomable(ReactCanvasTimeSeries.GraphCanvas)

// TODO why zoomable.numXTicks ?

class TestZoom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xMin: 0,
      xMax: 1000,
      xTickInterval: 100,
    }
  }

  onWheel = (e, mouse, graph, xRange) => {
    if (xRange) {
      e.preventDefault()

      const {
        xMin,
        xMax,
        xTickInterval,
      } = xRange

      this.setState(state => ({
        xMin,
        xMax,
        xTickInterval,
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
          yTickInterval: 10,
        }}
        xMin={this.state.xMin}
        xMax={this.state.xMax}
        yMin={0}
        yMax={100}
        onWheel={this.onWheel}
        numXTicks={10}
      />
    )
  }
}

TestZoom.defaultProps = {
}

export default TestZoom
