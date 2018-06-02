import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {floor, linear} from './util'
import drawCandlestick from './candlestick'
import {
  SCALE_X_HEIGHT,
  SCALE_Y_WIDTH,
  drawVerticalLines,
  drawHorizontalLines
} from './background'

// TODO queue real time data
// TODO object pool
// TODO use more than one canvas
// TODO render elements off screen
// TODO bitwise operator for math
// TODO use requestAnimationFrame?

class Candlestick extends Component {
  componentDidMount() {
    this.ctx = {
      dataLayer: this.refs.dataLayer.getContext("2d"),
      background: this.refs.background.getContext("2d"),
    }

    this.draw()
  }

  draw() {
    const xMin = 100
    const xMax = 200
    const yMin = 30
    const yMax = 100

    const scaleX = floor(this.ctx.dataLayer.canvas.width / (xMax - xMin))
    const scaleY = floor(this.ctx.dataLayer.canvas.height / (yMax - yMin))

    this.ctx.dataLayer.clearRect(0, 0, this.ctx.background.width, this.ctx.background.height)

    // -------- background layer --------
    this.ctx.background.fillStyle = "lightgrey"
    this.ctx.background.fillRect(
      0, 0,
      this.ctx.background.canvas.width,
      this.ctx.background.canvas.height,
    )

    this.ctx.background.fillStyle = "white" || this.props.backgroundColor
    this.ctx.background.fillRect(
      0, 0,
      this.ctx.background.canvas.width - SCALE_Y_WIDTH,
      this.ctx.background.canvas.height - SCALE_X_HEIGHT,
    )

    // translate by half pixel to draw thin lines
    this.ctx.background.translate(0.5, 0.5)

    // style lines
    this.ctx.background.lineWidth = 1
    this.ctx.background.strokeStyle = "lightgrey"

    // style labels
    this.ctx.background.font = "12px Arial"
    this.ctx.background.fillStyle = "black"
    this.ctx.background.textBaseline = "middle"
    this.ctx.background.textAlign = "center"

    drawHorizontalLines(this.ctx.background, this.props, {
      yMin, yMax,
    })

    drawVerticalLines(this.ctx.background, this.props, {
      xMin, xMax,
    })

    // ------ data layer -----------
    // candlesticks
    const x1 = 20
    const x0 = 10
    const width = scaleX * (x1 - x0)

    drawCandlestick(this.ctx.dataLayer, this.props, {
      x: x0,
      width,
      yMin,
      scaleY,
    }, {
      high: 85,
      low: 65,
      open: 70,
      close: 80,
    })

    drawCandlestick(this.ctx.dataLayer, this.props, {
      x: width + x1,
      width,
      yMin,
      scaleY,
    }, {
      high: 75,
      low: 55,
      open: 70,
      close: 60,
    })
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
