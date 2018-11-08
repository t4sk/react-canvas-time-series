import React, { Component } from 'react'
import { rand } from '../test-util'
import * as background from '../background'
import * as bar from './index'
import TestCanvas from '../test-canvas'

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

const RANDOM_DATA_SMALL = generateRandomData(10)
const RANDOM_DATA_MEDIUM = generateRandomData(100)
const RANDOM_DATA_LARGE = generateRandomData(1000)

class TestRender extends Component {
  render () {
    return (
      <div>
        <h3>Bar (Fixed data)</h3>
        <TestCanvas
          {...this.props}
          xMin={0}
          xMax={FIXED_DATA.length}
          drawData={(ctx) => {
            bar.draw(ctx, {
              ...this.props,
              data: FIXED_DATA
            })
          }}
          drawBackground={(ctx, props) => {
            background.fillCanvas(ctx, props)
            background.draw(ctx, props)
          }}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_SMALL.length} data)`}</h3>
        <TestCanvas
          {...this.props}
          xMin={0}
          xMax={RANDOM_DATA_SMALL.length}
          drawData={(ctx) => {
            bar.draw(ctx, {
              ...this.props,
              data: RANDOM_DATA_SMALL
            })
          }}
          drawBackground={(ctx, props) => {
            background.fillCanvas(ctx, props)
            background.draw(ctx, props)
          }}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_MEDIUM.length} data)`}</h3>
        <TestCanvas
          {...this.props}
          xMin={0}
          xMax={RANDOM_DATA_MEDIUM.length}
          drawData={(ctx) => {
            bar.draw(ctx, {
              ...this.props,
              data: RANDOM_DATA_MEDIUM
            })
          }}
          drawBackground={(ctx, props) => {
            background.fillCanvas(ctx, props)
            background.draw(ctx, props)
          }}
        />

        <h3>{`Bar (Random ${RANDOM_DATA_LARGE.length} data)`}</h3>
        <TestCanvas
          {...this.props}
          xMin={0}
          xMax={RANDOM_DATA_LARGE.length}
          drawData={(ctx) => {
            bar.draw(ctx, {
              ...this.props,
              data: RANDOM_DATA_LARGE
            })
          }}
          drawBackground={(ctx, props) => {
            background.fillCanvas(ctx, props)
            background.draw(ctx, props)
          }}
        />
      </div>
    )
  }
}

TestRender.defaultProps = {
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
    xInterval: 15
  },
  graph: {
    left: 70,
    top: 10,
    width: 400,
    height: 220
  },
  bar: {
    getBackgroundColor: d => 'green',
    getLineColor: d => 'yellow',
    lineWidth: 1
  },
  data: [],
  yMin: Y_MIN,
  yMax: Y_MAX,
  xMin: 0,
  xMax: 0
}

export default TestRender
