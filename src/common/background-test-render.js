import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as background from './background'

class BackgroundTestRender extends Component {
  componentDidMount() {
    this.ctx = {
      background: this.refs.background.getContext("2d"),
    }

    // translate by half pixel to draw thin lines
    this.ctx.background.translate(0.5, 0.5)
    this.draw()
  }

  shouldComponentUpdate() {
    return false
  }

  getMetrics() {
    // const minUnixTime = DATA[0].unixTime
    // const maxUnixTime = DATA[DATA.length - 1].unixTime
    // const xInterval = Math.ceil((maxUnixTime - minUnixTime) / (DATA.length - 1))
    // const xMin = minUnixTime - round(xInterval / 2)
    // const xMax = maxUnixTime + round(xInterval / 2)
    // const minLow = Math.min(...DATA.map(d => d.low))
    // const maxHigh = Math.max(...DATA.map(d => d.high))
    // // yInterval >= ceil((yMax - yMin) / (num intervals - 2))
    // const yInterval = Math.ceil((maxHigh - minLow) / (this.props.background.numVerticalIntervals - 2))
    // const yMin = minLow - yInterval
    // const yMax = maxHigh + yInterval
    // const maxVolume = Math.max(...DATA.map(price => price.volume))

    return {
      yMin: 10,
      yMax: 110,
    }
  }

  draw() {
    const metrics = this.getMetrics()

    background.draw(
      this.ctx.background, {
      ...this.props.background,
      ...metrics,
    })
  }

  render() {
    return (
      <div>
        <canvas
          ref="background"
          width={this.props.width}
          height={this.props.height}
        />
      </div>
    )
  }
}

BackgroundTestRender.defaultProps = {
  width: 500,
  height: 300,
  background: {
    backgroundColor: "lightgrey",
    y: {
      line: {
        color: "red",
      },
      axis: {
        at: "left",
        // label: {
        //   color: "",
        //   font: "",
        //   render: x => x,
        // }
        width: 50,
      },
      intervals: 8,
    },
    x: {
      line: {
        color: "red",
      },
      axis: {
        at: "bottom",
        // label: {
        //   color: "",
        //   font: "",
        //   render: x => x,
        // }
        height: 50,
      },
      intervals: 8,
    },
  },
}

BackgroundTestRender.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  background: PropTypes.shape({
  }).isRequired,
}

export default BackgroundTestRender
