import React, { Component } from 'react'
import ReactCanvasTimeSeries, {draggable} from 'react-canvas-time-series'

const GraphCanvas = draggable(ReactCanvasTimeSeries.GraphCanvas)

class TestDrag extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xMin: 0,
      xMax: 1000,
    }
  }

  onMouseMove = (e, mouse, graph, xRange) => {
    if (xRange) {
      const {
        xMin, xMax
      } = xRange

      this.setState((state) => ({
        xMin,
        xMax
      }))
      return
    }
  }

  render () {
    return (
      <GraphCanvas
        {...this.props}
        onMouseMove={this.onMouseMove}
        xMin={this.state.xMin}
        xMax={this.state.xMax}
      />
    )
  }
}

export default TestDrag
