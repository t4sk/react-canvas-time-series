import React, { Component } from 'react'
import {canvas, GraphCanvas} from 'react-canvas-graph'
import { rand } from '../util'
const { background, candlestick } = canvas

const X_MIN = 1900
const X_MAX = 2018
const Y_MIN = 0
const Y_MAX = 100

function generateRandomData (length) {
  let data = []

  for (let i = 0; i < length; i++) {
    const high = rand(Y_MIN, Y_MAX)
    const low = rand(Y_MIN, high)
    const open = rand(low, high)
    const close = rand(low, high)

    data.push({
      high,
      low,
      open,
      close
    })
  }

  return data
}

const FIXED_DATA = [{
  high: Y_MAX - 10,
  low: Y_MIN,
  open: Y_MIN + 10,
  close: Y_MAX - 20
}, {
  high: Y_MAX,
  low: Y_MIN + 10,
  open: Y_MAX - 10,
  close: Y_MIN + 20
}]

const RANDOM_DATA_SMALL = generateRandomData(10)
const RANDOM_DATA_MEDIUM = generateRandomData(100)
const RANDOM_DATA_LARGE = generateRandomData(1000)

// TODO render time at candlestick
class CandlestickTestRender extends Component {
  drawBackground = (ctx) => {
    canvas.fill(ctx, this.props.canvas)
    background.draw(ctx, this.props.background)
  }

  render () {
    return (
      <div>
        <h3>Candlestick (Fixed data)</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {
              ...this.props.background,
              xMin: X_MIN,
              xMax: X_MAX,
              yMin: Y_MIN,
              yMax: Y_MAX,
            })
          }}
          drawData={(ctx) => {
            candlestick.draw(ctx, {
              ...this.props.candlestick,
              data: FIXED_DATA,
              yMin: Y_MIN,
              yMax: Y_MAX,
            })
          }}
        />

        <h3>{`Candlestick (Random ${RANDOM_DATA_SMALL.length} data)`}</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {
              ...this.props.background,
              xMin: X_MIN,
              xMax: X_MAX,
              yMin: Y_MIN,
              yMax: Y_MAX,
            })
          }}
          drawData={(ctx) => {
            candlestick.draw(ctx, {
              ...this.props.candlestick,
              data: RANDOM_DATA_SMALL,
              yMin: Y_MIN,
              yMax: Y_MAX,
            })
          }}
        />

        <h3>{`Candlestick (Random ${RANDOM_DATA_MEDIUM.length} data)`}</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {
              ...this.props.background,
              xMin: X_MIN,
              xMax: X_MAX,
              yMin: Y_MIN,
              yMax: Y_MAX,
            })
          }}
          drawData={(ctx) => {
            candlestick.draw(ctx, {
              ...this.props.candlestick,
              data: RANDOM_DATA_MEDIUM,
              yMin: Y_MIN,
              yMax: Y_MAX,
            })
          }}
        />

        <h3>{`Candlestick (Random ${RANDOM_DATA_LARGE.length} data)`}</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {
              ...this.props.background,
              xMin: X_MIN,
              xMax: X_MAX,
              yMin: Y_MIN,
              yMax: Y_MAX,
            })
          }}
          drawData={(ctx) => {
            candlestick.draw(ctx, {
              ...this.props.candlestick,
              data: RANDOM_DATA_LARGE,
              yMin: Y_MIN,
              yMax: Y_MAX,
            })
          }}
        />
      </div>
    )
  }
}

CandlestickTestRender.defaultProps = {
  canvas: {
    width: 500,
    height: 300,
    backgroundColor: 'beige',
  },
  background: {
    top: 10,
    left: 20,
    width: 450,
    height: 270,
    backgroundColor: 'lightgrey',

    showYLabel: true,
    showYLine: true,
    yLineWidth: 1,
    yLineColor: 'red',
    yAxisAt: 'left',
    yAxisWidth: 50,
    yLabelFont: '12px Arial',
    yLabelColor: 'black',
    renderYLabel: y => y,
    yInterval: 10,

    showXLabel: true,
    showXLine: true,
    xLineWidth: 1,
    xLineColor: 'blue',
    xAxisAt: 'bottom',
    xAxisHeight: 50,
    xLabelFont: '12px Arial',
    xLabelColor: 'black',
    renderXLabel: x => x,
    xInterval: 15,

    xMin: X_MIN,
    xMax: X_MAX,
    yMin: Y_MIN,
    yMax: Y_MAX,
  },
  candlestick: {
    graph: {
      left: 70,
      top: 10,
      width: 400,
      height: 220
    },
    wickWidth: 2,
    getWickColor: (d) => d.open <= d.close ? 'blue' : 'orange',
    lineWidth: 1,
    getLineColor: (d) => d.open <= d.close ? 'green' : 'red',
    getBackgroundColor: (d) => d.open <= d.close ? 'lightgreen' : 'pink',
    data: [],
    yMin: 0,
    yMax: 0,
  },
}

export default CandlestickTestRender
