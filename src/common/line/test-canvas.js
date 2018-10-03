import React, { Component } from 'react'
import * as line from './index'

class TestCanvas extends Component {
  componentDidMount () {
    this.ctx = {
      line: this.refs.line.getContext('2d'),
      background: this.refs.background.getContext('2d', { alpha: false })
    }

    // translate by half pixel to draw thin lines
    this.ctx.line.translate(0.5, 0.5)
    this.draw()
  }

  shouldComponentUpdate () {
    return false
  }

  drawBackground (ctx, props) {
    ctx.fillStyle = 'lightgrey'
    ctx.fillRect(
      0, 0,
      props.canvas.width,
      props.canvas.height
    )

    ctx.fillStyle = 'white'
    ctx.fillRect(
      props.graph.x,
      props.graph.y,
      props.graph.width,
      props.graph.height
    )
  }

  draw () {
    this.drawBackground(this.ctx.background, this.props)
    line.draw(this.ctx.line, this.props)
  }

  render () {
    return (
      <div style={{
        ...style.container,
        width: this.props.canvas.width,
        height: this.props.canvas.height
      }}>
        <canvas
          style={style.background}
          ref="background"
          width={this.props.canvas.width}
          height={this.props.canvas.height}
        />
        <canvas
          style={style.line}
          ref="line"
          width={this.props.canvas.width}
          height={this.props.canvas.height}
        />
      </div>
    )
  }
}

const style = {
  container: {
    position: 'relative',
    border: '1px solid black'
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1
  },
  line: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 2
  }
}

TestCanvas.defaultProps = {
  canvas: {
    width: 500,
    height: 300
  },
  graph: {
    x: 60, // margin.left + x.axis.width
    y: 20, // margin.
    width: 420, // canvas.width - (margin.left + margin.right + x.axis.width)
    height: 220 // canvas.height - (margin.top + margin.bottom + y.axis.height)
  }
}

export default TestCanvas
