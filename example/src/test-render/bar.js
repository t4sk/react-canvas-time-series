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
      x: i,
      y: rand(Y_MIN, Y_MAX),
    })
  }

  return data
}

const FIXED_DATA = [{
  x: 0,
  y: Y_MIN
}, {
  x: 1,
  y: Math.round((Y_MAX - Y_MIN) / 2),
}, {
  x: 2,
  y: Y_MAX,
}]

const RANDOM_DATA_LARGE = generateRandomData(1000)
const RANDOM_DATA_SMALL = RANDOM_DATA_LARGE.slice(0, 10)
const RANDOM_DATA_MEDIUM = RANDOM_DATA_LARGE.slice(0, 100)

const NUM_Y_INTERVALS = 10

class BarTestRender extends Component {
  drawBackground = (ctx, props, data) => {
    const yMin = 0
    const yMax = Math.max(Math.max(...data.map(d => d.y)), 10)

    const yStep = Math.floor((yMax - yMin) / NUM_Y_INTERVALS)

    if (data.length == 0) {
      canvas.fill(ctx, props.canvas)
      background.draw(ctx, {
        ...props.background,
        yMin,
        yMax,
        yStep,
        xMin: 0,
        xMax: 0,
      })
    } else if (data.length == 1) {
      canvas.fill(ctx, props.canvas)
      background.draw(ctx, {
        ...props.background,
        yMin,
        yMax,
        yStep,
        xMin: 0,
        xMax: 10,
      })
    } else {
      const xMin = data[0].x
      const xMax = data.slice(-1)[0].x
      const graph = this.props.bar.graph

      const toX = canvas.math.linear({
        dy: xMax - xMin,
        dx: graph.width - (graph.width / data.length),
        y0: xMin - (xMax - xMin) / (2 * (data.length - 1))
      })

      canvas.fill(ctx, props.canvas)
      background.draw(ctx, {
        ...props.background,
        yMin,
        yMax,
        yStep,
        xMin: toX(0),
        xMax: toX(graph.width),
      })
    }
  }

  drawData = (ctx, props, data) => {
    const yMin = 0
    const yMax = Math.max(...data.map(d => d.y))

    if (data.length == 0) {
      return
    }

    if (data.length == 1) {
      bar.draw(ctx, {
        ...this.props.bar,
        data,
        yMin,
        yMax,
        xMin: 0,
        xMax: 10,
        barWidth: 30,
      })
    } else {
      const { graph } = props.bar
      const xMin = data[0].x
      const xMax = data.slice(-1)[0].x

      const toX = canvas.math.linear({
        dy: xMax - xMin,
        dx: graph.width - (graph.width / data.length),
        y0: xMin - (xMax - xMin) / (2 * (data.length - 1))
      })

      bar.draw(ctx, {
        ...this.props.bar,
        data,
        yMin,
        yMax,
        xMin: toX(0),
        xMax: toX(graph.width),
        barWidth: Math.max(props.bar.graph.width / data.length - 10, 1),
      })
    }
  }

  render () {
    return (
      <div>
        <h3>Bar (Fixed data)</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => this.drawBackground(ctx, this.props, FIXED_DATA)}
          drawData={(ctx) => this.drawData(ctx, this.props, FIXED_DATA)}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_SMALL.length} data)`}</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => this.drawBackground(ctx, this.props, RANDOM_DATA_SMALL)}
          drawData={(ctx) => this.drawData(ctx, this.props, RANDOM_DATA_SMALL)}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_MEDIUM.length} data)`}</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => this.drawBackground(ctx, this.props, RANDOM_DATA_MEDIUM)}
          drawData={(ctx) => this.drawData(ctx, this.props, RANDOM_DATA_MEDIUM)}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_LARGE.length} data)`}</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => this.drawBackground(ctx, this.props, RANDOM_DATA_LARGE)}
          drawData={(ctx) => this.drawData(ctx, this.props, RANDOM_DATA_LARGE)}
        />

        <h3>Bar (No data)</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => this.drawBackground(ctx, this.props, [])}
          drawData={(ctx) => this.drawData(ctx, this.props, [])}
        />

        <h3>Bar (1 data)</h3>
        <GraphCanvas
          canvas={this.props.canvas}
          drawBackground={(ctx) => this.drawBackground(ctx, this.props, [{ x: 3, y: 10 }])}
          drawData={(ctx) => this.drawData(ctx, this.props, [{ x: 3, y: 10 }])}
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
    yStep: 1,

    showXLabel: true,
    showXLine: true,
    xLineWidth: 1,
    xLineColor: 'blue',
    xAxisAt: 'bottom',
    xAxisHeight: 50,
    xLabelFont: '12px Arial',
    xLabelColor: 'black',
    renderXLabel: x => x,
    xStep: 1,

    yMin: 0,
    yMax: 0,
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
    barWidth: 1,
    data: [],
    yMin: 0,
    yMax: 0,
    xMin: 0,
    xMax: 0
  },
}

export default BarTestRender
