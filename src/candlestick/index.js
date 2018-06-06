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

class Candlestick extends Component {
  componentDidMount() {
    this.ctx = {
      dataLayer: this.refs.dataLayer.getContext("2d"),
      background: this.refs.background.getContext("2d"),
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

const DATA = [{
  high: 85,
  low: 65,
  open: 70,
  close: 80,
  timestamp: 100
}, {
  high: 75,
  low: 55,
  open: 70,
  close: 60,
  timestamp: 110,
}, {
  high: 85,
  low: 65,
  open: 70,
  close: 80,
  timestamp: 120
}, {
  high: 75,
  low: 55,
  open: 70,
  close: 60,
  timestamp: 130,
}, {
  high: 85,
  low: 65,
  open: 70,
  close: 80,
  timestamp: 140
}, {
  high: 75,
  low: 55,
  open: 70,
  close: 60,
  timestamp: 150,
}, {
  high: 85,
  low: 65,
  open: 70,
  close: 80,
  timestamp: 160
}, {
  high: 75,
  low: 55,
  open: 70,
  close: 60,
  timestamp: 170,
}, {
  high: 85,
  low: 65,
  open: 70,
  close: 80,
  timestamp: 180
}, {
  high: 75,
  low: 55,
  open: 70,
  close: 60,
  timestamp: 190,
}, {
  high: 85,
  low: 65,
  open: 70,
  close: 80,
  timestamp: 200
}]
