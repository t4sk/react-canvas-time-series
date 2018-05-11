import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {floor} from './util'
import drawCandlestick from './candlestick'

const SCALE_Y_WIDTH = 50
const SCALE_X_HEIGHT = 50

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
      scaleLayer: this.refs.scaleLayer.getContext("2d"),
    }

    this.draw()
  }

  draw() {
    this.ctx.dataLayer.clearRect(0, 0, this.props.width, this.props.height)

    console.log(this.ctx.scaleLayer.canvas.width)

    // -------- scale layer --------
    this.ctx.scaleLayer.fillStyle = "black"
    this.ctx.scaleLayer.fillRect(
      0, 0,
      this.ctx.scaleLayer.canvas.width,
      this.ctx.scaleLayer.canvas.height,
    )

    // draw horizontal lines
    // draw vertical lines

    // ------ data layer -----------
    // background
    this.ctx.dataLayer.fillStyle = this.props.backgroundColor
    this.ctx.dataLayer.fillRect(
      0, 0,
      this.ctx.dataLayer.canvas.width,
      this.ctx.dataLayer.canvas.height,
    )

    // candlesticks
    const xMin = 100
    const xMax = 200
    const yMin = 30
    const yMax = 100
    const scaleX = floor(this.ctx.dataLayer.canvas.width / (xMax - xMin))
    const scaleY = floor(this.ctx.dataLayer.canvas.height / (yMax - yMin))

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
          style={style.scaleLayer}
          ref="scaleLayer"
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
  scaleLayer: {
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
