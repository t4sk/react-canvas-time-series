import React, { Component } from 'react'
import {canvas, GraphCanvas} from 'react-canvas-graph'
const { background, ui, math } = canvas
const { round } = math

const PADDING = {
  top: 10,
  bottom: 20,
  left: 20,
  right: 30,
}

class TestUpdateProps extends Component {
  constructor (props) {
    super(props)

    this.state = {
      canvas: {
        width: 500,
        height: 300,
      }
    }
  }

  onWheel = (e, mouse) => {
    e.preventDefault()
    if (e.deltaY > 0) {
      this.setState((state) => ({
        canvas: {
          width: state.canvas.width + 10,
          height: state.canvas.height + 10,
        }
      }))
    } else {
      this.setState((state) => ({
        canvas: {
          width: state.canvas.width - 10,
          height: state.canvas.height - 10,
        }
      }))
    }
  }

  render () {
    return (
      <GraphCanvas
        canvas={this.state.canvas}
        drawBackground={(ctx) => {
          canvas.fill(ctx, {
            ...this.props.canvas,
            width: this.state.canvas.width,
            height: this.state.canvas.height,
          })
          background.draw(ctx, {
            ...this.props.background,
            width: this.state.canvas.width - (PADDING.left + PADDING.right),
            height: this.state.canvas.height - (PADDING.top + PADDING.bottom),
          })
        }}
        drawUI={(ctx, mouse) => {
          ui.draw(ctx, {
            ...this.props.ui,
            mouse,
            canvas: {
              width: this.state.canvas.width,
              height: this.state.canvas.height,
            },
            graph: {
              ...this.props.ui.graph,
              width: this.state.canvas.width - (PADDING.left + PADDING.right) - 50, // xAxisWidth
              height: this.state.canvas.height - (PADDING.top + PADDING.bottom) - 50, // yAxisWidth
            },
          })
        }}
        onWheel={this.onWheel}
      />
    )
  }
}

TestUpdateProps.defaultProps = {
}

export default TestUpdateProps
