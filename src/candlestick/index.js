import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {floor, linear} from './util'
import {drawCandlesticks} from './candlestick'
import {
  SCALE_X_HEIGHT,
  SCALE_Y_WIDTH,
  NUM_HORIZONTAL_INTERVALS,
  drawBackground,
} from './background'

// TODO queue real time data
// TODO object pool
// TODO use more than one canvas
// TODO render elements off screen
// TODO bitwise operator for math
// TODO use requestAnimationFrame?
// TODO render streamed data
// TODO render mouseY -> price
// TODO render mouseX -> timestamp

class Candlestick extends Component {
  componentDidMount() {
    this.ctx = {
      dataLayer: this.refs.dataLayer.getContext("2d"),
      background: this.refs.background.getContext("2d"),
      uiLayer: this.refs.uiLayer.getContext("2d"),
    }

    this.draw()
  }

  draw() {
    const xMin = DATA[0].timestamp
    const xMax = DATA[DATA.length - 1].timestamp
    const xInterval = (xMax - xMin) / (DATA.length - 1)
    const minLow = Math.min(...DATA.map(d => d.low))
    const maxHigh = Math.max(...DATA.map(d => d.high))
    // yInterval >= ceil((yMax - yMin) / (num intervals - 2))
    const yInterval = Math.ceil((maxHigh - minLow) / (NUM_HORIZONTAL_INTERVALS - 2))
    const yMin = minLow - yInterval
    const yMax = maxHigh + yInterval

    this.ctx.dataLayer.clearRect(0, 0, this.ctx.background.width, this.ctx.background.height)

    // -------- background layer --------
    drawBackground(this.ctx.background, this.props, {
      xMin, xMax, xInterval, yMin, yMax,
    })

    // ------ data layer -----------
    // candlesticks
    drawCandlesticks(this.ctx.dataLayer, this.props, {
      xMin,
      xMax,
      xInterval,
      yMin,
      yMax,
    }, DATA)

    // ui layer
    const mouseCanvasY = 30
    // translate by half pixel to draw thin lines
    this.ctx.uiLayer.translate(0.5, 0.5)

    // line
    this.ctx.uiLayer.strokeStyle = "black"
    this.ctx.uiLayer.setLineDash([5, 5])

    this.ctx.uiLayer.moveTo(0, mouseCanvasY)
    this.ctx.uiLayer.lineTo(this.ctx.dataLayer.canvas.width, mouseCanvasY)
    this.ctx.uiLayer.stroke()

    // label
    this.ctx.uiLayer.fillStyle = "black"

    const labelHeight = 20
    const labelWidth = SCALE_Y_WIDTH
    // label tip
    this.ctx.uiLayer.beginPath()
    this.ctx.uiLayer.moveTo(
      this.ctx.dataLayer.canvas.width - 5,
      mouseCanvasY,
    )
    this.ctx.uiLayer.lineTo(
      this.ctx.dataLayer.canvas.width,
      mouseCanvasY - floor(labelHeight / 2),
    )
    this.ctx.uiLayer.lineTo(
      this.ctx.dataLayer.canvas.width,
      mouseCanvasY + floor(labelHeight / 2),
    )
    this.ctx.uiLayer.fill()

    this.ctx.uiLayer.fillRect(
      this.ctx.dataLayer.canvas.width,
      mouseCanvasY - floor(labelHeight / 2),
      labelWidth, labelHeight
    )

    this.ctx.uiLayer.font = "12px Arial"
    this.ctx.uiLayer.fillStyle = "white"
    this.ctx.uiLayer.textBaseline = "middle"

    const y = 100
    this.ctx.uiLayer.fillText(
      y,
      this.ctx.dataLayer.canvas.width + 10,
      mouseCanvasY
    )
  }

  render() {
    return (
      <div style={style.container}>
        <canvas
          style={style.background}
          ref="background"
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
  background: {
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
  backgroundColor: "#2f3d45",
  width: 500,
  height: 300,
  candlestick: {
    bull: {
      color: "lightgreen",
    },
    bear: {
      color: "red"
    },
  }
}

Candlestick.propTypes = {
  backgroundColor: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  candlestick: PropTypes.shape({
    bull: PropTypes.shape({
      color: PropTypes.string.isRequired,
    }).isRequired,
    bear: PropTypes.shape({
      color: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired,
}

export default Candlestick

let DATA = []
for (let i = 0; i < 10; i++) {
  const high = randInt(60, 100)
  const low = randInt(0, 30)
  const open = randInt(low, high)
  const close = randInt(low, high)

  DATA[i] = {
    high,
    low,
    open,
    close,
    timestamp: i * 100 + 100
  }
}

function rand(min, max) {
  return Math.random() * (max - min) + min
}

function randInt(min, max) {
  return Math.floor(rand(min, max))
}
