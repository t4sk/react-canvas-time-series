import React, { Component } from 'react'
import ReactCanvasTimeSeries, {draggable, zoomable} from 'react-canvas-time-series'
import { getRandomData, fakeFetch } from '../util'

const GraphCanvas = draggable(zoomable(ReactCanvasTimeSeries.GraphCanvas))

const X_MIN = 0
const X_MAX = 1000
const Y_MIN = 0
const Y_MAX = 100
const Y_TICK_INTERVAL = 10

class LineUITestRender extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [[], []],
      xMin: X_MIN,
      xMax: X_MAX,
      xTickInterval: 100,
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  async fetchData() {
    const data = await fakeFetch(
      [
        getRandomData(10, X_MIN, X_MAX, Y_MIN, Y_MAX),
        getRandomData(10, X_MIN, X_MAX, Y_MIN, Y_MAX),
      ],
      1000
    )

    this.setState({
      data,
    })
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
            yTickInterval: Y_TICK_INTERVAL,
            renderXTickLabel: x => Math.round(x),
            renderYTickLabel: y => Math.round(y),
          }}
          graphs={[{
            type: 'line',
            color: 'lime',
            width: 2,
            data: this.state.data[0],
          }, {
            type: 'line',
            color: 'olive',
            width: 2,
            data: this.state.data[1],
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
          yMin={Y_MIN}
          yMax={Y_MAX}
          numXTicks={10}
        />
      </div>
    )
  }
}

LineUITestRender.defaultProps = {
}

export default LineUITestRender
