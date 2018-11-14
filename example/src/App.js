import React, { Component } from 'react'

import {canvas, GraphCanvas} from 'react-canvas-graph'

const PROPS = {
  canvas: {
    width: 500,
    height: 300,
    backgroundColor: "beige",
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
  yMin: 10,
  yMax: 110,
  xMin: 1900,
  xMax: 2010
}

export default class App extends Component {
  render () {
    return (
      <div>
        <GraphCanvas
          drawBackground={(ctx) => {
            canvas.background.fillCanvas(ctx, PROPS)
            canvas.background.draw(ctx, PROPS)
          }}
        />
      </div>
    )
  }
}
