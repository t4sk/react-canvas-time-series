import React, { Component } from 'react'
import {canvas, GraphCanvas} from 'react-canvas-graph'
const { background, ui } = canvas

class TestZoom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      xMin: 1900,
      xMax: 2010,
      yMin: 10,
      yMax: 110,
      xInterval: 15,
      yInterval: 10,
    }
  }

  onWheel = (e, mouse) => {
    if (ui.isInsideRect(mouse, this.props.ui.graph)) {
      e.preventDefault()

      if (e.deltaY > 0) {
        // zoom out
        this.setState((state) => ({
          ...state,
          xMin: state.xMin - 15,
          xMax: state.xMax + 15,
          xInterval: state.xInterval + 5,
          yMin: state.yMin - 10,
          yMax: state.yMax + 10,
          yInterval: state.yInterval + 5,
        }))
      } else {
        // zoom in
        this.setState((state) => ({
          ...state,
          xMin: state.xMin + 15,
          xMax: state.xMax +-15,
          xInterval: state.xInterval - 5,
          yMin: state.yMin + 10,
          yMax: state.yMax - 10,
          yInterval: state.yInterval - 5,
        }))
      }
    }
  }

  drawBackground = (ctx, props) => {
    canvas.fill(ctx, props.canvas)
    background.draw(ctx, props.background)
  }

  render () {
    return (
      <GraphCanvas
        canvas={this.props.canvas}
        xMin={this.state.xMin}
        xMax={this.state.xMax}
        yMin={this.state.yMin}
        yMax={this.state.yMax}
        drawBackground={(ctx) => {
          canvas.fill(ctx, this.props.canvas)
          background.draw(ctx, {
            ...this.props.background,
            xMin: this.state.xMin,
            xMax: this.state.xMax,
            yMin: this.state.yMin,
            yMax: this.state.yMax,
            xInterval: this.state.xInterval,
            yInterval: this.state.yInterval,
          })
        }}
        drawUI={(ctx, mouse) => {
          ui.draw(ctx, {
            ...this.props.ui,
            mouse,
            xMin: this.state.xMin,
            xMax: this.state.xMax,
            yMin: this.state.yMin,
            yMax: this.state.yMax,
          })
        }}
        onWheel={this.onWheel}
      />
    )
  }
}

TestZoom.defaultProps = {
}

export default TestZoom
