import React, {Component} from 'react'
import PropTypes from 'prop-types'

function drawCandlestick(ctx, props, data) {
  // TODO scale
  const {high, low, open, close} = data

  if (open <= close) {
    ctx.strokeStyle = props.candlestick.bull.color
    ctx.strokeRect(100, 100, 20, 30)
  } else {
    ctx.strokeStyle = props.candlestick.bear.color
    ctx.fillStyle = props.candlestick.bear.color
    ctx.fillRect(100, 100, 20, 30)
  }

  ctx.beginPath()
  ctx.moveTo(110,145)
  ctx.lineTo(110,175)
  ctx.stroke()
}

class Candlestick extends Component {
  componentDidMount() {
    this.ctx = this.refs.canvas.getContext("2d")

    this.draw()
  }

  draw() {
    this.ctx.clearRect(0, 0, this.props.width, this.props.height)

    // background
    this.ctx.fillStyle = this.props.backgroundColor
    this.ctx.fillRect(0, 0, this.props.width, this.props.height)

    drawCandlestick(this.ctx, this.props, {
      high: 100,
      low: 50,
      open: 70,
      close: 90,
    })
  }

  render() {
    return (
      <canvas
        ref="canvas"
        width={this.props.width}
        height={this.props.height}
        style={{
          border: "1px solid #000000",
          width: this.props.width,
          height: this.props.height,
        }}
      >
      </canvas>
    )
  }
}

Candlestick.defaultProps = {
  backgroundColor: "#2f3d45",
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
