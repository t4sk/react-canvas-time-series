import React, { Component } from 'react'
import {canvas, GraphCanvas} from 'react-canvas-graph'
import { rand } from '../util'
const { background, bar } = canvas

const Y_MIN = 0
const Y_MAX = 100

function generateRandomData (length) {
  let data = []

  for (let i = 0; i < length; i++) {
    data.push({
      y: rand(Y_MIN, Y_MAX),
    })
  }

  return data
}

const FIXED_DATA = [{
  y: Y_MIN
}, {
  y: Math.round((Y_MAX - Y_MIN) / 2),
}, {
  y: Y_MAX,
}]

const RANDOM_DATA_LARGE = generateRandomData(1000)
const RANDOM_DATA_SMALL = RANDOM_DATA_LARGE.slice(0, 10)
const RANDOM_DATA_MEDIUM = RANDOM_DATA_LARGE.slice(0, 100)

class BarTestRender extends Component {
  drawBackground = (ctx, props) => {
    canvas.fill(ctx, props.canvas)
    background.draw(ctx, props.background)
  }

  render () {
    return (
      <div>
        <h3>Bar (Fixed data)</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {
              ...this.props,
              background: {
                ...this.props.background,
                xMin: 0,
                xMax: FIXED_DATA.length,
              },
            })
          }}
          drawData={(ctx) => {
            bar.draw(ctx, {
              ...this.props.bar,
              data: FIXED_DATA,
              xMin: 0,
              xMax: FIXED_DATA.length,
            })
          }}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_SMALL.length} data)`}</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {
              ...this.props,
              background: {
                ...this.props.background,
                xMin: 0,
                xMax: RANDOM_DATA_SMALL.length,
              },
            })
          }}
          drawData={(ctx) => {
            bar.draw(ctx, {
              ...this.props.bar,
              data: RANDOM_DATA_SMALL,
              xMin: 0,
              xMax: RANDOM_DATA_SMALL.length,
            })
          }}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_MEDIUM.length} data)`}</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {
              ...this.props,
              background: {
                ...this.props.background,
                xMin: 0,
                xMax: RANDOM_DATA_MEDIUM.length,
              },
            })
          }}
          drawData={(ctx) => {
            bar.draw(ctx, {
              ...this.props.bar,
              data: RANDOM_DATA_MEDIUM,
              xMin: 0,
              xMax: RANDOM_DATA_MEDIUM.length,
            })
          }}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_LARGE.length} data)`}</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {
              ...this.props,
              background: {
                ...this.props.background,
                xMin: 0,
                xMax: RANDOM_DATA_LARGE.length,
              },
            })
          }}
          drawData={(ctx) => {
            bar.draw(ctx, {
              ...this.props.bar,
              data: RANDOM_DATA_LARGE,
              xMin: 0,
              xMax: RANDOM_DATA_LARGE.length,
            })
          }}
        />
      </div>
    )
  }
}

BarTestRender.defaultProps = {
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
    xInterval: 1,

    yMin: Y_MIN,
    yMax: Y_MAX,
    xMin: 0,
    xMax: 0
  },
  bar: {
    graph: {
      left: 70,
      top: 10,
      width: 400,
      height: 220
    },
    getBackgroundColor: d => 'rgba(0, 175, 0, 0.6)',
    getLineColor: d => 'yellow',
    lineWidth: 1,
    data: [],
    yMin: Y_MIN,
    yMax: Y_MAX,
    xMin: 0,
    xMax: 0
  },
}

export default BarTestRender
