import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {round} from './util'
import {drawData} from './data'
import {
  SCALE_X_HEIGHT,
  SCALE_Y_WIDTH,
  NUM_VERTICAL_INTERVALS,
  NUM_HORIZONTAL_INTERVALS,
  drawBackground,
} from './background'
import {drawUI, drawLatestPriceLabel} from './ui'

// TODO SCALE_X_HEIGHT, SCALE_Y_WIDTH should be defined here
// TODO queue real time data
// TODO? object pool
// TODO use requestAnimationFrame?
// TODO render streamed data
// TODO zoom
// TODO rendering price label inside bar chart?
class Candlestick extends Component {
  constructor(props) {
    super(props)

    this.mouse = {
      canvasX: undefined,
      canvaxY: undefined,
    }
  }

  componentDidMount() {
    this.ctx = {
      dataLayer: this.refs.dataLayer.getContext("2d"),
      backgroundLayer: this.refs.backgroundLayer.getContext("2d"),
      uiLayer: this.refs.uiLayer.getContext("2d"),
    }

    // TODO remove me
    // TODO render at 10 ms
    // TODO fix initial render does not work
    // setInterval(() => {
    //   genFakeData()
    //   if (DATA.length > 50) {
    //     DATA.shift()
    //   }
    //   this.draw()
    // }, 100)

    // translate by half pixel to draw thin lines
    this.ctx.backgroundLayer.translate(0.5, 0.5)
    this.ctx.uiLayer.translate(0.5, 0.5)

    this.ctx.uiLayer.canvas.addEventListener('mousemove', e => {
      const rect = this.ctx.uiLayer.canvas.getBoundingClientRect()

      this.mouse.canvasX = e.clientX - rect.left
      this.mouse.canvasY = e.clientY - rect.top

      drawUI(this.ctx.uiLayer, this.props.ui, this.mouse, DATA)
    })

    this.draw()
  }

  shouldComponentUpdate() {
    // let canvas render
    return false
  }

  draw() {
    const minTimestamp = DATA[0].timestamp
    const maxTimestamp = DATA[DATA.length - 1].timestamp
    const xInterval = Math.ceil((maxTimestamp - minTimestamp) / (DATA.length - 1))
    const xMin = minTimestamp - round(xInterval / 2)
    const xMax = maxTimestamp + round(xInterval / 2)
    const minLow = Math.min(...DATA.map(d => d.low))
    const maxHigh = Math.max(...DATA.map(d => d.high))
    // yInterval >= ceil((yMax - yMin) / (num intervals - 2))
    const yInterval = Math.ceil((maxHigh - minLow) / (NUM_HORIZONTAL_INTERVALS - 2))
    const yMin = minLow - yInterval
    const yMax = maxHigh + yInterval
    const maxVolume = Math.max(...DATA.map(price => price.volume))

    this.ctx.dataLayer.clearRect(0, 0, this.ctx.backgroundLayer.canvas.width, this.ctx.backgroundLayer.canvas.height)

    // background layer-
    drawBackground(this.ctx.backgroundLayer, this.props, {
      xMin, xMax, xInterval, yMin, yMax, maxVolume
    })

    // data layer
    drawData(this.ctx.dataLayer, this.props, {
      xMin,
      xMax,
      xInterval,
      yMin,
      yMax,
    }, DATA)

    // ui layer
    drawUI(this.ctx.uiLayer, this.props.ui, this.mouse, DATA)
  }

  render() {
    return (
      <div style={style.container}>
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
          width={this.props.width - SCALE_Y_WIDTH}
          height={this.props.height - SCALE_X_HEIGHT}
        >
        </canvas>
        <canvas
          style={style.uiLayer}
          ref="uiLayer"
          width={this.props.width}
          height={this.props.height}
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
  uiLayer: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 2,
  },
}

Candlestick.defaultProps = {
  background: {
    color: "#2f3d45",
  },
  width: 500,
  height: 300,
  candlestick: {
    bull: {
      color: "lightgreen",
    },
    bear: {
      color: "red"
    },
  },
  volumeBarChart: {
    // TODO compute volume bar chart height from easier setting than pixel
    height: 73,
  },
  ui: {
    latestPriceLabel: {
      bull: {
        color: "green",
      },
      bear: {
        color: "red",
      },
    },
  }
}

Candlestick.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  background :PropTypes.shape({
    color: PropTypes.string.isRequired,
  }).isRequired,
  volumeBarChart: PropTypes.shape({
    height: PropTypes.number.isRequired,
  }).isRequired,
  candlestick: PropTypes.shape({
    bull: PropTypes.shape({
      color: PropTypes.string.isRequired,
    }).isRequired,
    bear: PropTypes.shape({
      color: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired,
  ui: PropTypes.shape({
    latestPriceLabel: PropTypes.shape({
      bull: PropTypes.shape({
        color: PropTypes.string.isRequired,
      }).isRequired,
      bear: PropTypes.shape({
        color: PropTypes.string.isRequired
      }).isRequired,
    }).isRequired,
  }).isRequired,
}

export default Candlestick

let DATA = []
for (let i = 0; i < 50; i++) {
  const high = randInt(60, 100)
  const low = randInt(0, 30)
  const open = randInt(low, high)
  const close = randInt(low, high)
  const volume = randInt(0, 100)

  DATA[i] = {
    high,
    low,
    open,
    close,
    timestamp: i * 100 + 100,
    volume,
  }
}

// TODO remove me
let i = 0
function genFakeData() {
  i++
  const high = randInt(60, 100)
  const low = randInt(0, 30)
  const open = randInt(low, high)
  const close = randInt(low, high)
  const volume = randInt(0, 100)

  DATA.push({
    high,
    low,
    open,
    close,
    timestamp: i * 100 + 100,
    volume,
  })
}

function rand(min, max) {
  return Math.random() * (max - min) + min
}

function randInt(min, max) {
  return Math.floor(rand(min, max))
}
