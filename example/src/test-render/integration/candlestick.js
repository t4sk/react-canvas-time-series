import React, { Component } from 'react'
import ReactCanvasTimeSeries, {canvas, draggable, zoomable} from 'react-canvas-time-series'
import { getRandomCandlestickData, fakeFetch, debounce } from '../../util'
const { ui, math } = canvas

const GraphCanvas = draggable(zoomable(ReactCanvasTimeSeries.GraphCanvas))

const X_MIN = 0
const X_MAX = 1000
const Y_MIN = 0
const Y_MAX = 100

const DATA = getRandomCandlestickData(20, X_MIN, X_MAX, Y_MIN, Y_MAX)

class TestCandlestick extends Component {
  constructor(props) {
    super(props)

    this.ref = React.createRef()

    this.mouse = {
      x: undefined,
      y: undefined,
    }

    this.candlestick = {
      cursor: {
        x: undefined,
        y: undefined,
      }
    }

    this.volume = {
      cursor: {
        x: undefined,
        y: undefined,
      }
    }

    this.state = {
      xMin: 0,
      xMax: 1000,
      xTickInterval: 100,
    }
  }

  async fetchData(args) {
    const {
      xMin,
      xMax
    } = args

    const data = await fakeFetch(
      [
        getRandomCandlestickData(10, xMin, xMax, Y_MIN, Y_MAX),
        getRandomCandlestickData(10, xMin, xMax, Y_MIN, Y_MAX),
      ],
      1000
    )

    this.setState(state => ({
      data,
    }))
  }

  onMouseMove = (e) => {
    const rect = this.ref.current.getBoundingClientRect()

    this.mouse.x = e.clientX - rect.left
    this.mouse.y = e.clientY - rect.top

    const { x, y } = this.mouse

    if (x < 10 || x > 440 || y < 10 || y > 390) {
      this.candlestick.cursor.x = undefined
      this.volume.cursor.x = undefined

      this.candlestick.cursor.y = undefined
      this.volume.cursor.y = undefined

      return
    }

    this.candlestick.cursor.x = undefined
    this.volume.cursor.x = undefined

    if (this.mouse.x >= 10 && this.mouse.x <= 440) {
      this.candlestick.cursor.x = this.mouse.x
      this.volume.cursor.x = this.mouse.x
    }

    this.candlestick.cursor.y = undefined
    this.volume.cursor.y = undefined

    if (this.mouse.y >= 10 && this.mouse.y <= 290) {
      this.candlestick.cursor.y = this.mouse.y
    }
    else if (this.mouse.y >= 310 && this.mouse.y <= 390) {
      this.volume.cursor.y = this.mouse.y - 300
    }
  }

  onMouseOut = (e) => {
    this.mouse.x = undefined
    this.mouse.y = undefined

    this.candlestick.cursor.x = undefined
    this.volume.cursor.x = undefined

    this.candlestick.cursor.y = undefined
    this.volume.cursor.y = undefined
  }

  onMouseMoveGraph = (e, mouse, graph, xRange) => {
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

  onWheelGraph = (e, mouse, graph, xRange) => {
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
      <div
        ref={this.ref}
        style={{
          width: 500,
          height: 450
        }}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseOut}
      >
        <GraphCanvas
          {...this.props}
          background={{
            ...this.props.background,
            yAxisAt: 'right',
            showXTick: false,
            xAxisHeight: 0,
            yTickInterval: 10,
            xTickInterval: this.state.xTickInterval,
          }}
          ui={{
            ...this.props.ui,
            yLabelAt: 'right',
            showXLabel: false,
          }}
          xMin={this.state.xMin}
          xMax={this.state.xMax}
          yMin={Y_MIN}
          yMax={Y_MAX}
          graphs={[{
            type: 'candlestick',
            data: DATA
          }]}
          cursor={this.candlestick.cursor}
          shouldDrawUI={() => this.candlestick.cursor.x || this.candlestick.cursor.y}
          onMouseMove={this.onMouseMoveGraph}
          onWheel={this.onWheelGraph}
          numXTicks={10}
        />

        <GraphCanvas
          {...this.props}
          height={150}
          background={{
            ...this.props.background,
            yAxisAt: 'right',
            yTickInterval: 25,
            xTickInterval: this.state.xTickInterval,
          }}
          ui={{
            ...this.props.ui,
            yLabelAt: 'right',
          }}
          xMin={this.state.xMin}
          xMax={this.state.xMax}
          yMin={Y_MIN}
          yMax={Y_MAX}
          graphs={[{
            type: 'bar',
            data: DATA.map(d => ({
              x: d.timestamp,
              y: d.volume,
            }))
          }]}
          cursor={this.volume.cursor}
          shouldDrawUI={() => this.volume.cursor.x || this.volume.cursor.y}
          onMouseMove={this.onMouseMoveGraph}
          onWheel={this.onWheelGraph}
          numXTicks={10}
        />
      </div>
    )
  }
}

TestCandlestick.defaultProps = {
}

export default TestCandlestick
