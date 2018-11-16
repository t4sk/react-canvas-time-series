import React, { Component } from 'react'
import {canvas, GraphCanvas} from 'react-canvas-graph'
import { merge } from './util'
const { background } = canvas

class BackgroundTestRender extends Component {
  drawBackground = (ctx, props) => {
    canvas.fill(ctx, props.canvas)
    background.draw(ctx, props.background)
  }

  render () {
    return (
      <div>
        <h3>Background Position</h3>
        <GraphCanvas
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {...merge(this.props, {
              background: {
                top: 150,
                left: 250,
                height: 140,
                width: 240,
              }
            })})
          }}
        />

        <h3>Hide X Labels</h3>
        <GraphCanvas
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {...merge(this.props, {
              background: {
                showXLabel: false
              }
            })})
          }}
        />

        <h3>Hide X Lines</h3>
        <GraphCanvas
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {...merge(this.props, {
              background: {
                showXLine: false
              }
            })})
          }}
        />

        <h3>Hide Y Labels</h3>
        <GraphCanvas
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {...merge(this.props, {
              background: {
                showYLabel: false
              }
            })})
          }}
        />

        <h3>Hide Y Lines</h3>
        <GraphCanvas
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {...merge(this.props, {
              background: {
                showYLine: false
              }
            })})
          }}
        />

        <h3>X Axis Bottom</h3>
        <GraphCanvas
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {...merge(this.props, {
              background: {
                xAxisAt: 'bottom'
              }
            })})
          }}
        />

        <h3>X Axis Top</h3>
        <GraphCanvas
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {...merge(this.props, {
              background: {
                xAxisAt: 'top'
              }
            })})
          }}
        />

        <h3>Y Axis Left</h3>
        <GraphCanvas
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {...merge(this.props, {
              background: {
                yAxisAt: 'left'
              }
            })})
          }}
        />

        <h3>Y Axis Right</h3>
        <GraphCanvas
          drawBackground={(ctx) => {
            this.drawBackground(ctx, {...merge(this.props, {
              background: {
                yAxisAt: 'right'
              }
            })})
          }}
        />
      </div>
    )
  }
}

BackgroundTestRender.defaultProps = {
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
    xInterval: 15,

    yMin: 10,
    yMax: 110,
    xMin: 1900,
    xMax: 2010,
  },
}

export default BackgroundTestRender
