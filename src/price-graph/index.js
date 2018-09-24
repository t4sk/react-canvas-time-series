import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {round} from '../common/util'
import {drawData} from './data'
import {drawBackground} from './background'

// TODO render csv data
class PriceGraph extends Component {
  componentDidMount() {
    this.ctx = {
      dataLayer: this.refs.dataLayer.getContext("2d"),
      backgroundLayer: this.refs.backgroundLayer.getContext("2d"),
    }

    // TODO remove me
    // TODO render at 10 ms
    // TODO simulate data over network
    // TODO render data in interval
    // setInterval(() => {
    //   genFakeData()
    //   if (DATA.length > 50) {
    //     DATA.shift()
    //   }
    //   this.draw()
    // }, 100)

    // translate by half pixel to draw thin lines
    this.ctx.backgroundLayer.translate(0.5, 0.5)
    this.draw()
  }

  shouldComponentUpdate() {
    // let canvas render
    return false
  }

  getMetrics() {
    const minUnixTime = DATA[0].unixTime
    const maxUnixTime = DATA[DATA.length - 1].unixTime
    const xInterval = Math.ceil((maxUnixTime - minUnixTime) / (DATA.length - 1))
    const xMin = minUnixTime - round(xInterval / 2)
    const xMax = maxUnixTime + round(xInterval / 2)
    const minLow = Math.min(...DATA.map(d => d.low))
    const maxHigh = Math.max(...DATA.map(d => d.high))
    // yInterval >= ceil((yMax - yMin) / (num intervals - 2))
    const yInterval = Math.ceil((maxHigh - minLow) / (this.props.background.numVerticalIntervals - 2))
    const yMin = minLow - yInterval
    const yMax = maxHigh + yInterval
    const maxVolume = Math.max(...DATA.map(price => price.volume))

    return {
      maxVolume,
      xMin,
      xMax,
      yMin,
      yMax,
      xInterval,
      yInterval,
    }
  }

  draw() {
    this.ctx.dataLayer.clearRect(
      0, 0,
      this.ctx.backgroundLayer.canvas.width,
      this.ctx.backgroundLayer.canvas.height
    )

    const metrics = this.getMetrics()

    drawBackground(
      this.ctx.backgroundLayer, {
      ...this.props,
      ...metrics,
    })

    drawData(this.ctx.dataLayer, {
      ...this.props,
      ...metrics,
    }, DATA)
  }

  render() {
    return (
      <div style={{
        ...style.container,
        width: this.props.width,
        height: this.props.height,
      }}>
        <canvas
          style={style.backgroundLayer}
          ref="backgroundLayer"
          width={this.props.width}
          height={this.props.height}
        >
        </canvas>
        <canvas
          style={style.dataLayer}
          ref="dataLayer"
          width={this.props.width - this.props.background.yAxisPaddRight}
          height={this.props.height - this.props.background.xAxisPaddBottom}
        >
        </canvas>
      </div>
    )
  }
}

const style = {
  container: {
    position: "relative",
  },
  backgroundLayer: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 1
  },
  dataLayer: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 2,
  },
}

PriceGraph.defaultProps = {
  width: 500,
  height: 300,
  background: {
    color: "#2f3d45",
    xAxisPaddBottom: 50,
    yAxisPaddRight: 50,
    numVerticalIntervals: 6,
    numHorizontalIntervals: 6,
  },
  priceLine: {
    color: "green",
  },
}

PriceGraph.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  background :PropTypes.shape({
    color: PropTypes.string.isRequired,
    yAxisPaddRight: PropTypes.number.isRequired,
    xAxisPaddBottom: PropTypes.number.isRequired,
    numHorizontalIntervals: PropTypes.number.isRequired,
    numVerticalIntervals: PropTypes.number.isRequired,
  }).isRequired,
}

export default PriceGraph

let DATA = []
for (let i = 0; i < 50; i++) {
  const high = randInt(60, 100)
  const low = randInt(0, 30)
  const open = randInt(low, high)
  const close = randInt(low, high)
  const volume = randInt(0, 100)

  const date = new Date()

  DATA[i] = {
    high,
    low,
    open,
    close,
    unixTime: Date.now() - (50 * 100) + 100 * i,
    volume,
  }
}

// TODO remove me
function genFakeData() {
  const high = randInt(60, 100)
  const low = randInt(0, 30)
  const open = randInt(low, high)
  const close = randInt(low, high)
  const volume = randInt(0, 100)

  const date = new Date()

  DATA.push({
    high,
    low,
    open,
    close,
    unixTime: Date.now(),
    volume,
  })
}

function rand(min, max) {
  return Math.random() * (max - min) + min
}

function randInt(min, max) {
  return Math.floor(rand(min, max))
}
