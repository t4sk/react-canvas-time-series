import React, { Component } from 'react'
import ReactCanvasTimeSeries, {draggable, zoomable} from 'react-canvas-time-series'
import { getRandomData } from '../util'

const GraphCanvas = draggable(zoomable(ReactCanvasTimeSeries.GraphCanvas))

const X_MIN = 0
const X_MAX = 1000
const Y_MIN = 0
const Y_MAX = 100

let DATA = [
  getRandomData(10, X_MIN, X_MAX, Y_MIN, Y_MAX),
  getRandomData(10, X_MIN, X_MAX, Y_MIN, Y_MAX),
]

class LineUITestRender extends Component {
  constructor(props) {
    super(props)

    this.state = {
      xMin: X_MIN,
      xMax: X_MAX,
      yMin: Y_MIN,
      yMax: Y_MAX,
      xTickInterval: 100,
      yTickInterval: 10,
    }
  }

  onMouseMove = (e, mouse, graph, xRange) => {
    if (xRange) {
      const {
        xMin,
        xMax
      } = xRange

      this.setState(state => ({
        xMin,
        xMax
      }))
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
        xTickInterval
      }))
    }
  }

  render () {
    return (
      <div>
        <h3>Line UI</h3>
        <GraphCanvas
          background={{
            color: 'beige',
            xTickInterval: this.state.xTickInterval,
            yTickInterval: this.state.yTickInterval,
            renderXTickLabel: x => Math.round(x),
            renderYTickLabel: y => Math.round(y),
          }}
          graphs={[{
            type: 'line',
            color: 'lime',
            width: 2,
            data: DATA[0],
          }, {
            type: 'line',
            color: 'olive',
            width: 2,
            data: DATA[1],
          }]}
          showUI={true}
          ui={{
            renderXLabel: x => Math.round(x),
            renderYLabel: y => Math.round(y),
          }}
          onMouseMove={this.onMouseMove}
          onWheel={this.onWheel}
          xMin={this.state.xMin}
          xMax={this.state.xMax}
          yMin={this.state.yMin}
          yMax={this.state.yMax}
          numXTicks={10}
        />
      </div>
    )
  }
}

LineUITestRender.defaultProps = {
}

export default LineUITestRender
