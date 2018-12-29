import React, { Component } from 'react'
import ReactCanvasTimeSeries, {canvas, draggable, zoomable} from 'react-canvas-time-series'
import { getRandomCandlestickData, fakeFetch, debounce } from '../../util'
const { ui, math } = canvas

const GraphCanvas = draggable(zoomable(ReactCanvasTimeSeries.GraphCanvas))

const X_STEP = 100
const Y_MIN = 0
const Y_MAX = 100

const CACHE = {
  xMin: undefined,
  xMax: undefined,
  data: {}
}

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
      data: [],
      xMin: 10000,
      xMax: 11000,
      xTickInterval: 100,
      width: Math.floor(430 / 1000 * X_STEP) - 2
    }

    this.fetchData = debounce(this.fetchData, 500)
  }

  componentDidMount() {
    this.fetchData({
      xMin: this.state.xMin,
      xMax: this.state.xMax,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.xMin != prevState.xMin || prevState.xMax != this.state.xMax) {
      if (CACHE.xMin < this.state.xMin || CACHE.xMax > this.state.xMax) {
        // const data = Object.values(CACHE.data).filter(
        //   d => d.timestamp >= this.state.xMin && d.timestamp <= this.state.xMax
        // )

        const data = Object.values(CACHE.data)

        data.sort((a, b) => a.timestamp - b.timestamp)

        this.setState({
          data,
        })

        return
      }

      this.fetchData({
        xMin: this.state.xMin,
        xMax: this.state.xMax,
      })
    }
  }

  async fetchData(args) {
    const {
      xMin,
      xMax
    } = args

    const res = await fakeFetch(
      getRandomCandlestickData(100,
        Math.floor(xMin / 100) * 100,
        Math.ceil(xMax / 100) * 100,
        Y_MIN,
        Y_MAX
      ),
      500
    )

    CACHE.xMin = Math.min(CACHE.xMin, xMin)
    CACHE.xMax = Math.min(CACHE.xMax, xMax)

    for (let d of res) {
      if (!CACHE.data[d.timestamp]) {
        CACHE.data[d.timestamp] = d
      }
    }

    // const data = Object.values(CACHE.data).filter(d => d.timestamp >= xMin && d.timestamp <= xMax)
    const data = Object.values(CACHE.data)

    data.sort((a, b) => a.timestamp - b.timestamp)

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

      const x = math.toX({
        width: 430,
        left: 10,
        xMin: this.state.xMin,
        xMax: this.state.xMax,
      })(this.mouse.x)

      const i = math.findNearestIndex(this.state.data.map(d => d.timestamp), x)

      if (this.state.data[i]) {
        const canvasX = math.toCanvasX({
          width: 430,
          left: 10,
          xMin: this.state.xMin,
          xMax: this.state.xMax,
        })(this.state.data[i].timestamp)

        this.candlestick.cursor.x = canvasX
        this.volume.cursor.x = canvasX
      }
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

      const width = Math.max(
        1,
        Math.floor(430 / (xMax - xMin) * X_STEP) - 2
      )

      this.setState(state => ({
        xMin,
        xMax,
        xTickInterval,
        width,
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
            data: this.state.data,
            width: this.state.width,
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
            data: this.state.data.map(d => ({
              x: d.timestamp,
              y: d.volume,
            })),
            width: this.state.width,
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
